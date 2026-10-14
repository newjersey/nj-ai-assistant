import * as Tabs from '@radix-ui/react-tabs';
import { Search, X, ChevronRight } from 'lucide-react';
import type { SettingsContextValue, SettingsTab } from './types';
import { useLocalize } from '~/hooks';
import { TABS } from './types';
import { cn } from '~/utils';

interface SidebarProps {
  ctx: SettingsContextValue;
  query: string;
  onQueryChange: (q: string) => void;
  onSelectTab: (tab: SettingsTab) => void;
  showChevron?: boolean;
  hideTabs?: boolean;
<<<<<<< HEAD
=======
  /** Stacked above the content pane rather than beside it. */
  stacked?: boolean;
>>>>>>> upstream/main
}

export default function Sidebar({
  ctx,
  query,
  onQueryChange,
  onSelectTab,
  showChevron = false,
  hideTabs = false,
<<<<<<< HEAD
=======
  stacked = false,
>>>>>>> upstream/main
}: SidebarProps) {
  const localize = useLocalize();
  const tabs = TABS.filter((t) => !t.show || t.show(ctx));

  return (
<<<<<<< HEAD
    <div className="flex w-full flex-col gap-3 md:w-[230px]">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
=======
    <div
      className={cn(
        'flex min-h-0 w-full flex-col gap-3 overflow-hidden',
        !stacked && 'w-[14.375rem]',
        stacked && !hideTabs && 'flex-1',
      )}
    >
      <div className="relative shrink-0">
        <Search
          className="text-text-tertiary pointer-events-none absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2"
>>>>>>> upstream/main
          aria-hidden="true"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' && query.length > 0) {
              e.preventDefault();
              e.stopPropagation();
              onQueryChange('');
            }
          }}
          placeholder={localize('com_ui_settings_search_placeholder')}
          aria-label={localize('com_ui_settings_search_placeholder')}
<<<<<<< HEAD
          className="w-full rounded-lg bg-surface-secondary py-2 pl-8 pr-8 text-sm text-text-primary focus-visible:outline-none"
=======
          className="bg-surface-secondary text-text-primary w-full rounded-lg py-2 pr-8 pl-8 text-sm focus-visible:outline-hidden"
>>>>>>> upstream/main
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            aria-label={localize('com_ui_clear_search')}
<<<<<<< HEAD
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary"
=======
            className="text-text-secondary hover:bg-surface-hover hover:text-text-primary focus-visible:ring-text-primary absolute top-1/2 right-1.5 -translate-y-1/2 rounded-md p-1 transition-colors focus-visible:ring-2 focus-visible:outline-hidden"
>>>>>>> upstream/main
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
      {!hideTabs && (
        <Tabs.List
          aria-label={localize('com_nav_settings')}
<<<<<<< HEAD
          className="flex flex-col gap-1 overflow-visible"
=======
          className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto"
>>>>>>> upstream/main
        >
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={cn(
<<<<<<< HEAD
                'flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-primary md:py-2',
                'radix-state-active:bg-surface-tertiary radix-state-active:text-text-primary',
              )}
            >
              <span className="flex items-center gap-2">
                {tab.icon}
                <span className="whitespace-nowrap">{localize(tab.labelKey)}</span>
              </span>
              {showChevron && (
                <ChevronRight
                  className="h-4 w-4 flex-shrink-0 text-text-tertiary"
                  aria-hidden="true"
                />
=======
                'text-text-secondary hover:bg-surface-hover hover:text-text-primary focus-visible:ring-text-primary rounded-theme-control flex shrink-0 items-center justify-between gap-2 px-3 py-2.5 text-sm transition-colors focus-visible:ring-2 focus-visible:outline-hidden focus-visible:ring-inset md:py-2',
                'data-[state=active]:bg-surface-tab-selected data-[state=active]:text-text-primary',
              )}
            >
              <span className="flex min-w-0 items-center gap-2 [&>svg]:shrink-0">
                {tab.icon}
                <span className="min-w-0 text-left break-words">{localize(tab.labelKey)}</span>
              </span>
              {showChevron && (
                <ChevronRight className="text-text-tertiary h-4 w-4 shrink-0" aria-hidden="true" />
>>>>>>> upstream/main
              )}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      )}
    </div>
  );
}
