import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { ListFilter, User, Share2 } from 'lucide-react';
import { Dropdown, FilterInput } from '@librechat/client';
import { SystemCategories } from 'librechat-data-provider';
import type { Option } from '~/common';
import { useLocalize, useCategories, useDebounce } from '~/hooks';
import CreatePromptButton from '../buttons/CreatePromptButton';
import { usePromptGroupsContext } from '~/Providers';
<<<<<<< HEAD
=======
import { PanelHeader } from '~/components/ui';
>>>>>>> upstream/main
import { cn } from '~/utils';
import store from '~/store';

export default function FilterPrompts({
  className = '',
  dropdownClassName = '',
<<<<<<< HEAD
}: {
  className?: string;
  dropdownClassName?: string;
=======
  children,
}: {
  className?: string;
  dropdownClassName?: string;
  /** Panel-specific controls that sit under the search, e.g. the auto-send toggle */
  children?: React.ReactNode;
>>>>>>> upstream/main
}) {
  const localize = useLocalize();
  const { name, setName, hasAccess, promptGroups } = usePromptGroupsContext() ?? {};
  const { categories } = useCategories({ className: 'h-4 w-4', hasAccess });
  const [searchTerm, setSearchTerm] = useState(name || '');
  const [categoryFilter, setCategory] = useRecoilState(store.promptsCategory);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const prevNameRef = useRef(name);

  const filterOptions = useMemo(() => {
    const baseOptions: Option[] = [
      {
        value: SystemCategories.ALL,
        label: localize('com_ui_all_proper'),
<<<<<<< HEAD
        icon: <ListFilter className="h-4 w-4 text-text-primary" />,
=======
        icon: <ListFilter className="text-text-primary h-4 w-4" />,
>>>>>>> upstream/main
      },
      {
        value: SystemCategories.MY_PROMPTS,
        label: localize('com_ui_my_prompts'),
<<<<<<< HEAD
        icon: <User className="h-4 w-4 text-text-primary" />,
=======
        icon: <User className="text-text-primary h-4 w-4" />,
>>>>>>> upstream/main
      },
      {
        value: SystemCategories.SHARED_PROMPTS,
        label: localize('com_ui_shared_prompts'),
<<<<<<< HEAD
        icon: <Share2 className="h-4 w-4 text-text-primary" />,
=======
        icon: <Share2 className="text-text-primary h-4 w-4" />,
>>>>>>> upstream/main
      },
      { divider: true, value: null },
    ];

    const categoryOptions = categories
      ? [...categories]
      : [
          {
            value: SystemCategories.NO_CATEGORY,
            label: localize('com_ui_no_category'),
          },
        ];

    return [...baseOptions, ...categoryOptions];
  }, [categories, localize]);

  const onSelect = useCallback(
    (value: string) => {
      if (value === SystemCategories.ALL) {
        setCategory('');
      } else {
        setCategory(value);
      }
    },
    [setCategory],
  );

  // Sync searchTerm with name prop when it changes externally
  useEffect(() => {
    if (prevNameRef.current !== name) {
      prevNameRef.current = name;
      setSearchTerm(name || '');
    }
  }, [name]);

  useEffect(() => {
    if (!setName) {
      return;
    }
    setName(debouncedSearchTerm);
  }, [debouncedSearchTerm, setName]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const resultCount = promptGroups?.length ?? 0;
  const searchResultsAnnouncement = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return '';
    }
    return resultCount === 1
      ? localize('com_ui_search_result_count', { count: resultCount })
      : localize('com_ui_search_results_count', { count: resultCount });
  }, [debouncedSearchTerm, resultCount, localize]);

  return (
<<<<<<< HEAD
    <div role="search" className={cn('flex items-center gap-2', className)}>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {searchResultsAnnouncement}
      </div>
      <Dropdown
        value={categoryFilter || SystemCategories.ALL}
        onChange={onSelect}
        options={filterOptions}
        className={cn('shrink-0 [&>button]:size-9', dropdownClassName)}
        triggerClassName="rounded-lg bg-transparent"
        icon={<ListFilter className="h-4 w-4" />}
        label="Filter: "
        ariaLabel={localize('com_ui_filter_prompts')}
        iconOnly
      />
      <FilterInput
        inputId="prompts-filter"
        label={localize('com_ui_filter_prompts_name')}
        value={searchTerm}
        onChange={handleSearchChange}
        containerClassName="flex-1"
      />
      <CreatePromptButton />
    </div>
=======
    <PanelHeader
      className={className}
      title={localize('com_ui_prompts')}
      action={<CreatePromptButton />}
      search={
        <div role="search" className="flex items-center gap-2">
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {searchResultsAnnouncement}
          </div>
          <Dropdown
            value={categoryFilter || SystemCategories.ALL}
            onChange={onSelect}
            options={filterOptions}
            className={cn('shrink-0 [&>button]:size-9', dropdownClassName)}
            shape="default"
            triggerClassName="bg-transparent"
            icon={<ListFilter className="h-4 w-4" />}
            label="Filter: "
            ariaLabel={localize('com_ui_filter_prompts')}
            iconOnly
          />
          <FilterInput
            inputId="prompts-filter"
            label={localize('com_ui_filter_prompts_name')}
            value={searchTerm}
            onChange={handleSearchChange}
            containerClassName="flex-1"
          />
        </div>
      }
    >
      {children}
    </PanelHeader>
>>>>>>> upstream/main
  );
}
