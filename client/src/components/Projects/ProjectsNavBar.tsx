import { Plus } from 'lucide-react';
<<<<<<< HEAD
import { Button, useMediaQuery } from '@librechat/client';
import OpenSidebar from '~/components/Chat/Menus/OpenSidebar';
=======
import { Button, FilterInput } from '@librechat/client';
import OpenSidebar from '~/components/Chat/Menus/OpenSidebar';
import useDrawerViewport from '~/hooks/Nav/useDrawerViewport';
>>>>>>> upstream/main
import { useLocalize } from '~/hooks';

type ProjectsNavBarProps = {
  onCreate: () => void;
<<<<<<< HEAD
};

export default function ProjectsNavBar({ onCreate }: ProjectsNavBarProps) {
  const localize = useLocalize();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return (
    <header className="sticky top-0 z-10 border-b border-border-light bg-presentation">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 md:h-16 md:px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          {isSmallScreen ? <OpenSidebar className="size-9 shrink-0" /> : null}
          <h1 className="truncate text-balance text-lg font-semibold tracking-tight text-text-primary md:text-xl">
            {localize('com_ui_projects')}
          </h1>
        </div>
        <Button type="button" variant="default" size="sm" onClick={onCreate} className="shrink-0">
          <Plus className="h-4 w-4" aria-hidden="true" />
          {localize('com_ui_new_project')}
        </Button>
=======
  search: string;
  onSearchChange: (search: string) => void;
};

export default function ProjectsNavBar({ onCreate, search, onSearchChange }: ProjectsNavBarProps) {
  const localize = useLocalize();
  const isSmallScreen = useDrawerViewport();
  return (
    <header className="border-border-light bg-surface-primary-alt sticky top-0 z-10 border-b">
      <div className="flex min-h-14 w-full flex-wrap items-center gap-3 px-4 py-2.5 md:flex-nowrap md:px-6">
        {isSmallScreen ? <OpenSidebar className="size-9 shrink-0" /> : null}
        <h1 className="sr-only">{localize('com_ui_projects')}</h1>
        <FilterInput
          inputId="projects-search"
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          label={localize('com_ui_search_projects')}
          containerClassName="order-last w-full min-w-0 md:order-none md:w-auto md:max-w-md md:flex-1"
        />
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="default"
            size="sm"
            shape="round"
            onClick={onCreate}
            className="shrink-0"
          >
            <Plus className="size-4" aria-hidden="true" />
            {localize('com_ui_new_project')}
          </Button>
        </div>
>>>>>>> upstream/main
      </div>
    </header>
  );
}
