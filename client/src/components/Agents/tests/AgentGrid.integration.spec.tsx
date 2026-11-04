<<<<<<< HEAD
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type t from 'librechat-data-provider';
import AgentGrid from '../AgentGrid';

// Mock the marketplace agent query hook
jest.mock('~/data-provider/Agents', () => ({
  useMarketplaceAgentsInfiniteQuery: jest.fn(),
}));

jest.mock('~/hooks/Agents', () => ({
  useAgentCategories: jest.fn(() => ({
    categories: [],
    isLoading: false,
    error: null,
  })),
}));

// Mock useLocalize hook
jest.mock('~/hooks/useLocalize', () => () => (key: string, options?: any) => {
  const mockTranslations: Record<string, string> = {
    com_agents_top_picks: 'Top Picks',
    com_agents_all: 'All Agents',
    com_agents_recommended: 'Our recommended agents',
    com_agents_results_for: 'Results for "{{query}}"',
    com_agents_see_more: 'See more',
    com_agents_error_loading: 'Error loading agents',
    com_agents_error_searching: 'Error searching agents',
    com_agents_search_empty_heading: 'No results found',
    com_agents_empty_state_heading: 'No agents available',
    com_agents_loading: 'Loading...',
    com_agents_grid_announcement: '{{count}} agents in {{category}}',
    com_agents_no_more_results: "You've reached the end of the results",
  };

  let translation = mockTranslations[key] || key;

  if (options) {
    Object.keys(options).forEach((optionKey) => {
      translation = translation.replace(new RegExp(`{{${optionKey}}}`, 'g'), options[optionKey]);
    });
  }

  return translation;
});

// Mock ErrorDisplay component
jest.mock('../ErrorDisplay', () => ({
  __esModule: true,
  default: ({ error, onRetry }: { error: any; onRetry: () => void }) => (
    <div>
      <div>
        {`Error: `}
        {typeof error === 'string' ? error : error?.message || 'Unknown error'}
      </div>
      <button onClick={onRetry}>{`Retry`}</button>
    </div>
  ),
}));

// Mock AgentCard component
jest.mock('../AgentCard', () => ({
  __esModule: true,
  default: ({ agent, onSelect }: { agent: t.Agent; onSelect?: (agent: t.Agent) => void }) => (
    <div data-testid={`agent-card-${agent.id}`} onClick={() => onSelect?.(agent)}>
      <h3>{agent.name}</h3>
      <p>{agent.description}</p>
    </div>
  ),
}));

// Import the actual modules to get the mocked functions
import { useMarketplaceAgentsInfiniteQuery } from '~/data-provider/Agents';

const mockUseMarketplaceAgentsInfiniteQuery = jest.mocked(useMarketplaceAgentsInfiniteQuery);

// Helper to create mock API response
const createMockResponse = (
  agentIds: string[],
  hasMore: boolean,
  afterCursor?: string,
): t.AgentListResponse => ({
  object: 'list',
  data: agentIds.map(
    (id) =>
      ({
        id,
        name: `Agent ${id}`,
        description: `Description for ${id}`,
        created_at: Date.now(),
        model: 'gpt-4',
        tools: [],
        instructions: '',
        avatar: null,
        provider: 'openai',
        model_parameters: {
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          maxContextTokens: 2000,
          max_context_tokens: 2000,
          max_output_tokens: 2000,
        },
      }) as t.Agent,
  ),
  first_id: agentIds[0] || '',
  last_id: agentIds[agentIds.length - 1] || '',
  has_more: hasMore,
  after: afterCursor,
});

// Helper to setup mock viewport
const setupViewport = (scrollHeight: number, clientHeight: number) => {
  const listeners: { [key: string]: EventListener[] } = {};
  return {
    scrollHeight,
    clientHeight,
    scrollTop: 0,
    addEventListener: jest.fn((event: string, listener: EventListener) => {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event].push(listener);
    }),
    removeEventListener: jest.fn((event: string, listener: EventListener) => {
      if (listeners[event]) {
        listeners[event] = listeners[event].filter((l) => l !== listener);
      }
    }),
    dispatchEvent: jest.fn((event: Event) => {
      const eventListeners = listeners[event.type];
      if (eventListeners) {
        eventListeners.forEach((listener) => listener(event));
      }
      return true;
    }),
  } as unknown as HTMLElement;
};

// Helper to create mock infinite query return value
const createMockInfiniteQuery = (
  pages: t.AgentListResponse[],
  options?: {
    isLoading?: boolean;
    hasNextPage?: boolean;
    fetchNextPage?: jest.Mock;
    isFetchingNextPage?: boolean;
  },
) =>
  ({
    data: {
      pages,
      pageParams: pages.map((_, i) => (i === 0 ? undefined : `cursor-${i * 6}`)),
    },
    isLoading: options?.isLoading ?? false,
    error: null,
    isFetching: false,
    hasNextPage: options?.hasNextPage ?? pages[pages.length - 1]?.has_more ?? false,
    isFetchingNextPage: options?.isFetchingNextPage ?? false,
    fetchNextPage: options?.fetchNextPage ?? jest.fn(),
    refetch: jest.fn(),
    // Add missing required properties for UseInfiniteQueryResult
    isError: false,
    isLoadingError: false,
    isRefetchError: false,
    isSuccess: true,
    status: 'success' as const,
    dataUpdatedAt: Date.now(),
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    failureReason: null,
    fetchStatus: 'idle' as const,
    isFetched: true,
    isFetchedAfterMount: true,
    isInitialLoading: false,
    isPaused: false,
    isPlaceholderData: false,
    isPending: false,
    isRefetching: false,
    isStale: false,
    remove: jest.fn(),
  }) as any;

describe('AgentGrid Integration with useGetMarketplaceAgentsQuery', () => {
  const mockOnSelectAgent = jest.fn();

  const mockAgents: t.Agent[] = [
    {
      id: '1',
      name: 'Test Agent 1',
      description: 'First test agent',
      avatar: { filepath: '/avatar1.png', source: 'local' },
      category: 'finance',
      authorName: 'Author 1',
      created_at: 1672531200000,
      instructions: null,
      provider: 'custom',
      model: 'gpt-4',
      model_parameters: {
        temperature: null,
        maxContextTokens: null,
        max_context_tokens: null,
        max_output_tokens: null,
        top_p: null,
        frequency_penalty: null,
        presence_penalty: null,
      },
    },
    {
      id: '2',
      name: 'Test Agent 2',
      description: 'Second test agent',
      avatar: { filepath: '/avatar2.png', source: 'local' },
      category: 'finance',
      authorName: 'Author 2',
      created_at: 1672531200000,
      instructions: null,
      provider: 'custom',
      model: 'gpt-4',
      model_parameters: {
        temperature: 0.7,
        top_p: 0.9,
        frequency_penalty: 0,
        maxContextTokens: null,
        max_context_tokens: null,
        max_output_tokens: null,
        presence_penalty: null,
      },
    },
  ];
  const defaultMockQueryResult = {
    data: {
      pages: [
        {
          data: mockAgents,
        },
      ],
    },
    isLoading: false,
    error: null,
    isFetching: false,
    isFetchingNextPage: false,
    hasNextPage: true,
    fetchNextPage: jest.fn(),
    refetch: jest.fn(),
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMarketplaceAgentsInfiniteQuery.mockReturnValue(defaultMockQueryResult);
  });

  describe('Query Integration', () => {
    it('should call useGetMarketplaceAgentsQuery with correct parameters for category search', () => {
      render(
        <AgentGrid category="finance" searchQuery="test query" onSelectAgent={mockOnSelectAgent} />,
      );

      expect(mockUseMarketplaceAgentsInfiniteQuery).toHaveBeenCalledWith({
        requiredPermission: 1,
        category: 'finance',
        search: 'test query',
        limit: 6,
      });
    });

    it('should call useGetMarketplaceAgentsQuery with promoted=1 for promoted category', () => {
      render(<AgentGrid category="promoted" searchQuery="" onSelectAgent={mockOnSelectAgent} />);

      expect(mockUseMarketplaceAgentsInfiniteQuery).toHaveBeenCalledWith({
        requiredPermission: 1,
        promoted: 1,
        limit: 6,
      });
    });

    it('should call useGetMarketplaceAgentsQuery without category filter for "all" category', () => {
      render(<AgentGrid category="all" searchQuery="" onSelectAgent={mockOnSelectAgent} />);

      expect(mockUseMarketplaceAgentsInfiniteQuery).toHaveBeenCalledWith({
        requiredPermission: 1,
        limit: 6,
      });
    });

    it('should not include category in search when category is "all" or "promoted"', () => {
      render(<AgentGrid category="all" searchQuery="test" onSelectAgent={mockOnSelectAgent} />);

      expect(mockUseMarketplaceAgentsInfiniteQuery).toHaveBeenCalledWith({
        requiredPermission: 1,
        search: 'test',
        limit: 6,
      });
    });
  });

  // Create wrapper with QueryClient
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  describe('Agent Display', () => {
    it('should render agent cards when data is available', () => {
      const Wrapper = createWrapper();
      render(
        <Wrapper>
          <AgentGrid category="finance" searchQuery="" onSelectAgent={mockOnSelectAgent} />
        </Wrapper>,
      );

      expect(screen.getByTestId('agent-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('agent-card-2')).toBeInTheDocument();
      expect(screen.getByText('Test Agent 1')).toBeInTheDocument();
      expect(screen.getByText('Test Agent 2')).toBeInTheDocument();
    });

    it('should call onSelectAgent when agent card is clicked', () => {
      const Wrapper = createWrapper();
      render(
        <Wrapper>
          <AgentGrid category="finance" searchQuery="" onSelectAgent={mockOnSelectAgent} />
        </Wrapper>,
      );

      fireEvent.click(screen.getByTestId('agent-card-1'));
      expect(mockOnSelectAgent).toHaveBeenCalledWith(mockAgents[0]);
    });
  });

  describe('Loading States', () => {
    it('should show loading state when isLoading is true', () => {
      mockUseMarketplaceAgentsInfiniteQuery.mockReturnValue({
        ...defaultMockQueryResult,
        isLoading: true,
        data: undefined,
      });

      const Wrapper = createWrapper();
      render(
        <Wrapper>
          <AgentGrid category="finance" searchQuery="" onSelectAgent={mockOnSelectAgent} />
        </Wrapper>,
      );

      // Should show loading spinner
      const spinner = document.querySelector('.text-text-primary');
      expect(spinner).toBeInTheDocument();
    });

    it('should retain cached agents while refetching', () => {
      mockUseMarketplaceAgentsInfiniteQuery.mockReturnValue({
        ...defaultMockQueryResult,
        isFetching: true,
      });

      const Wrapper = createWrapper();
      render(
        <Wrapper>
          <AgentGrid category="finance" searchQuery="" onSelectAgent={mockOnSelectAgent} />
        </Wrapper>,
      );

      expect(screen.getByTestId('agent-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('agent-card-2')).toBeInTheDocument();
    });

    it('should show empty state when no agents are available', () => {
      mockUseMarketplaceAgentsInfiniteQuery.mockReturnValue({
        ...defaultMockQueryResult,
        data: {
          pages: [
            {
              data: [],
            },
          ],
        },
      });

      const Wrapper = createWrapper();
      render(
        <Wrapper>
          <AgentGrid category="finance" searchQuery="" onSelectAgent={mockOnSelectAgent} />
        </Wrapper>,
      );

      expect(screen.getByText('No agents available')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should show error display when query has error', () => {
      const mockError = new Error('Failed to fetch agents');
      mockUseMarketplaceAgentsInfiniteQuery.mockReturnValue({
        ...defaultMockQueryResult,
        error: mockError,
        isError: true,
        data: undefined,
      });

      const Wrapper = createWrapper();
      render(
        <Wrapper>
          <AgentGrid category="finance" searchQuery="" onSelectAgent={mockOnSelectAgent} />
        </Wrapper>,
      );

      expect(screen.getByText('Error: Failed to fetch agents')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    });
  });

  describe('Search Results', () => {
    it('should show search results title when searching', () => {
      const Wrapper = createWrapper();
      render(
        <Wrapper>
          <AgentGrid
            category="finance"
            searchQuery="automation"
            onSelectAgent={mockOnSelectAgent}
          />
        </Wrapper>,
      );

      // The component doesn't show search result titles, just displays the filtered agents
      expect(screen.getByTestId('agent-card-1')).toBeInTheDocument();
    });

    it('should show empty search results message', () => {
      mockUseMarketplaceAgentsInfiniteQuery.mockReturnValue({
        ...defaultMockQueryResult,
        data: {
          pages: [
            {
              data: [],
            },
          ],
        },
      });

      const Wrapper = createWrapper();
      render(
        <Wrapper>
          <AgentGrid
            category="finance"
            searchQuery="nonexistent"
            onSelectAgent={mockOnSelectAgent}
          />
        </Wrapper>,
      );

      expect(screen.getByText('No agents available')).toBeInTheDocument();
    });
  });

  describe('Infinite Scroll Functionality', () => {
    beforeEach(() => {
      // Silence console.log in tests
      jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should show loading indicator when fetching next page', () => {
      mockUseMarketplaceAgentsInfiniteQuery.mockReturnValue({
        ...defaultMockQueryResult,
        isFetchingNextPage: true,
        hasNextPage: true,
      });

      const Wrapper = createWrapper();
      render(
        <Wrapper>
          <AgentGrid category="finance" searchQuery="" onSelectAgent={mockOnSelectAgent} />
        </Wrapper>,
      );

      expect(screen.getByRole('status', { name: 'Loading...' })).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toHaveClass('sr-only');
    });

    it('should show end of results message when hasNextPage is false and agents exist', () => {
      mockUseMarketplaceAgentsInfiniteQuery.mockReturnValue({
        ...defaultMockQueryResult,
        hasNextPage: false,
        isFetchingNextPage: false,
      });

      const Wrapper = createWrapper();
      render(
        <Wrapper>
          <AgentGrid category="finance" searchQuery="" onSelectAgent={mockOnSelectAgent} />
        </Wrapper>,
      );

      expect(screen.getByText("You've reached the end of the results")).toBeInTheDocument();
    });

    it('should not show end of results message when no agents exist', () => {
      mockUseMarketplaceAgentsInfiniteQuery.mockReturnValue({
        ...defaultMockQueryResult,
        hasNextPage: false,
        data: {
          pages: [{ data: [] }],
        },
      });

      const Wrapper = createWrapper();
      render(
        <Wrapper>
          <AgentGrid category="finance" searchQuery="" onSelectAgent={mockOnSelectAgent} />
        </Wrapper>,
      );

      expect(screen.queryByText("You've reached the end of the results")).not.toBeInTheDocument();
    });

    describe('Auto-fetch to fill viewport', () => {
      it('should NOT auto-fetch when viewport is filled (5 agents, has_more=false)', async () => {
        const mockResponse = createMockResponse(['1', '2', '3', '4', '5'], false);
        const fetchNextPage = jest.fn();

        mockUseMarketplaceAgentsInfiniteQuery.mockReturnValue(
          createMockInfiniteQuery([mockResponse], { fetchNextPage }),
        );

        const scrollElement = setupViewport(500, 1000); // Content smaller than viewport
        const scrollElementRef = { current: scrollElement };
        const Wrapper = createWrapper();

        render(
          <Wrapper>
            <AgentGrid
              category="all"
              searchQuery=""
              onSelectAgent={mockOnSelectAgent}
              scrollElementRef={scrollElementRef}
            />
          </Wrapper>,
        );

        // Wait for initial render
        await waitFor(() => {
          expect(screen.getAllByRole('gridcell')).toHaveLength(5);
        });

        // Wait to ensure no auto-fetch happens
        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 200));
        });

        // fetchNextPage should NOT be called since has_more is false
        expect(fetchNextPage).not.toHaveBeenCalled();
      });

      it('should auto-fetch when viewport not filled (7 agents, big viewport)', async () => {
        const firstPage = createMockResponse(['1', '2', '3', '4', '5', '6'], true, 'cursor-6');
        const secondPage = createMockResponse(['7'], false);
        let currentPages = [firstPage];
        const fetchNextPage = jest.fn();

        // Mock that updates pages when fetchNextPage is called
        mockUseMarketplaceAgentsInfiniteQuery.mockImplementation(() =>
          createMockInfiniteQuery(currentPages, {
            fetchNextPage: jest.fn().mockImplementation(() => {
              fetchNextPage();
              currentPages = [firstPage, secondPage];
              return Promise.resolve();
            }),
            hasNextPage: true,
          }),
        );

        const scrollElement = setupViewport(400, 1200); // Large viewport (content < viewport)
        const scrollElementRef = { current: scrollElement };
        const Wrapper = createWrapper();

        const { rerender } = render(
          <Wrapper>
            <AgentGrid
              category="all"
              searchQuery=""
              onSelectAgent={mockOnSelectAgent}
              scrollElementRef={scrollElementRef}
            />
          </Wrapper>,
        );

        // Wait for initial 6 agents
        await waitFor(() => {
          expect(screen.getAllByRole('gridcell')).toHaveLength(6);
        });

        // Wait for ResizeObserver and auto-fetch to trigger
        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 150));
        });

        // Auto-fetch should have been triggered (multiple times due to reliability checks)
        expect(fetchNextPage).toHaveBeenCalled();
        expect(fetchNextPage.mock.calls.length).toBeGreaterThanOrEqual(1);

        // Update mock data and re-render
        currentPages = [firstPage, secondPage];
        rerender(
          <Wrapper>
            <AgentGrid
              category="all"
              searchQuery=""
              onSelectAgent={mockOnSelectAgent}
              scrollElementRef={scrollElementRef}
            />
          </Wrapper>,
        );

        // Should now show all 7 agents
        await waitFor(() => {
          expect(screen.getAllByRole('gridcell')).toHaveLength(7);
        });
      });

      it('should NOT auto-fetch when viewport is filled (7 agents, small viewport)', async () => {
        const firstPage = createMockResponse(['1', '2', '3', '4', '5', '6'], true, 'cursor-6');
        const fetchNextPage = jest.fn();

        mockUseMarketplaceAgentsInfiniteQuery.mockReturnValue(
          createMockInfiniteQuery([firstPage], { fetchNextPage, hasNextPage: true }),
        );

        const scrollElement = setupViewport(1200, 600); // Small viewport, content fills it
        const scrollElementRef = { current: scrollElement };
        const Wrapper = createWrapper();

        render(
          <Wrapper>
            <AgentGrid
              category="all"
              searchQuery=""
              onSelectAgent={mockOnSelectAgent}
              scrollElementRef={scrollElementRef}
            />
          </Wrapper>,
        );

        // Wait for initial 6 agents
        await waitFor(() => {
          expect(screen.getAllByRole('gridcell')).toHaveLength(6);
        });

        // Wait to ensure no auto-fetch happens
        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 200));
        });

        // Should NOT auto-fetch since viewport is filled
        expect(fetchNextPage).not.toHaveBeenCalled();
      });

      it('should auto-fetch once to fill viewport then stop (20 agents)', async () => {
        const allPages = [
          createMockResponse(['1', '2', '3', '4', '5', '6'], true, 'cursor-6'),
          createMockResponse(['7', '8', '9', '10', '11', '12'], true, 'cursor-12'),
          createMockResponse(['13', '14', '15', '16', '17', '18'], true, 'cursor-18'),
          createMockResponse(['19', '20'], false),
        ];

        let currentPages = [allPages[0]];
        let fetchCount = 0;
        const fetchNextPage = jest.fn();

        mockUseMarketplaceAgentsInfiniteQuery.mockImplementation(() =>
          createMockInfiniteQuery(currentPages, {
            fetchNextPage: jest.fn().mockImplementation(() => {
              fetchCount++;
              fetchNextPage();
              if (currentPages.length < 2) {
                currentPages = allPages.slice(0, 2);
              }
              return Promise.resolve();
            }),
            hasNextPage: currentPages.length < 2,
          }),
        );

        const scrollElement = setupViewport(600, 1000); // Viewport fits ~12 agents
        const scrollElementRef = { current: scrollElement };
        const Wrapper = createWrapper();

        const { rerender } = render(
          <Wrapper>
            <AgentGrid
              category="all"
              searchQuery=""
              onSelectAgent={mockOnSelectAgent}
              scrollElementRef={scrollElementRef}
            />
          </Wrapper>,
        );

        // Wait for initial 6 agents
        await waitFor(() => {
          expect(screen.getAllByRole('gridcell')).toHaveLength(6);
        });

        // Should auto-fetch to fill viewport
        await waitFor(
          () => {
            expect(fetchNextPage).toHaveBeenCalledTimes(1);
          },
          { timeout: 500 },
        );

        // Simulate viewport being filled after 12 agents
        Object.defineProperty(scrollElement, 'scrollHeight', {
          value: 1200,
          writable: true,
          configurable: true,
        });

        currentPages = allPages.slice(0, 2);
        rerender(
          <Wrapper>
            <AgentGrid
              category="all"
              searchQuery=""
              onSelectAgent={mockOnSelectAgent}
              scrollElementRef={scrollElementRef}
            />
          </Wrapper>,
        );

        // Should show 12 agents
        await waitFor(() => {
          expect(screen.getAllByRole('gridcell')).toHaveLength(12);
        });

        // Wait to ensure no additional auto-fetch
        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 200));
        });

        // Should only have fetched once (to fill viewport)
        expect(fetchCount).toBe(1);
        expect(fetchNextPage).toHaveBeenCalledTimes(1);
      });

      it('should auto-fetch when viewport resizes to be taller (window resize)', async () => {
        const firstPage = createMockResponse(['1', '2', '3', '4', '5', '6'], true, 'cursor-6');
        const secondPage = createMockResponse(['7', '8', '9', '10', '11', '12'], true, 'cursor-12');
        let currentPages = [firstPage];
        const fetchNextPage = jest.fn();
        let resizeObserverCallback: ResizeObserverCallback | null = null;

        // Mock that updates pages when fetchNextPage is called
        mockUseMarketplaceAgentsInfiniteQuery.mockImplementation(() =>
          createMockInfiniteQuery(currentPages, {
            fetchNextPage: jest.fn().mockImplementation(() => {
              fetchNextPage();
              if (currentPages.length === 1) {
                currentPages = [firstPage, secondPage];
              }
              return Promise.resolve();
            }),
            hasNextPage: currentPages.length === 1,
          }),
        );

        // Mock ResizeObserver to capture the callback
        const ResizeObserverMock = jest.fn().mockImplementation((callback) => {
          resizeObserverCallback = callback;
          return {
            observe: jest.fn(),
            disconnect: jest.fn(),
            unobserve: jest.fn(),
          };
        });
        global.ResizeObserver = ResizeObserverMock as any;

        // Start with a small viewport that fits the content
        const scrollElement = setupViewport(800, 600);
        const scrollElementRef = { current: scrollElement };
        const Wrapper = createWrapper();

        const { rerender } = render(
          <Wrapper>
            <AgentGrid
              category="all"
              searchQuery=""
              onSelectAgent={mockOnSelectAgent}
              scrollElementRef={scrollElementRef}
            />
          </Wrapper>,
        );

        // Wait for initial 6 agents
        await waitFor(() => {
          expect(screen.getAllByRole('gridcell')).toHaveLength(6);
        });

        // Verify ResizeObserver was set up
        expect(ResizeObserverMock).toHaveBeenCalled();
        expect(resizeObserverCallback).not.toBeNull();

        // Initially no fetch should happen as viewport is filled
        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
        });
        expect(fetchNextPage).not.toHaveBeenCalled();

        // Simulate window resize - make viewport taller
        Object.defineProperty(scrollElement, 'clientHeight', {
          value: 1200, // Now taller than content
          writable: true,
          configurable: true,
        });

        // Trigger ResizeObserver callback to simulate resize detection
        act(() => {
          if (resizeObserverCallback) {
            resizeObserverCallback(
              [
                {
                  target: scrollElement,
                  contentRect: {
                    x: 0,
                    y: 0,
                    width: 800,
                    height: 1200,
                    top: 0,
                    right: 800,
                    bottom: 1200,
                    left: 0,
                  } as DOMRectReadOnly,
                  borderBoxSize: [],
                  contentBoxSize: [],
                  devicePixelContentBoxSize: [],
                } as ResizeObserverEntry,
              ],
              {} as ResizeObserver,
            );
          }
        });

        // Should trigger auto-fetch due to viewport now being larger than content
        await waitFor(
          () => {
            expect(fetchNextPage).toHaveBeenCalledTimes(1);
          },
          { timeout: 500 },
        );

        // Update the component with new data
        rerender(
          <Wrapper>
            <AgentGrid
              category="all"
              searchQuery=""
              onSelectAgent={mockOnSelectAgent}
              scrollElementRef={scrollElementRef}
            />
          </Wrapper>,
        );

        // Should now show 12 agents after fetching
        await waitFor(() => {
          expect(screen.getAllByRole('gridcell')).toHaveLength(12);
        });
      });
    });
=======
jest.mock('../ResetApprovals', () => () => null);
import React, { useRef } from 'react';
import userEvent from '@testing-library/user-event';
import { dataService, QueryKeys } from 'librechat-data-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import type t from 'librechat-data-provider';
import type { VirtualLayout } from './layout';
import '@testing-library/jest-dom';
import { installVirtualLayout, makeAgents } from './layout';
import AgentGrid from '../AgentGrid';

jest.mock('librechat-data-provider', () => {
  const actual = jest.requireActual('librechat-data-provider');
  return { ...actual, dataService: { ...actual.dataService, getMarketplaceAgents: jest.fn() } };
});
jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string) => key,
  useAgentCategories: () => ({ categories: [] }),
}));
jest.mock('~/utils', () => ({
  ...jest.requireActual('~/utils/agents'),
  cn: (...classes: Array<string | false | undefined | null>) => classes.filter(Boolean).join(' '),
}));
jest.mock('../ErrorDisplay', () => ({
  __esModule: true,
  default: ({ error, onRetry }: { error: Error; onRetry: () => void }) => (
    <div role="alert">
      <span>{error.message}</span>
      <button onClick={onRetry}>{'Retry'}</button>
    </div>
  ),
}));
/* The dialog's own rendering belongs to its spec; what matters here is that the grid that
   owns it stays mounted, so this stands in for it without a router or a host context. */
jest.mock('../AgentDetailContent', () => {
  const { OGDialogContent, OGDialogTitle, OGDialogClose } = jest.requireActual('@librechat/client');
  return {
    __esModule: true,
    default: ({ agent }: { agent: t.Agent }) => (
      <OGDialogContent aria-describedby={undefined} showCloseButton={false}>
        <OGDialogTitle>{agent.name}</OGDialogTitle>
        <OGDialogClose>{'Close preview'}</OGDialogClose>
      </OGDialogContent>
    ),
  };
});

const page = (agents: t.Agent[], after?: string): t.AgentListResponse => ({
  object: 'list',
  data: agents,
  first_id: agents[0]?.id ?? '',
  last_id: agents.at(-1)?.id ?? '',
  has_more: after != null,
  after,
});
function Harness({ searchQuery = '', mine }: { searchQuery?: string; mine?: 0 | 1 }) {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={scrollElementRef} data-testid="viewport">
      <AgentGrid
        category="all"
        searchQuery={searchQuery}
        mine={mine}
        scrollElementRef={scrollElementRef}
      />
    </div>
  );
}

describe('AgentGrid pagination', () => {
  const marketplace = jest.mocked(dataService.getMarketplaceAgents);
  let client: QueryClient;
  let layout: VirtualLayout;
  beforeEach(() => {
    marketplace.mockReset();
    layout = installVirtualLayout();
    client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
      logger: { log: console.log, warn: console.warn, error: () => {} },
    });
  });
  afterEach(() => {
    client.clear();
    layout.cleanup();
  });
  const renderGrid = () =>
    render(
      <QueryClientProvider client={client}>
        <Harness />
      </QueryClientProvider>,
    );

  it('replaces previous filter results while pending and restores fresh cached results instantly', async () => {
    const pending = Promise.withResolvers<t.AgentListResponse>();
    marketplace.mockResolvedValueOnce(page(makeAgents(1))).mockReturnValueOnce(pending.promise);
    const view = renderGrid();
    await screen.findByRole('button', { name: 'Agent 0' });
    const frame = screen.getByTestId('viewport');
    frame.scrollTop = 1000;
    view.rerender(
      <QueryClientProvider client={client}>
        <Harness mine={1} />
      </QueryClientProvider>,
    );
    expect(await screen.findByRole('status', { name: 'com_agents_loading' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Agent 0' })).not.toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-busy', 'true');
    expect(frame.scrollTop).toBe(0);
    expect(screen.queryByText('com_agents_mine_empty_state_heading')).not.toBeInTheDocument();
    await act(async () => pending.resolve(page([])));
    expect(await screen.findByText('com_agents_mine_empty_state_heading')).toBeInTheDocument();
    await act(async () => {
      view.rerender(
        <QueryClientProvider client={client}>
          <Harness />
        </QueryClientProvider>,
      );
    });
    expect(screen.getByRole('button', { name: 'Agent 0' })).toBeInTheDocument();
    expect(screen.queryByRole('status', { name: 'com_agents_loading' })).not.toBeInTheDocument();
    expect(marketplace).toHaveBeenCalledTimes(2);
  });

  it('fills the visible viewport with skeletons and refits them when it changes', async () => {
    const pending = Promise.withResolvers<t.AgentListResponse>();
    marketplace.mockReturnValueOnce(pending.promise);
    renderGrid();
    const status = await screen.findByRole('status', { name: 'com_agents_loading' });
    const skeletons = status.querySelector('[aria-hidden="true"]') as HTMLElement;
    /** 1400x600 viewport: 4 resolved columns, 2 rows of 300px reach the fold. */
    await waitFor(() => expect(skeletons.children).toHaveLength(8));
    act(() => layout.resize(700, 400));
    await waitFor(() => expect(skeletons.children).toHaveLength(4));
    act(() => layout.resize(360, 700));
    await waitFor(() => expect(skeletons.children).toHaveLength(3));
    /** 980px leaves 80px of a fourth row: too thin to read as a card, so it is dropped. */
    act(() => layout.resize(1400, 980));
    await waitFor(() => expect(skeletons.children).toHaveLength(12));
    await act(async () => pending.resolve(page(makeAgents(1))));
    expect(await screen.findByRole('button', { name: 'Agent 0' })).toBeInTheDocument();
  });

  it('fetches the next cursor page near the viewport end and keeps the DOM bounded', async () => {
    const pending = Promise.withResolvers<t.AgentListResponse>();
    marketplace
      .mockResolvedValueOnce(page(makeAgents(32), 'next-page'))
      .mockReturnValueOnce(pending.promise);
    renderGrid();
    await screen.findByRole('button', { name: 'Agent 0' });
    expect(marketplace).toHaveBeenCalledTimes(1);
    const frame = screen.getByTestId('viewport');
    act(() => {
      frame.scrollTop = frame.scrollHeight - frame.clientHeight;
      fireEvent.scroll(frame);
    });
    await screen.findByRole('status', { name: 'com_agents_loading' });
    expect(screen.getByRole('button', { name: 'Agent 31' })).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-busy', 'false');
    await act(async () => pending.resolve(page(makeAgents(32, 32))));
    await screen.findByRole('button', { name: 'Agent 32' });
    expect(marketplace).toHaveBeenLastCalledWith(expect.objectContaining({ cursor: 'next-page' }));
    expect(screen.getAllByRole('listitem').length).toBeLessThan(50);
  });

  it('continues past an empty cursor page instead of reporting an empty marketplace', async () => {
    marketplace
      .mockResolvedValueOnce(page([], 'after-removed-row'))
      .mockResolvedValueOnce(page(makeAgents(1)));
    renderGrid();
    expect(await screen.findByRole('button', { name: 'Agent 0' })).toBeInTheDocument();
    expect(marketplace).toHaveBeenCalledTimes(2);
  });

  it('deduplicates agents that move across popularity page boundaries', async () => {
    const initial = makeAgents(32);
    marketplace
      .mockResolvedValueOnce(page(initial, 'next-page'))
      .mockResolvedValueOnce(page([initial[31], ...makeAgents(4, 32)]));
    renderGrid();
    await screen.findByRole('button', { name: 'Agent 0' });
    const frame = screen.getByTestId('viewport');
    act(() => {
      frame.scrollTop = frame.scrollHeight - frame.clientHeight;
      fireEvent.scroll(frame);
    });
    await screen.findByRole('button', { name: 'Agent 35' });
    expect(screen.getAllByRole('button', { name: 'Agent 31' })).toHaveLength(1);
    expect(
      screen.getByRole('button', { name: 'Agent 35' }).closest('[role="listitem"]'),
    ).toHaveAttribute('aria-setsize', '36');
  });

  it('clears the held cursor failure after a whole-walk reset succeeds', async () => {
    const mismatch = Object.assign(new Error('Cursor ordering mismatch'), {
      response: {
        status: 409,
        data: { error: 'cursor_ordering_mismatch' },
      },
    });
    marketplace
      .mockResolvedValueOnce(page(makeAgents(32), 'foreign-order'))
      .mockRejectedValueOnce(mismatch)
      .mockResolvedValueOnce(page(makeAgents(1)));
    renderGrid();
    await screen.findByRole('button', { name: 'Agent 0' });

    const frame = screen.getByTestId('viewport');
    act(() => {
      frame.scrollTop = frame.scrollHeight - frame.clientHeight;
      fireEvent.scroll(frame);
    });

    await waitFor(() => {
      expect(marketplace).toHaveBeenCalledTimes(3);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Agent 0' })).toBeEnabled();
    });
  });

  it('shows a fetch error and recovers through the retry action', async () => {
    // A transport failure is retried inside the query (initial attempt plus two
    // retries) before the error card takes over recovery.
    marketplace
      .mockRejectedValueOnce(new Error('Agents unavailable'))
      .mockRejectedValueOnce(new Error('Agents unavailable'))
      .mockRejectedValueOnce(new Error('Agents unavailable'))
      .mockResolvedValueOnce(page(makeAgents(1)));
    renderGrid();
    expect(await screen.findByRole('alert', {}, { timeout: 5000 })).toHaveTextContent(
      'Agents unavailable',
    );
    expect(marketplace).toHaveBeenCalledTimes(3);
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(await screen.findByRole('button', { name: 'Agent 0' })).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
  });
  it('puts recovery before loaded rows in keyboard order', async () => {
    const user = userEvent.setup();
    marketplace
      .mockResolvedValueOnce(page(makeAgents(32), 'next-page'))
      .mockRejectedValueOnce(new Error('Cursor page unavailable'))
      .mockRejectedValueOnce(new Error('Cursor page unavailable'))
      .mockRejectedValueOnce(new Error('Cursor page unavailable'));
    renderGrid();
    await screen.findByRole('button', { name: 'Agent 0' });
    const firstRow = screen.getAllByRole('listitem')[0];
    const frame = screen.getByTestId('viewport');
    act(() => {
      frame.scrollTop = frame.scrollHeight - frame.clientHeight;
      fireEvent.scroll(frame);
    });
    const rowTopBeforeFailure = firstRow.getBoundingClientRect().top;
    await screen.findByRole('alert', {}, { timeout: 5000 });
    expect(firstRow.getBoundingClientRect().top).toBe(rowTopBeforeFailure);

    await user.tab();
    expect(screen.getByRole('button', { name: 'Retry' })).toHaveFocus();
  });

  it('hides previous-scope rows when the replacement request fails', async () => {
    marketplace
      .mockResolvedValueOnce(page(makeAgents(1)))
      .mockRejectedValueOnce(new Error('My agents unavailable'))
      .mockRejectedValueOnce(new Error('My agents unavailable'))
      .mockRejectedValueOnce(new Error('My agents unavailable'));
    const view = renderGrid();
    await screen.findByRole('button', { name: 'Agent 0' });

    view.rerender(
      <QueryClientProvider client={client}>
        <Harness mine={1} />
      </QueryClientProvider>,
    );

    await screen.findByRole('alert', {}, { timeout: 5000 });
    expect(screen.queryByRole('button', { name: 'Agent 0' })).not.toBeInTheDocument();
  });

  it('keeps the error state in place while a retry is in flight', async () => {
    const pending = Promise.withResolvers<t.AgentListResponse>();
    marketplace
      .mockRejectedValueOnce(new Error('Agents unavailable'))
      .mockRejectedValueOnce(new Error('Agents unavailable'))
      .mockRejectedValueOnce(new Error('Agents unavailable'))
      .mockReturnValueOnce(pending.promise);
    renderGrid();
    await screen.findByRole('alert', {}, { timeout: 5000 });
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    /* Waits for the retry to actually be in flight — `aria-busy` is the only thing that
       says so from outside — because that is the state the card has to survive:
       react-query clears `error` for the duration, and neither a skeleton nor a remount
       may take the card's place. A skeleton fills the viewport above it and pushes its
       status, countdown and action below the fold; a remount resets the backoff. */
    await waitFor(() => expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-busy', 'true'));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.queryByRole('status', { name: 'com_agents_loading' })).not.toBeInTheDocument();
    await act(async () => {
      pending.resolve(page(makeAgents(1)));
      await pending.promise;
    });
    expect(await screen.findByRole('button', { name: 'Agent 0' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('retries the cursor page that failed rather than refreshing the pages it already has', async () => {
    // Refreshing the loaded prefix succeeds without ever fetching the missing page, which
    // would clear the held failure and let the grid ask for the same cursor again with a
    // fresh backoff — an unbounded cycle while that page keeps failing.
    const pending = Promise.withResolvers<t.AgentListResponse>();
    marketplace
      .mockResolvedValueOnce(page(makeAgents(32), 'next-page'))
      .mockRejectedValueOnce(new Error('Cursor page unavailable'))
      .mockRejectedValueOnce(new Error('Cursor page unavailable'))
      .mockRejectedValueOnce(new Error('Cursor page unavailable'))
      .mockReturnValueOnce(pending.promise);
    renderGrid();
    await screen.findByRole('button', { name: 'Agent 0' });
    const frame = screen.getByTestId('viewport');
    act(() => {
      frame.scrollTop = frame.scrollHeight - frame.clientHeight;
      fireEvent.scroll(frame);
    });

    expect(await screen.findByRole('alert', {}, { timeout: 5000 })).toHaveTextContent(
      'Cursor page unavailable',
    );
    // The rows the user was reading stay mounted behind the error card. Unmounting the
    // list collapses its scrollable height, which is what let the browser clamp the
    // scroll position and drop someone browsing deep in the marketplace back to row one.
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    expect(marketplace).toHaveBeenLastCalledWith(expect.objectContaining({ cursor: 'next-page' }));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    await act(async () => {
      pending.resolve(page(makeAgents(32, 32)));
      await pending.promise;
    });
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
    // The list was never unmounted, so the virtualizer still renders the window the user
    // was reading rather than the first row; assert the recovered length instead.
    expect(screen.getAllByRole('listitem')[0]).toHaveAttribute('aria-setsize', '64');
  });

  it('clears a failed refresh of the cached pages once a refresh succeeds', async () => {
    // A refresh failure leaves the page count unchanged, so recovery cannot be read from
    // the list getting longer: that rule belongs to a failed cursor page alone.
    marketplace
      .mockResolvedValueOnce(page(makeAgents(4)))
      .mockRejectedValueOnce(new Error('Refresh unavailable'))
      .mockRejectedValueOnce(new Error('Refresh unavailable'))
      .mockRejectedValueOnce(new Error('Refresh unavailable'))
      .mockResolvedValueOnce(page(makeAgents(4)));
    renderGrid();
    await screen.findByRole('button', { name: 'Agent 0' });

    await act(async () => {
      await client.refetchQueries({ queryKey: [QueryKeys.marketplaceAgents] });
    });
    expect(await screen.findByRole('alert', {}, { timeout: 5000 })).toHaveTextContent(
      'Refresh unavailable',
    );

    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    expect(await screen.findByRole('button', { name: 'Agent 0' })).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
  });

  it('keeps an open dialog while the results it was opened from are being refreshed', async () => {
    // The refresh runs with no data of its own, so the grid renders its skeleton - which
    // used to replace the grid, and with it the dialog the reader had open and the element
    // focus has to return to.
    const pending = Promise.withResolvers<t.AgentListResponse>();
    marketplace.mockResolvedValueOnce(page(makeAgents(2))).mockReturnValueOnce(pending.promise);
    renderGrid();
    await userEvent.setup().click(await screen.findByRole('button', { name: 'Agent 0' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await act(async () => {
      void client.resetQueries({ queryKey: [QueryKeys.marketplaceAgents] });
    });
    /* Radix marks everything behind an open modal `aria-hidden`, so the grid behind it is
       only reachable with `hidden`. */
    expect(
      await screen.findByRole('status', { name: 'com_agents_loading', hidden: true }),
    ).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await act(async () => pending.resolve(page(makeAgents(2))));
    expect(
      await screen.findByRole('button', { name: 'Agent 0', hidden: true }),
    ).toBeInTheDocument();
  });
  it('leaves focus on document body on the initial marketplace mount', async () => {
    const pending = Promise.withResolvers<t.AgentListResponse>();
    marketplace.mockReturnValueOnce(pending.promise);

    document.body.focus();

    renderGrid();

    expect(document.activeElement).toBe(document.body);
    await act(async () => pending.resolve(page(makeAgents(1))));
  });

  it('returns focus to the results panel when recovery removes the focused retry', async () => {
    // The reader activated Retry from the keyboard, so the control they were on is inside
    // the card the success removes. The browser drops focus on the document in that
    // commit, which would start their next Tab at the top of the page rather than at the
    // results that just arrived.
    marketplace
      .mockRejectedValueOnce(new Error('Agents unavailable'))
      .mockRejectedValueOnce(new Error('Agents unavailable'))
      .mockRejectedValueOnce(new Error('Agents unavailable'))
      .mockResolvedValueOnce(page(makeAgents(1)));

    renderGrid();
    expect(await screen.findByRole('alert', {}, { timeout: 5000 })).toHaveTextContent(
      'Agents unavailable',
    );

    const retry = screen.getByRole('button', { name: 'Retry' });
    retry.focus();
    expect(retry).toHaveFocus();
    fireEvent.click(retry);

    expect(await screen.findByRole('button', { name: 'Agent 0' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toHaveFocus();
  });

  it('leaves the retry focused when the attempt fails again', async () => {
    // Recovery moves focus because a removal took it, not because a request went out: the
    // card is still there and the reader is still on its button, so taking focus away
    // would cost them the control they are using.
    marketplace.mockRejectedValue(new Error('Agents unavailable'));

    renderGrid();
    expect(await screen.findByRole('alert', {}, { timeout: 5000 })).toHaveTextContent(
      'Agents unavailable',
    );

    const retry = screen.getByRole('button', { name: 'Retry' });
    retry.focus();
    await act(async () => {
      fireEvent.click(retry);
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toHaveFocus();
  });
  it('takes focus back when a scope change remounts the rows under an open dialog', async () => {
    // A debounced search or a restored history entry commits while a card is open. The new
    // scope's grid is a different list, so the dialog goes with the rows it belonged to -
    // but the focus it held must not be left on the document, which starts the next Tab at
    // the top of the page instead of at the marketplace.
    const pending = Promise.withResolvers<t.AgentListResponse>();
    marketplace.mockResolvedValueOnce(page(makeAgents(2))).mockReturnValueOnce(pending.promise);
    const view = renderGrid();
    await userEvent.setup().click(await screen.findByRole('button', { name: 'Agent 0' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    view.rerender(
      <QueryClientProvider client={client}>
        <Harness mine={1} />
      </QueryClientProvider>,
    );

    expect(await screen.findByRole('status', { name: 'com_agents_loading' })).toBeInTheDocument();
    expect(document.activeElement).not.toBe(document.body);
    expect(screen.getByRole('tabpanel')).toContainElement(document.activeElement as HTMLElement);
    await act(async () => pending.resolve(page(makeAgents(1, 8))));
    expect(await screen.findByRole('button', { name: 'Agent 8' })).toBeInTheDocument();
>>>>>>> upstream/main
  });
});
