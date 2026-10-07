<<<<<<< HEAD
import { useDeferredValue, useEffect, useId, useMemo, useState } from 'react';
import * as Ariakit from '@ariakit/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input, Button, Skeleton, DropdownPopup } from '@librechat/client';
import {
  ArrowUpDown,
  Check,
  Ellipsis,
  Folder,
  FolderPlus,
  Pencil,
  Search,
  Trash2,
} from 'lucide-react';
import type { TChatProject } from 'librechat-data-provider';
import type { LocalizeFunction, MenuItemProps, RenderProp } from '~/common';
=======
import { useCallback, useDeferredValue, useEffect, useId, useMemo, useRef, useState } from 'react';
import * as Ariakit from '@ariakit/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Ellipsis, Folder, FolderPlus, Pencil, Trash2 } from 'lucide-react';
import { Button, Spinner, Skeleton, DropdownPopup, buttonVariants } from '@librechat/client';
import type { TChatProject } from 'librechat-data-provider';
import type { ProjectSort } from './ProjectsSortMenu';
import type { MenuItemProps } from '~/common';
>>>>>>> upstream/main
import { useProjectsInfiniteQuery } from '~/data-provider';
import ProjectCreateDialog from './ProjectCreateDialog';
import ProjectDeleteDialog from './ProjectDeleteDialog';
import ProjectEditDialog from './ProjectEditDialog';
<<<<<<< HEAD
=======
import ProjectsSortMenu from './ProjectsSortMenu';
>>>>>>> upstream/main
import ProjectsNavBar from './ProjectsNavBar';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

<<<<<<< HEAD
type ProjectSort = 'name' | 'createdAt' | 'lastConversationAt';

function renderSortMenuItem(label: string, isSelected: boolean): RenderProp {
  return function SortMenuItem({ className, ...props }) {
    return (
      <div {...props} className={cn(className, 'justify-between gap-5')}>
        <span className="truncate">{label}</span>
        {isSelected ? (
          <Check className="h-4 w-4 shrink-0 text-text-primary" aria-hidden="true" />
        ) : (
          <span className="h-4 w-4 shrink-0" aria-hidden="true" />
        )}
      </div>
    );
  };
}

function getProjectCountLabel(count: number, hasMore: boolean, localize: LocalizeFunction) {
  if (hasMore) {
    return localize('com_ui_project_count_partial', { count });
  }
  if (count === 1) {
    return localize('com_ui_project_count_single');
  }
  return localize('com_ui_project_count', { count });
}

=======
>>>>>>> upstream/main
function formatActivity(project: TChatProject) {
  const value = project.lastConversationAt ?? project.updatedAt ?? project.createdAt;
  if (!value) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function ProjectCard({
  project,
<<<<<<< HEAD
  index,
  onOpen,
}: {
  project: TChatProject;
  index: number;
=======
  onOpen,
}: {
  project: TChatProject;
>>>>>>> upstream/main
  onOpen: (projectId: string) => void;
}) {
  const localize = useLocalize();
  const menuId = useId();
<<<<<<< HEAD
  const [isMenuOpen, setIsMenuOpen] = useState(false);
=======
  const editMenuRef = useRef<HTMLButtonElement>(null);
  const deleteMenuRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  /** The dialog items keep the menu open so it does not steal focus from the
   *  dialog mounting beside it; closing the dialog closes the menu too. */
  const closeMenuWith = (setOpen: (open: boolean) => void, open: boolean) => {
    setOpen(open);
    if (!open) {
      setIsMenuOpen(false);
    }
  };
>>>>>>> upstream/main
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const activity = formatActivity(project);
  const menuItems = useMemo<MenuItemProps[]>(
    () => [
      {
        id: `${menuId}-edit`,
        label: localize('com_ui_edit_project'),
<<<<<<< HEAD
        icon: <Pencil className="size-4 text-text-secondary" aria-hidden="true" />,
        onClick: () => setIsEditOpen(true),
=======
        icon: <Pencil className="text-text-secondary size-4" aria-hidden="true" />,
        onClick: () => setIsEditOpen(true),
        hideOnClick: false,
        ref: editMenuRef,
        render: (props) => <button {...props} />,
>>>>>>> upstream/main
      },
      {
        id: `${menuId}-delete`,
        label: localize('com_ui_delete'),
<<<<<<< HEAD
        icon: <Trash2 className="size-4 text-text-secondary" aria-hidden="true" />,
        onClick: () => setIsDeleteOpen(true),
=======
        icon: <Trash2 className="text-text-secondary size-4" aria-hidden="true" />,
        onClick: () => setIsDeleteOpen(true),
        hideOnClick: false,
        ref: deleteMenuRef,
        render: (props) => <button {...props} />,
>>>>>>> upstream/main
      },
    ],
    [localize, menuId],
  );

  return (
    <article
      className={cn(
<<<<<<< HEAD
        'group/project relative flex min-h-[9.5rem] flex-col rounded-2xl border border-border-light bg-surface-secondary',
        'transition-colors duration-150 ease-out hover:bg-surface-hover',
        'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-1 motion-safe:fill-mode-both',
      )}
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <button
        type="button"
        className="flex min-h-[9.5rem] flex-1 flex-col rounded-2xl p-4 pr-12 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-primary"
        onClick={() => onOpen(project._id)}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-tertiary text-text-secondary transition-colors group-hover/project:text-text-primary">
          <Folder className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="mt-3 truncate text-base font-semibold tracking-tight text-text-primary">
          {project.name}
        </span>
        {project.description ? (
          <span className="mt-1 line-clamp-2 text-pretty text-sm leading-relaxed text-text-secondary">
            {project.description}
          </span>
        ) : null}
        <span className="mt-auto flex items-center gap-2 pt-4 text-xs tabular-nums text-text-secondary">
=======
        'group/project border-border-light bg-surface-secondary relative flex min-h-[8.5rem] max-w-full min-w-0 flex-col rounded-2xl border',
        'hover:border-border-medium hover:bg-surface-hover transition-colors duration-150 ease-out motion-reduce:transition-none',
        isMenuOpen && 'bg-surface-hover',
      )}
    >
      <Button
        type="button"
        variant="card"
        size="tile"
        className="min-h-[8.5rem] w-full max-w-full min-w-0 flex-1 flex-col items-stretch"
        onClick={() => onOpen(project._id)}
      >
        <span className="bg-surface-tertiary text-text-secondary group-hover/project:text-text-primary flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors">
          <Folder className="size-4" aria-hidden="true" />
        </span>
        <span className="text-text-primary mt-2.5 line-clamp-2 max-w-full min-w-0 text-sm font-semibold tracking-tight wrap-anywhere md:line-clamp-1">
          {project.name}
        </span>
        {project.description ? (
          <span className="text-text-secondary mt-1 line-clamp-2 max-w-full min-w-0 text-sm leading-relaxed text-pretty wrap-anywhere">
            {project.description}
          </span>
        ) : null}
        <span className="text-text-secondary mt-auto flex max-w-full min-w-0 items-center gap-2 pt-3 text-xs tabular-nums">
>>>>>>> upstream/main
          <span>
            {project.conversationCount === 1
              ? localize('com_ui_project_chat_count_single')
              : localize('com_ui_project_chat_count', {
                  count: project.conversationCount,
                })}
          </span>
          {activity ? (
            <>
              <span aria-hidden="true">·</span>
              <time dateTime={project.lastConversationAt ?? project.updatedAt ?? project.createdAt}>
                {activity}
              </time>
            </>
          ) : null}
        </span>
<<<<<<< HEAD
      </button>
      <div className="absolute right-2 top-2">
=======
      </Button>
      <div className="absolute top-2 right-2">
>>>>>>> upstream/main
        <DropdownPopup
          portal={true}
          focusLoop={true}
          unmountOnHide={true}
          menuId={menuId}
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
<<<<<<< HEAD
          className="z-[125] min-w-44"
=======
          className="z-[125]"
          minWidth="11rem"
>>>>>>> upstream/main
          iconClassName="mr-2 text-text-secondary"
          trigger={
            <Ariakit.MenuButton
              aria-label={localize('com_ui_more_options')}
              className={cn(
<<<<<<< HEAD
                'flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary outline-none transition-colors',
                'hover:bg-surface-tertiary hover:text-text-primary',
                'focus-visible:ring-2 focus-visible:ring-text-primary',
                isMenuOpen && 'bg-surface-tertiary text-text-primary',
=======
                buttonVariants({ variant: 'row-action', size: 'icon-sm' }),
                'text-text-secondary rounded-lg',
                isMenuOpen && 'bg-surface-hover-alt text-text-primary',
>>>>>>> upstream/main
              )}
            >
              <Ellipsis className="h-4 w-4" aria-hidden="true" />
            </Ariakit.MenuButton>
          }
          items={menuItems}
        />
      </div>
<<<<<<< HEAD
      <ProjectEditDialog open={isEditOpen} onOpenChange={setIsEditOpen} project={project} />
      <ProjectDeleteDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} project={project} />
=======
      <ProjectEditDialog
        open={isEditOpen}
        onOpenChange={(open) => closeMenuWith(setIsEditOpen, open)}
        project={project}
        triggerRef={editMenuRef}
      />
      <ProjectDeleteDialog
        open={isDeleteOpen}
        onOpenChange={(open) => closeMenuWith(setIsDeleteOpen, open)}
        project={project}
        triggerRef={deleteMenuRef}
      />
>>>>>>> upstream/main
    </article>
  );
}

function ProjectGridSkeleton() {
  return (
<<<<<<< HEAD
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="flex min-h-[9.5rem] flex-col rounded-2xl bg-surface-secondary p-4"
        >
          <Skeleton className="h-11 w-11 rounded-xl" />
=======
    <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-3" aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="bg-surface-secondary flex min-h-[8.5rem] flex-col rounded-2xl p-4"
        >
          <Skeleton className="size-9 rounded-xl" />
>>>>>>> upstream/main
          <Skeleton className="mt-3 h-5 w-2/3" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-auto h-3 w-24" />
        </div>
      ))}
    </div>
  );
}

export default function ProjectsView() {
  const localize = useLocalize();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<ProjectSort>('lastConversationAt');
  const [isCreating, setIsCreating] = useState(searchParams.get('new') === '1');
<<<<<<< HEAD
  const sortMenuId = useId();
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const deferredSearch = useDeferredValue(search);

  const { data, fetchNextPage, isFetchingNextPage, isLoading } = useProjectsInfiniteQuery({
    search: deferredSearch || undefined,
    sortBy,
    sortDirection: sortBy === 'name' ? 'asc' : 'desc',
  });

  const projects = useMemo(() => data?.pages.flatMap((page) => page.projects) ?? [], [data?.pages]);
  const hasNextPage = data?.pages[data.pages.length - 1]?.nextCursor != null;
  const sortOptions = useMemo(
    () => [
      { value: 'lastConversationAt' as const, label: localize('com_ui_latest_activity') },
      { value: 'createdAt' as const, label: localize('com_ui_sort_created') },
      { value: 'name' as const, label: localize('com_ui_name') },
    ],
    [localize],
  );
  const selectedSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label ??
    localize('com_ui_latest_activity');
  const sortMenuItems = useMemo<MenuItemProps[]>(
    () =>
      sortOptions.map((option) => {
        const isSelected = sortBy === option.value;
        return {
          id: `project-sort-${option.value}`,
          ariaLabel: option.label,
          ariaChecked: isSelected,
          onClick: () => setSortBy(option.value),
          render: renderSortMenuItem(option.label, isSelected),
        };
      }),
    [sortBy, sortOptions],
  );

  /** `projects` only holds the pages fetched so far, so while another page
   *  exists this is a lower bound rather than the total. */
  const projectCountLabel = getProjectCountLabel(projects.length, hasNextPage, localize);
=======
  const deferredSearch = useDeferredValue(search);
  const scrollRef = useRef<HTMLElement | null>(null);
  const [pageSentinel, setPageSentinel] = useState<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    useProjectsInfiniteQuery({
      search: deferredSearch || undefined,
      sortBy,
      sortDirection: sortBy === 'name' ? 'asc' : 'desc',
    });

  const projects = useMemo(() => data?.pages.flatMap((page) => page.projects) ?? [], [data?.pages]);
>>>>>>> upstream/main

  useEffect(() => {
    if (searchParams.get('new') === '1') {
      setIsCreating(true);
    }
  }, [searchParams]);

  const handleCreateDialogChange = (open: boolean) => {
    setIsCreating(open);
    if (!open && searchParams.get('new') === '1') {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('new');
      setSearchParams(nextParams, { replace: true });
    }
  };

<<<<<<< HEAD
  return (
    <main className="flex h-full min-h-0 flex-col overflow-auto bg-presentation text-text-primary">
      <ProjectsNavBar onCreate={() => setIsCreating(true)} />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-10 pt-6 md:px-6 md:pt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">{localize('com_ui_search_projects')}</span>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
              aria-hidden="true"
            />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={localize('com_ui_search_projects')}
              className="h-11 rounded-xl bg-surface-secondary pl-10"
            />
          </label>
          <DropdownPopup
            portal={true}
            focusLoop={true}
            unmountOnHide={true}
            menuId={sortMenuId}
            isOpen={isSortMenuOpen}
            setIsOpen={setIsSortMenuOpen}
            className="z-[125] min-w-56"
            trigger={
              <Ariakit.MenuButton
                aria-label={localize('com_ui_sort_projects_by')}
                className={cn(
                  'inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-3 text-sm font-medium text-text-secondary transition-colors',
                  'hover:bg-surface-hover hover:text-text-primary',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary',
                  isSortMenuOpen && 'bg-surface-hover text-text-primary',
                )}
              >
                <ArrowUpDown className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{selectedSortLabel}</span>
              </Ariakit.MenuButton>
            }
            items={sortMenuItems}
          />
        </div>

        <div className="mt-8 flex items-baseline justify-between gap-3">
          <h2 className="text-sm font-medium text-text-primary">
            {localize('com_ui_your_projects')}
          </h2>
          {!isLoading && projects.length > 0 ? (
            <p className="text-sm tabular-nums text-text-secondary">{projectCountLabel}</p>
=======
  const loadMore = useCallback(() => {
    if (hasNextPage === true && !isFetching) {
      /** `cancelRefetch: false` so a scroll burst coalesces into one request
       *  instead of each intersection restarting the page in flight. */
      void fetchNextPage({ cancelRefetch: false });
    }
  }, [fetchNextPage, hasNextPage, isFetching]);

  /** The list scrolls inside `<main>`, so the viewport root would clip the
   *  sentinel and only report it once it is already on screen; observing the
   *  scroll container lets `rootMargin` prefetch a page ahead of the edge. */
  useEffect(() => {
    const root = scrollRef.current;
    if (pageSentinel == null || root == null) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { root, rootMargin: '600px 0px' },
    );
    observer.observe(pageSentinel);
    return () => observer.disconnect();
  }, [loadMore, pageSentinel]);

  return (
    <main
      ref={scrollRef}
      className="bg-surface-primary-alt text-text-primary flex h-full min-h-0 flex-col overflow-auto"
    >
      <ProjectsNavBar
        onCreate={() => setIsCreating(true)}
        search={search}
        onSearchChange={setSearch}
      />

      <div className="flex w-full flex-1 flex-col px-4 pt-3 pb-10 md:px-6 md:pt-4">
        <div className="flex min-h-8 items-center justify-between gap-3">
          <h2 className="text-text-primary text-sm font-medium">
            {localize('com_ui_your_projects')}
          </h2>
          {!isLoading && projects.length > 0 ? (
            <ProjectsSortMenu sortBy={sortBy} onSortChange={setSortBy} />
>>>>>>> upstream/main
          ) : null}
        </div>

        <ProjectCreateDialog
          open={isCreating}
          onOpenChange={handleCreateDialogChange}
          onCreated={(project) => navigate(`/projects/${project._id}`)}
        />

        <div className="mt-4 flex flex-1 flex-col">
          {isLoading && <ProjectGridSkeleton />}
          {!isLoading && projects.length > 0 && (
<<<<<<< HEAD
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={index}
=======
            <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
>>>>>>> upstream/main
                  onOpen={(projectId) => navigate(`/projects/${projectId}`)}
                />
              ))}
            </div>
          )}
          {!isLoading && projects.length === 0 && (
<<<<<<< HEAD
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-surface-secondary px-6 py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-tertiary text-text-secondary">
                <FolderPlus className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-balance text-base font-semibold text-text-primary">
=======
            <div className="bg-surface-secondary flex flex-1 flex-col items-center justify-center rounded-2xl px-6 py-16 text-center">
              <span className="bg-surface-tertiary text-text-secondary flex h-14 w-14 items-center justify-center rounded-2xl">
                <FolderPlus className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="text-text-primary mt-4 text-base font-semibold text-balance">
>>>>>>> upstream/main
                {search ? localize('com_ui_no_matching_projects') : localize('com_ui_no_projects')}
              </h3>
              {!search ? (
                <>
<<<<<<< HEAD
                  <p className="mt-1 max-w-sm text-pretty text-sm text-text-secondary">
=======
                  <p className="text-text-secondary mt-1 max-w-sm text-sm text-pretty">
>>>>>>> upstream/main
                    {localize('com_ui_add_first_project')}
                  </p>
                  <Button
                    type="button"
                    variant="default"
                    size="sm"
                    className="mt-5"
                    onClick={() => setIsCreating(true)}
                  >
                    <FolderPlus className="h-4 w-4" aria-hidden="true" />
                    {localize('com_ui_new_project')}
                  </Button>
                </>
              ) : null}
            </div>
          )}
        </div>

        {hasNextPage && (
<<<<<<< HEAD
          <Button
            type="button"
            variant="outline"
            className="mx-auto mt-8"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? localize('com_ui_loading') : localize('com_ui_load_more')}
          </Button>
=======
          <div
            ref={setPageSentinel}
            className="text-text-primary flex h-16 shrink-0 items-center justify-center"
            role="status"
            aria-live="polite"
            aria-label={localize('com_ui_loading')}
          >
            {isFetchingNextPage ? <Spinner className="size-5" /> : null}
          </div>
>>>>>>> upstream/main
        )}
      </div>
    </main>
  );
}
