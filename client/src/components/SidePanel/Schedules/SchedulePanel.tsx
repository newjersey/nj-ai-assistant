<<<<<<< HEAD
import { useState, type ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { Button, TooltipAnchor } from '@librechat/client';
import { PermissionTypes, Permissions } from 'librechat-data-provider';
import { PanelContent, PanelFooter } from '~/components/ui';
=======
import { useState, type ReactNode, useId } from 'react';
import { Plus } from 'lucide-react';
import { Button, FilterInput, TooltipAnchor } from '@librechat/client';
import { PermissionTypes, Permissions } from 'librechat-data-provider';
import { PanelContent, PanelFooter, PanelHeader } from '~/components/ui';
>>>>>>> upstream/main
import { useChatProjectNames } from './useScheduleProjects';
import ScheduleCardSkeleton from './ScheduleCardSkeleton';
import ScheduleEmptyState from './ScheduleEmptyState';
import { useSchedulesQuery } from '~/data-provider';
import { useLocalize, useHasAccess } from '~/hooks';
import ScheduleDialog from './ScheduleDialog';
import ScheduleCard from './ScheduleCard';
import useRunSync from './useRunSync';

export default function SchedulePanel() {
  const localize = useLocalize();
<<<<<<< HEAD
=======
  const headingId = useId();
>>>>>>> upstream/main
  const { data, dataUpdatedAt, isLoading, isError, refetch } = useSchedulesQuery();
  /** The cards refresh themselves from this query; the sidebar cannot, so the
   *  chat a run just produced is read out of the same poll. */
  useRunSync(data?.schedules, dataUpdatedAt);
  const [createOpen, setCreateOpen] = useState(false);
<<<<<<< HEAD
=======
  const [searchQuery, setSearchQuery] = useState('');
>>>>>>> upstream/main

  const hasCreateAccess = useHasAccess({
    permissionType: PermissionTypes.SCHEDULES,
    permission: Permissions.CREATE,
  });

<<<<<<< HEAD
  const schedules = data?.schedules ?? [];
=======
  const allSchedules = data?.schedules ?? [];
  /** Filtering is client-side because the panel already holds every schedule the
   *  limit allows; a query per keystroke would buy nothing. */
  const query = searchQuery.trim().toLowerCase();
  const schedules =
    query.length > 0
      ? allSchedules.filter((schedule) => schedule.name.toLowerCase().includes(query))
      : allSchedules;
>>>>>>> upstream/main
  /** ONE lookup for the whole list. Resolving a name inside each card would re-walk
   *  every loaded project per card, per render. Skipped entirely until some schedule
   *  actually has a scope, so an unscoped panel issues no project request at all. */
  const projectNames = useChatProjectNames(
    schedules.some((schedule) => schedule.chatProjectId != null),
  );
  const maxPerUser = data?.limits.maxPerUser;
<<<<<<< HEAD
  const atLimit = maxPerUser !== undefined && schedules.length >= maxPerUser;
=======
  const atLimit = maxPerUser !== undefined && allSchedules.length >= maxPerUser;
  let filterAnnouncement = '';
  if (query.length > 0 && !isLoading && !isError) {
    filterAnnouncement =
      schedules.length === 1
        ? localize('com_ui_search_result_count', { count: schedules.length })
        : localize('com_ui_search_results_count', { count: schedules.length });
  }
>>>>>>> upstream/main
  let panelContent: ReactNode;

  if (isError) {
    panelContent = <ScheduleEmptyState isError onRetry={() => refetch()} />;
  } else if (schedules.length === 0) {
<<<<<<< HEAD
    panelContent = <ScheduleEmptyState canCreate={hasCreateAccess && !atLimit} />;
=======
    panelContent = (
      <ScheduleEmptyState canCreate={hasCreateAccess && !atLimit} isFiltered={query.length > 0} />
    );
>>>>>>> upstream/main
  } else {
    panelContent = (
      <div className="space-y-2" role="list" aria-label={localize('com_ui_schedules')}>
        {schedules.map((schedule) => (
          <div key={schedule.id} role="listitem">
            <ScheduleCard
              schedule={schedule}
<<<<<<< HEAD
=======
              consentEnabled={data?.limits.mcpConsent === true}
>>>>>>> upstream/main
              // The raw id is a poor label but an honest one: it only shows for a
              // project outside the loaded pages, and beats claiming no scope.
              projectName={
                schedule.chatProjectId != null
                  ? (projectNames.get(schedule.chatProjectId) ?? schedule.chatProjectId)
                  : null
              }
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      role="region"
<<<<<<< HEAD
      aria-label={localize('com_ui_schedules')}
      className="flex h-full w-full flex-col overflow-hidden pt-2"
    >
      <div className="shrink-0 px-3 pb-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-text-primary">
            {localize('com_ui_schedules')}
          </span>
          {hasCreateAccess && (
=======
      aria-labelledby={headingId}
      className="flex h-full w-full flex-col overflow-hidden pt-2"
    >
      <PanelHeader
        title={localize('com_ui_schedules')}
        titleId={headingId}
        action={
          hasCreateAccess && (
>>>>>>> upstream/main
            <TooltipAnchor
              description={localize('com_ui_schedule_new')}
              side="bottom"
              render={
                <Button
<<<<<<< HEAD
                  variant="outline"
                  size="icon"
                  className="size-9 shrink-0 bg-transparent"
=======
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0"
>>>>>>> upstream/main
                  aria-label={localize('com_ui_schedule_new')}
                  disabled={atLimit || isError || isLoading}
                  onClick={() => setCreateOpen(true)}
                >
                  <Plus className="size-4" aria-hidden="true" />
                </Button>
              }
            />
<<<<<<< HEAD
          )}
        </div>
      </div>
=======
          )
        }
        search={
          <>
            {/* Focus stays in the field while the list changes, so the match count
                is announced rather than left for the user to go and find. */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {filterAnnouncement}
            </div>
            <FilterInput
              inputId="schedules-filter"
              label={localize('com_ui_schedules_filter')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </>
        }
      />
>>>>>>> upstream/main

      <PanelContent isLoading={isLoading} skeleton={<ScheduleCardSkeleton />} className="px-3 pb-3">
        {/* A failed query must not masquerade as an empty list or enable creation
            against limits that could not be loaded. */}
        {panelContent}
      </PanelContent>

      {!isLoading && !isError && maxPerUser !== undefined && (
        <PanelFooter className="justify-start">
<<<<<<< HEAD
          <p className="text-xs text-text-secondary">
            {localize('com_ui_schedules_used', { used: schedules.length, max: maxPerUser })}
=======
          <p className="text-text-secondary text-xs">
            {localize('com_ui_schedules_used', { used: allSchedules.length, max: maxPerUser })}
>>>>>>> upstream/main
          </p>
        </PanelFooter>
      )}

      {createOpen && <ScheduleDialog open={createOpen} onOpenChange={setCreateOpen} />}
    </div>
  );
}
