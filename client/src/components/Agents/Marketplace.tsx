<<<<<<< HEAD
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useMediaQuery } from '@librechat/client';
import { PermissionTypes, Permissions } from 'librechat-data-provider';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import type t from 'librechat-data-provider';
import { useDocumentTitle, useHasAccess, useLocalize, TranslationKeys } from '~/hooks';
import { useGetEndpointsQuery, useGetAgentCategoriesQuery } from '~/data-provider';
import MarketplaceAdminSettings from './MarketplaceAdminSettings';
import OpenSidebar from '~/components/Chat/Menus/OpenSidebar';
import { SidePanelGroup } from '~/components/SidePanel';
import CategoryTabs from './CategoryTabs';
import SearchBar from './SearchBar';
import AgentGrid from './AgentGrid';
import { cn } from '~/utils';
=======
import React, { useEffect, useMemo, useRef } from 'react';
import { PermissionTypes, Permissions } from 'librechat-data-provider';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import type t from 'librechat-data-provider';
import { useGetEndpointsQuery, useGetAgentCategoriesQuery } from '~/data-provider';
import SortDropdown, { SORT_OPTIONS, DEFAULT_SORT_OPTION } from './SortDropdown';
import { useDocumentTitle, useHasAccess, useLocalize } from '~/hooks';
import MarketplaceAdminSettings from './MarketplaceAdminSettings';
import OpenSidebar from '~/components/Chat/Menus/OpenSidebar';
import useDrawerViewport from '~/hooks/Nav/useDrawerViewport';
import { SidePanelGroup } from '~/components/SidePanel';
import MineFilterToggle from './MineFilterToggle';
import CategoryTabs from './CategoryTabs';
import SearchBar from './SearchBar';
import AgentGrid from './AgentGrid';
>>>>>>> upstream/main

interface AgentMarketplaceProps {
  className?: string;
}

<<<<<<< HEAD
/**
 * AgentMarketplace - Main component for browsing and discovering agents
 *
 * Provides tabbed navigation for different agent categories,
 * search functionality, and detailed agent view through a modal dialog.
 * Uses URL parameters for state persistence and deep linking.
 */
=======
>>>>>>> upstream/main
const AgentMarketplace: React.FC<AgentMarketplaceProps> = ({ className = '' }) => {
  const localize = useLocalize();
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
<<<<<<< HEAD

  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  // Get URL parameters
  const searchQuery = searchParams.get('q') || '';

  // Animation state
  type Direction = 'left' | 'right';
  // Initialize with a default value to prevent rendering issues
  const [displayCategory, setDisplayCategory] = useState<string>(category || 'all');
  const [nextCategory, setNextCategory] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [animationDirection, setAnimationDirection] = useState<Direction>('right');

  // Ref for the scrollable container to enable infinite scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Set page title
  useDocumentTitle(`${localize('com_agents_marketplace')} | LibreChat`);

  // Ensure endpoints config is loaded first (required for agent queries)
  useGetEndpointsQuery();

  // Fetch categories using existing query pattern
  const categoriesQuery = useGetAgentCategoriesQuery({
    staleTime: 1000 * 60 * 15, // 15 minutes - categories rarely change
=======
  const isSmallScreen = useDrawerViewport();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchQuery = searchParams.get('q') || '';
  const sort = useMemo<t.AgentSortOption>(() => {
    const value = searchParams.get('sort');
    return SORT_OPTIONS.some((option) => option.value === value)
      ? (value as t.AgentSortOption)
      : DEFAULT_SORT_OPTION;
  }, [searchParams]);
  const mine: 0 | 1 = searchParams.get('mine') === '1' ? 1 : 0;

  useDocumentTitle(`${localize('com_agents_marketplace')} | LibreChat`);
  useGetEndpointsQuery();
  const categoriesQuery = useGetAgentCategoriesQuery({
    staleTime: 1000 * 60 * 15,
>>>>>>> upstream/main
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
<<<<<<< HEAD

  // Handle initial category when on /agents without a category
  useEffect(() => {
    if (
      !category &&
      window.location.pathname === '/agents' &&
      categoriesQuery.data &&
      displayCategory === 'all'
    ) {
      const hasPromoted = categoriesQuery.data.some((cat) => cat.value === 'promoted');
      if (hasPromoted) {
        // If promoted exists, update display to show it
        setDisplayCategory('promoted');
      }
    }
  }, [category, categoriesQuery.data, displayCategory]);

  /**
   * Handle agent card selection - updates URL for deep linking
   */
  const handleAgentSelect = (agent: t.Agent) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('agent_id', agent.id);
    setSearchParams(newParams);
  };

  /**
   * Determine ordered tabs to compute indices for direction
   */
  const orderedTabs = useMemo<string[]>(() => {
    const dynamic = (categoriesQuery.data || []).map((c) => c.value);
    // Only include values that actually exist in the categories
    const set = new Set<string>(dynamic);
    return Array.from(set);
  }, [categoriesQuery.data]);

  const getTabIndex = useCallback(
    (tab: string): number => {
      const idx = orderedTabs.indexOf(tab);
      return idx >= 0 ? idx : 0;
    },
    [orderedTabs],
  );

  /**
   * Handle category tab selection changes with directional animation
   */
  const handleTabChange = (tabValue: string) => {
    if (tabValue === displayCategory || isTransitioning) {
      // Ignore redundant or rapid clicks during transition
      return;
    }

    const currentIndex = getTabIndex(displayCategory);
    const newIndex = getTabIndex(tabValue);
    const direction: Direction = newIndex > currentIndex ? 'right' : 'left';

    setAnimationDirection(direction);
    setNextCategory(tabValue);
    setIsTransitioning(true);

    // Update URL immediately, preserving current search params
    const currentSearchParams = searchParams.toString();
    const searchParamsStr = currentSearchParams ? `?${currentSearchParams}` : '';
    if (tabValue === 'promoted') {
      navigate(`/agents${searchParamsStr}`);
    } else {
      navigate(`/agents/${tabValue}${searchParamsStr}`);
    }

    // Complete transition after 300ms
    window.setTimeout(() => {
      setDisplayCategory(tabValue);
      setNextCategory(null);
      setIsTransitioning(false);
    }, 300);
  };

  /**
   * Sync display when URL changes externally (back/forward)
   */
  useEffect(() => {
    if (category && category !== displayCategory && !isTransitioning) {
      // URL changed externally, update display without animation
      setDisplayCategory(category);
    }
  }, [category, displayCategory, isTransitioning]);

  // No longer needed with keyframes

  /**
   * Handle search query changes
   *
   * @param query - The search query string
   */
  const handleSearch = (query: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentCategory = displayCategory;

    if (query.trim()) {
      newParams.set('q', query.trim());
    } else {
      newParams.delete('q');
    }

    // Always preserve current category when searching or clearing search
    if (currentCategory === 'promoted') {
      navigate(`/agents${newParams.toString() ? `?${newParams.toString()}` : ''}`);
    } else {
      navigate(
        `/agents/${currentCategory}${newParams.toString() ? `?${newParams.toString()}` : ''}`,
      );
    }
=======
  const hasPromotedCategory = categoriesQuery.data?.some((item) => item.value === 'promoted');
  /* Turning the filter on from Top Picks navigates to `/agents/all`, because an authored
     agent is rarely promoted. A restored or shared `/agents?mine=1` carries no path
     category, so defaulting it to `promoted` would answer the same intent with the empty
     promoted-and-mine intersection instead of the caller's agents. */
  const defaultCategory = hasPromotedCategory && mine !== 1 ? 'promoted' : 'all';
  const activeCategory = category || defaultCategory;

  const handleTabChange = (value: string) => {
    if (value === activeCategory) {
      return;
    }
    const params = new URLSearchParams(searchParams);
    /* Top Picks is a curated set, so the filter that sent the user to `/agents/all` when
       they turned it on is released when they choose Top Picks again. Carrying it here
       would resolve straight back to All below and make the tab unselectable. */
    if (value === 'promoted') {
      params.delete('mine');
    }
    navigate({
      pathname: value === 'promoted' ? '/agents' : `/agents/${encodeURIComponent(value)}`,
      search: params.toString(),
    });
  };

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query.trim()) {
      params.set('q', query.trim());
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  };

  const handleSortChange = (value: t.AgentSortOption) => {
    const params = new URLSearchParams(searchParams);
    if (value === DEFAULT_SORT_OPTION) {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    setSearchParams(params);
  };

  const handleMineChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (checked) {
      params.set('mine', '1');
    } else {
      params.delete('mine');
    }
    if (checked && activeCategory === 'promoted') {
      navigate({ pathname: '/agents/all', search: params.toString() });
      return;
    }
    /* Dropping the filter on a path that carries no category would hand the view back to
       Top Picks, which is not what turning a filter off means. Name the category the user
       was already looking at instead. */
    if (!checked && category == null && activeCategory === 'all') {
      navigate({ pathname: '/agents/all', search: params.toString() });
      return;
    }
    setSearchParams(params);
>>>>>>> upstream/main
  };

  const hasAccessToMarketplace = useHasAccess({
    permissionType: PermissionTypes.MARKETPLACE,
    permission: Permissions.USE,
  });
  useEffect(() => {
<<<<<<< HEAD
    let timeoutId: ReturnType<typeof setTimeout>;
    if (!hasAccessToMarketplace) {
      timeoutId = setTimeout(() => {
        navigate('/c/new');
      }, 1000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
=======
    if (hasAccessToMarketplace) {
      return;
    }
    const timeoutId = setTimeout(() => navigate('/c/new'), 1000);
    return () => clearTimeout(timeoutId);
>>>>>>> upstream/main
  }, [hasAccessToMarketplace, navigate]);

  if (!hasAccessToMarketplace) {
    return null;
  }
<<<<<<< HEAD
  return (
    <div className={`relative flex w-full grow overflow-hidden bg-presentation ${className}`}>
      <SidePanelGroup>
        <main className="flex h-full flex-col overflow-hidden" role="main">
          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="scrollbar-gutter-stable relative flex h-full flex-col overflow-y-auto overflow-x-hidden"
          >
            {/* Hero Section - scrolls away */}
            {!isSmallScreen && (
              <div className="container mx-auto max-w-4xl">
                <div className={cn('mb-8 text-center', 'mt-12')}>
                  <h1 className="mb-3 text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
                    {localize('com_agents_marketplace')}
                  </h1>
                  <p className="mx-auto mb-6 max-w-2xl text-lg text-text-secondary">
                    {localize('com_agents_marketplace_subtitle')}
                  </p>
                </div>
              </div>
            )}
            {/* Sticky wrapper for search bar and categories */}
            <div className="sticky top-0 z-10 mt-4 bg-presentation pb-4 md:mt-0">
              <div className="container mx-auto max-w-4xl px-4">
                {isSmallScreen ? (
                  <div className="mx-auto mb-3 flex max-w-2xl items-center justify-between gap-2">
                    <OpenSidebar />
                    <MarketplaceAdminSettings compact />
                  </div>
                ) : null}
                {/* Search bar */}
                {/* NJ: We have so few agents ATM that we hide the search bar
                <div className="mx-auto flex max-w-2xl gap-2 pb-6">
                  <SearchBar value={searchQuery} onSearch={handleSearch} />
                  {/* TODO: Remove this once we have a better way to handle admin settings */}
                {/*
                  {!isSmallScreen && <MarketplaceAdminSettings />}
                </div>
                */}

                {/* Category tabs */}
                {/* NJ: We have so few agents ATM that we hide category filters
                <CategoryTabs
                  categories={categoriesQuery.data || []}
                  activeTab={displayCategory}
                  isLoading={categoriesQuery.isLoading}
                  onChange={handleTabChange}
                />
                 */}
              </div>
            </div>
            {/* Scrollable content area */}
            <div className="container mx-auto max-w-4xl px-4 pb-8">
              {/* Two-pane animated container wrapping category header + grid */}
              <div className="relative overflow-hidden">
                {/* Current content pane */}
                <div
                  className={cn(
                    isTransitioning &&
                      (animationDirection === 'right'
                        ? 'motion-safe:animate-slide-out-left'
                        : 'motion-safe:animate-slide-out-right'),
                  )}
                  key={`pane-current-${displayCategory}`}
                >
                  {/* Category header - only show when not searching */}
                  {/* NJ: We turned off categories, so no need for this category header */}
                  {false && !searchQuery && (
                    <div className="mb-6 mt-6">
                      {(() => {
                        // Get category data for display
                        const getCategoryData = () => {
                          if (displayCategory === 'promoted') {
                            return {
                              name: localize('com_agents_top_picks'),
                              description: localize('com_agents_recommended'),
                            };
                          }
                          if (displayCategory === 'all') {
                            return {
                              name: localize('com_agents_all'),
                              description: localize('com_agents_all_description'),
                            };
                          }

                          // Find the category in the API data
                          const categoryData = categoriesQuery.data?.find(
                            (cat) => cat.value === displayCategory,
                          );
                          if (categoryData) {
                            return {
                              name: categoryData.label?.startsWith('com_')
                                ? localize(categoryData.label as TranslationKeys)
                                : categoryData.label,
                              description: categoryData.description?.startsWith('com_')
                                ? localize(categoryData.description as TranslationKeys)
                                : categoryData.description || '',
                            };
                          }

                          // Fallback for unknown categories
                          return {
                            name:
                              displayCategory.charAt(0).toUpperCase() + displayCategory.slice(1),
                            description: '',
                          };
                        };

                        const { name, description } = getCategoryData();

                        return (
                          <div className="text-left">
                            <h2 className="text-2xl font-bold text-text-primary">{name}</h2>
                            {description && (
                              <p className="mt-2 text-text-secondary">{description}</p>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Agent grid */}
                  <AgentGrid
                    key={`grid-${displayCategory}`}
                    category={displayCategory}
                    searchQuery={searchQuery}
                    onSelectAgent={handleAgentSelect}
                    scrollElementRef={scrollContainerRef}
                  />
                </div>

                {/* Next content pane, only during transition */}
                {isTransitioning && nextCategory && (
                  <div
                    className={cn(
                      'absolute inset-0',
                      animationDirection === 'right'
                        ? 'motion-safe:animate-slide-in-right'
                        : 'motion-safe:animate-slide-in-left',
                    )}
                    key={`pane-next-${nextCategory}-${animationDirection}`}
                  >
                    {/* Category header - only show when not searching */}
                    {!searchQuery && (
                      <div className="mb-6 mt-6">
                        {(() => {
                          // Get category data for display
                          const getCategoryData = () => {
                            if (nextCategory === 'promoted') {
                              return {
                                name: localize('com_agents_top_picks'),
                                description: localize('com_agents_recommended'),
                              };
                            }
                            if (nextCategory === 'all') {
                              return {
                                name: localize('com_agents_all'),
                                description: localize('com_agents_all_description'),
                              };
                            }

                            // Find the category in the API data
                            const categoryData = categoriesQuery.data?.find(
                              (cat) => cat.value === nextCategory,
                            );
                            if (categoryData) {
                              return {
                                name: categoryData.label?.startsWith('com_')
                                  ? localize(categoryData.label as TranslationKeys)
                                  : categoryData.label,
                                description: categoryData.description?.startsWith('com_')
                                  ? localize(
                                      categoryData.description as Parameters<typeof localize>[0],
                                    )
                                  : categoryData.description || '',
                              };
                            }

                            // Fallback for unknown categories
                            return {
                              name:
                                (nextCategory || '').charAt(0).toUpperCase() +
                                (nextCategory || '').slice(1),
                              description: '',
                            };
                          };

                          const { name, description } = getCategoryData();

                          return (
                            <div className="text-left">
                              <h2 className="text-2xl font-bold text-text-primary">{name}</h2>
                              {description && (
                                <p className="mt-2 text-text-secondary">{description}</p>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    )}

                    {/* Agent grid */}
                    <AgentGrid
                      key={`grid-${nextCategory}`}
                      category={nextCategory}
                      searchQuery={searchQuery}
                      onSelectAgent={handleAgentSelect}
                      scrollElementRef={scrollContainerRef}
                    />
                  </div>
                )}

                {/* Note: Using Tailwind keyframes for slide in/out animations */}
              </div>
            </div>
          </div>
=======

  return (
    <div
      className={`bg-surface-primary-alt relative flex w-full grow overflow-hidden ${className}`}
    >
      <SidePanelGroup>
        <main
          className="flex h-full min-w-0 flex-col overflow-hidden"
          aria-labelledby="marketplace-heading"
        >
          {/* The compact header has no room for a visible title, but a landmark label is
              not reachable by heading navigation: without this the document's outline
              would start at an agent card. */}
          <h1 id="marketplace-heading" className="sr-only">
            {localize('com_agents_marketplace')}
          </h1>
          <div className="border-border-light shrink-0 border-b">
            <div className="flex items-center gap-2 p-3">
              {isSmallScreen && <OpenSidebar className="size-9 shrink-0 rounded-lg" />}
              <SearchBar value={searchQuery} onSearch={handleSearch} className="min-w-0 flex-1" />
              <MarketplaceAdminSettings />
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-3 pb-3">
              <div className="min-w-0 flex-1 basis-full lg:basis-0">
                <CategoryTabs
                  categories={categoriesQuery.data || []}
                  activeTab={activeCategory}
                  isLoading={categoriesQuery.isLoading}
                  onChange={handleTabChange}
                />
              </div>
              <div className="ms-auto flex shrink-0 items-center gap-1.5">
                <MineFilterToggle checked={mine === 1} onCheckedChange={handleMineChange} />
                <SortDropdown value={sort} onChange={handleSortChange} />
              </div>
            </div>
          </div>
          <div
            ref={scrollContainerRef}
            className="min-h-0 flex-1 scrollbar-gutter-stable overflow-x-hidden overflow-y-auto p-3"
          >
            {/* Deliberately unkeyed: the grid's own `scopeKey` already carries the category,
                so it replaces the results itself and hands focus back when the scope
                changes. Remounting it on the category instead would destroy an open detail
                dialog and its return target, and the replacement grid starts with an empty
                `previousScopeKeyRef`, so it reads that render as a first mount and leaves
                focus on the document. */}
            <AgentGrid
              category={activeCategory}
              searchQuery={searchQuery}
              scrollElementRef={scrollContainerRef}
              sort={sort}
              mine={mine}
            />
          </div>
>>>>>>> upstream/main
        </main>
      </SidePanelGroup>
    </div>
  );
};

export default AgentMarketplace;
