import { useMemo, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Plus, Check } from 'lucide-react';
import { matchSorter } from 'match-sorter';
import { SystemRoles, PermissionTypes, Permissions } from 'librechat-data-provider';
import {
  Button,
  Spinner,
  Dropdown,
  FilterInput,
  TooltipAnchor,
  OGDialogTrigger,
  useToastContext,
} from '@librechat/client';
import type { TUserMemory } from 'librechat-data-provider';
import {
  useUpdateMemoryPreferencesMutation,
  useMemoriesQuery,
  useGetUserQuery,
} from '~/data-provider';
import MemoryPanelSplash from '~/nj/components/SidePanel/Memories/MemoryPanelSplash';
import { useLocalize, useAuthContext, useHasAccess } from '~/hooks';
import MemoryCreateDialog from './MemoryCreateDialog';
import { atomWithLocalStorage } from '~/store/utils';
import MemoryUsageBadge from './MemoryUsageBadge';
import AdminSettings from './AdminSettings';
import MemoryList from './MemoryList';
import { cn } from '~/utils';

const pageSize = 10;

// NJ: Show a one-time splash page introducing memories on first visit
const showSplashPageState = atomWithLocalStorage('memoryPanelSplashPage', true);

/** Partition filter sentinels; any other value is an agent id */
const PARTITION_ALL = 'all';
const PARTITION_PERSONAL = 'personal';

export default function MemoryPanel() {
  const localize = useLocalize();
  const { user } = useAuthContext();
  const { data: userData } = useGetUserQuery();
  const { data: memData, isLoading } = useMemoriesQuery();
  const { showToast } = useToastContext();
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [partitionFilter, setPartitionFilter] = useState(PARTITION_ALL);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [referenceSavedMemories, setReferenceSavedMemories] = useState(true);
  const [showSplashPage, setShowSplashPage] = useRecoilState(showSplashPageState);

  const updateMemoryPreferencesMutation = useUpdateMemoryPreferencesMutation({
    onSuccess: () => {
      showToast({
        message: localize('com_ui_preferences_updated'),
        status: 'success',
      });
    },
    onError: () => {
      showToast({
        message: localize('com_ui_error_updating_preferences'),
        status: 'error',
      });
      setReferenceSavedMemories((prev) => !prev);
    },
  });

  useEffect(() => {
    if (userData?.personalization?.memories !== undefined) {
      setReferenceSavedMemories(userData.personalization.memories);
    }
  }, [userData?.personalization?.memories]);

  const handleMemoryToggle = (checked: boolean) => {
    setReferenceSavedMemories(checked);
    updateMemoryPreferencesMutation.mutate({ memories: checked });
  };

  const hasReadAccess = useHasAccess({
    permissionType: PermissionTypes.MEMORIES,
    permission: Permissions.READ,
  });

  const hasUpdateAccess = useHasAccess({
    permissionType: PermissionTypes.MEMORIES,
    permission: Permissions.UPDATE,
  });

  const hasCreateAccess = useHasAccess({
    permissionType: PermissionTypes.MEMORIES,
    permission: Permissions.CREATE,
  });

  const hasOptOutAccess = useHasAccess({
    permissionType: PermissionTypes.MEMORIES,
    permission: Permissions.OPT_OUT,
  });

  const memories: TUserMemory[] = useMemo(() => memData?.memories ?? [], [memData]);

  const partitionOptions = useMemo(() => {
    const agentsById = new Map<string, string>();
    for (const memory of memories) {
      if (memory.agentId != null && !agentsById.has(memory.agentId)) {
        agentsById.set(memory.agentId, memory.agentName ?? memory.agentId);
      }
    }
    if (agentsById.size === 0) {
      return null;
    }
    return [
      { value: PARTITION_ALL, label: localize('com_ui_memories_all') },
      { value: PARTITION_PERSONAL, label: localize('com_ui_memories_personal') },
      ...[...agentsById.entries()].map(([value, label]) => ({ value, label })),
    ];
  }, [memories, localize]);

  /** Falls back to "all" when the selected partition no longer exists
   *  (e.g. the last memory of that agent was deleted), so the panel never
   *  gets stuck filtering on a removed partition. */
  const activePartition = useMemo(() => {
    if (partitionFilter === PARTITION_ALL || partitionFilter === PARTITION_PERSONAL) {
      return partitionFilter;
    }
    return partitionOptions?.some((option) => option.value === partitionFilter)
      ? partitionFilter
      : PARTITION_ALL;
  }, [partitionOptions, partitionFilter]);

  const filteredMemories = useMemo(() => {
    const partitionMemories =
      activePartition === PARTITION_ALL
        ? memories
        : memories.filter((memory) =>
            activePartition === PARTITION_PERSONAL
              ? memory.agentId == null
              : memory.agentId === activePartition,
          );
    return matchSorter(partitionMemories, searchQuery, {
      keys: ['key', 'value'],
    });
  }, [memories, searchQuery, activePartition]);

  const currentRows = useMemo(() => {
    return filteredMemories.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }, [filteredMemories, pageIndex]);

  // Reset page when search or partition changes
  useEffect(() => {
    setPageIndex(0);
  }, [searchQuery, activePartition]);

  // NJ: Show a splash page the first time a user accesses memories
  if (showSplashPage) {
    return <MemoryPanelSplash setShowSplashPage={setShowSplashPage} />;
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <Spinner />
      </div>
    );
  }

  if (!hasReadAccess) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <div className="text-center">
          <p className="text-sm text-text-secondary">{localize('com_ui_no_read_access')}</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(filteredMemories.length / pageSize);

  return (
    <div className="flex h-auto w-full flex-col px-3 pb-3 pt-2">
      <div role="region" aria-label={localize('com_ui_memories')} className="space-y-2">
        {/* Header: Filter + Create Button */}
        <div className="flex items-center gap-2">
          <FilterInput
            inputId="memory-search"
            label={localize('com_ui_memories_filter')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            containerClassName="flex-1"
          />
          {hasCreateAccess && (
            <MemoryCreateDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <OGDialogTrigger asChild>
                <TooltipAnchor
                  description={localize('com_ui_create_memory')}
                  side="bottom"
                  render={
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-9 shrink-0 bg-transparent"
                      aria-label={localize('com_ui_create_memory')}
                      onClick={() => setCreateDialogOpen(true)}
                    >
                      <Plus className="size-4" aria-hidden="true" />
                    </Button>
                  }
                />
              </OGDialogTrigger>
            </MemoryCreateDialog>
          )}
        </div>

        {/* Partition filter (only when agent-scoped memories exist) */}
        {partitionOptions && (
          <Dropdown
            value={activePartition}
            onChange={setPartitionFilter}
            options={partitionOptions}
            className="w-full"
            ariaLabel={localize('com_ui_memories_partition_filter')}
            testId="memory-partition-filter"
          />
        )}

        {/* Controls: Usage Badge + Memory Toggle */}
        {(memData?.tokenLimit != null || hasOptOutAccess) && (
          <div className="flex items-center justify-between">
            {/* Usage Badge */}
            {memData?.tokenLimit != null && (
              <MemoryUsageBadge
                percentage={memData.usagePercentage ?? 0}
                tokenLimit={memData.tokenLimit}
                totalTokens={memData.totalTokens}
              />
            )}

            {/* Memory Toggle */}
            {hasOptOutAccess && (
              // NJ: Customize the memory toggle
              <button
                type="button"
                className={cn(
                  'btn !rounded-lg text-text-primary ring-offset-background focus-visible:ring-2',
                  'ml-auto gap-2 !transition-none focus-visible:ring-ring focus-visible:ring-offset-2',
                  referenceSavedMemories ? 'bg-surface-tertiary' : '!border-border-medium',
                )}
                onClick={() => handleMemoryToggle(!referenceSavedMemories)}
                aria-label={localize('com_ui_use_memory')}
                aria-pressed={referenceSavedMemories}
                disabled={updateMemoryPreferencesMutation.isLoading}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex size-4 shrink-0 items-center justify-center rounded-[2px] border',
                    referenceSavedMemories
                      ? 'border-transparent bg-primary text-primary-foreground'
                      : 'border-border-xheavy bg-transparent',
                  )}
                >
                  {referenceSavedMemories && (
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  )}
                </span>
                {localize('com_ui_use_memory')}
              </button>
            )}
          </div>
        )}

        {/* Memory List */}
        <MemoryList
          memories={currentRows}
          hasUpdateAccess={hasUpdateAccess}
          isFiltered={searchQuery.length > 0}
        />

        {/* Footer: Admin Settings + Pagination */}
        {(user?.role === SystemRoles.ADMIN || filteredMemories.length > pageSize) && (
          <div className="flex items-center justify-between gap-2">
            {/* Admin Settings - Left */}
            {user?.role === SystemRoles.ADMIN ? <AdminSettings /> : <div />}

            {/* Pagination - Right */}
            {filteredMemories.length > pageSize && (
              <div className="flex items-center gap-2" role="navigation" aria-label="Pagination">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={pageIndex === 0}
                  aria-label={localize('com_ui_prev')}
                >
                  {localize('com_ui_prev')}
                </Button>
                <div className="whitespace-nowrap text-sm" aria-live="polite">
                  {pageIndex + 1} / {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPageIndex((prev) => (prev + 1 < totalPages ? prev + 1 : prev))}
                  disabled={pageIndex + 1 >= totalPages}
                  aria-label={localize('com_ui_next')}
                >
                  {localize('com_ui_next')}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
