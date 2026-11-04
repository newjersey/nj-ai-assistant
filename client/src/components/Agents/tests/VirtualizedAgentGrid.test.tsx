<<<<<<< HEAD
import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type t from 'librechat-data-provider';
import VirtualizedAgentGrid from '../VirtualizedAgentGrid';

type RowRendererProps = {
  index: number;
  key: string;
  style: React.CSSProperties;
  parent: { props: { width: number } };
};

type VirtualListMockProps = {
  rowRenderer: (props: RowRendererProps) => React.ReactNode;
  rowCount: number;
  width?: number;
  style?: React.CSSProperties;
  'aria-rowcount'?: number;
  'data-testid'?: string;
  'data-total-rows'?: number;
};

type WindowScrollerChildProps = {
  height: number;
  isScrolling: boolean;
  registerChild: (ref: HTMLElement | null) => void;
  onChildScroll: () => void;
  scrollTop: number;
};

type MarketplaceAgentsMock = {
  useMarketplaceAgentsInfiniteQuery: jest.Mock;
};

type LocalizeParams = {
  count?: number;
  category?: string;
};

// Mock react-virtualized
jest.mock('react-virtualized', () => {
  const ReactActual = jest.requireActual<typeof import('react')>('react');

  return {
    AutoSizer: ({
      children,
      disableHeight,
    }: {
      children: (props: { width: number; height?: number }) => React.ReactNode;
      disableHeight?: boolean;
    }) => {
      if (disableHeight) {
        return children({ width: 800 });
      }
      return children({ width: 800, height: 600 });
    },
    List: ReactActual.forwardRef(
      (
        {
          rowRenderer,
          rowCount,
          width,
          style,
          'aria-rowcount': ariaRowCount,
          'data-testid': dataTestId,
          'data-total-rows': dataTotalRows,
        }: VirtualListMockProps,
        ref: React.ForwardedRef<{ forceUpdateGrid: () => void }>,
      ) => {
        ReactActual.useImperativeHandle(ref, () => ({
          forceUpdateGrid: () => {},
        }));

        return (
          <div
            data-testid={dataTestId || 'virtual-list'}
            aria-rowcount={ariaRowCount}
            data-total-rows={dataTotalRows}
            style={style}
          >
            {Array.from({ length: Math.min(rowCount, 5) }, (_, index) =>
              rowRenderer({
                index,
                key: `row-${index}`,
                style: {},
                parent: { props: { width: width || 800 } },
              }),
            )}
          </div>
        );
      },
    ),
    WindowScroller: ({
      children,
    }: {
      children: (props: WindowScrollerChildProps) => React.ReactNode;
      scrollElement?: HTMLElement | null;
    }) => {
      return children({
        height: 600,
        isScrolling: false,
        registerChild: (_ref: HTMLElement | null) => {},
        onChildScroll: () => {},
        scrollTop: 0,
      });
    },
  };
});

// Mock the data provider
const createMockInfiniteQuery = (overrides = {}) => ({
  data: {
    pages: [
      {
        data: [
          {
            id: '1',
            name: 'Test Agent 1',
            description: 'A test agent for virtual scrolling',
            category: 'productivity',
          },
          {
            id: '2',
            name: 'Test Agent 2',
            description: 'Another test agent',
            category: 'development',
          },
        ],
      },
    ],
  },
  isLoading: false,
  error: null,
  isFetching: false,
  fetchNextPage: jest.fn(),
  hasNextPage: true,
  refetch: jest.fn(),
  isFetchingNextPage: false,
  ...overrides,
});

jest.mock('~/data-provider/Agents', () => ({
  useMarketplaceAgentsInfiniteQuery: jest.fn(),
}));

// Mock other hooks
jest.mock('~/hooks', () => ({
  useAgentCategories: () => ({
    categories: [
      { value: 'productivity', label: 'Productivity' },
      { value: 'development', label: 'Development' },
    ],
  }),
  useLocalize: () => (key: string, params?: LocalizeParams) => {
    if (key === 'com_agents_grid_announcement') {
      return `Found ${params?.count || 0} agents in ${params?.category || 'category'}`;
    }
    return key;
  },
}));

jest.mock('../AgentCard', () => {
  return function MockAgentCard({
    agent,
    onSelect,
  }: {
    agent: t.Agent;
    onSelect: (agent: t.Agent) => void;
  }) {
    return (
      <div data-testid={`agent-card-${agent.id}`} onClick={() => onSelect(agent)}>
        <h3>{agent.name}</h3>
        <p>{agent.description}</p>
      </div>
    );
  };
});

describe('VirtualizedAgentGrid', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    const useMarketplaceAgentsInfiniteQuery = (
      jest.requireMock('~/data-provider/Agents') as MarketplaceAgentsMock
    ).useMarketplaceAgentsInfiniteQuery;
    useMarketplaceAgentsInfiniteQuery.mockImplementation(() => createMockInfiniteQuery());
  });

  const renderComponent = (
    props: Partial<React.ComponentProps<typeof VirtualizedAgentGrid>> = {},
  ) => {
    const defaultProps = {
      category: 'all',
      searchQuery: '',
      onSelectAgent: jest.fn(),
    };

    return render(
      <QueryClientProvider client={queryClient}>
        <VirtualizedAgentGrid {...defaultProps} {...props} />
      </QueryClientProvider>,
    );
  };

  it('renders virtual list container', () => {
    renderComponent();

    expect(screen.getByTestId('virtual-list')).toBeInTheDocument();
  });

  it('displays agent cards in virtual rows', () => {
    renderComponent();

    expect(screen.getByTestId('agent-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('agent-card-2')).toBeInTheDocument();

    expect(screen.getByText('Test Agent 1')).toBeInTheDocument();
    expect(screen.getByText('Test Agent 2')).toBeInTheDocument();
  });

  it('calls onSelectAgent when agent card is clicked', () => {
    const onSelectAgent = jest.fn();
    renderComponent({ onSelectAgent });

    expect(screen.getByTestId('agent-card-1')).toBeInTheDocument();

    screen.getByTestId('agent-card-1').click();

    expect(onSelectAgent).toHaveBeenCalledWith({
      id: '1',
      name: 'Test Agent 1',
      description: 'A test agent for virtual scrolling',
      category: 'productivity',
    });
  });

  it('shows loading spinner when loading', () => {
    const mockQuery = jest.fn(() => ({
      ...createMockInfiniteQuery(),
      isLoading: true,
      data: undefined,
    }));

    const useMarketplaceAgentsInfiniteQuery = (
      jest.requireMock('~/data-provider/Agents') as MarketplaceAgentsMock
    ).useMarketplaceAgentsInfiniteQuery;
    useMarketplaceAgentsInfiniteQuery.mockImplementation(mockQuery);

    renderComponent();

    // Should show loading spinner
    const spinner = document.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('h-8 w-8 text-text-primary');
  });

  it('retains cached agents while refetching', () => {
    const useMarketplaceAgentsInfiniteQuery = (
      jest.requireMock('~/data-provider/Agents') as MarketplaceAgentsMock
    ).useMarketplaceAgentsInfiniteQuery;
    useMarketplaceAgentsInfiniteQuery.mockImplementation(() =>
      createMockInfiniteQuery({ isFetching: true }),
    );

    renderComponent();

    expect(screen.getByTestId('virtual-list')).toBeInTheDocument();
    expect(screen.getByTestId('agent-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('agent-card-2')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderComponent({ category: 'productivity' });

    expect(screen.getByTestId('virtual-list')).toBeInTheDocument();

    const gridContainer = screen.getByRole('grid');
    expect(gridContainer).toHaveAttribute('aria-label');
    expect(gridContainer.getAttribute('aria-label')).toContain('2');
    expect(gridContainer.getAttribute('aria-label')).toContain('Productivity');

    const tabpanel = screen.getByRole('tabpanel');
    expect(tabpanel).toHaveAttribute('id', 'category-panel-productivity');
    expect(tabpanel).toHaveAttribute('aria-labelledby', 'category-tab-productivity');
=======
import React, { useRef } from 'react';
import userEvent from '@testing-library/user-event';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import type t from 'librechat-data-provider';
import type { VirtualLayout } from './layout';
import { installVirtualLayout, makeAgents } from './layout';
import VirtualizedAgentGrid from '../VirtualizedAgentGrid';

let mockQueriedAgent: t.Agent | undefined;

jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string) => key,
  useAgentCategories: () => ({ categories: [] }),
}));
jest.mock('~/utils', () => ({
  ...jest.requireActual('~/utils/agents'),
  cn: (...classes: Array<string | false | undefined | null>) => classes.filter(Boolean).join(' '),
}));
jest.mock('~/data-provider/Agents', () => ({
  useGetAgentByIdQuery: jest.fn(() => ({
    data: mockQueriedAgent,
    error: null,
    isFetching: false,
    refetch: jest.fn(),
  })),
}));
jest.mock('../AgentDetailContent', () => {
  const { OGDialogContent, OGDialogTitle, OGDialogClose } = jest.requireActual('@librechat/client');
  const close = 'Close preview';
  return {
    __esModule: true,
    default: ({ agent }: { agent: t.Agent }) => (
      <OGDialogContent aria-describedby={undefined} showCloseButton={false}>
        <OGDialogTitle>{agent.name}</OGDialogTitle>
        <p>{agent.description}</p>
        <p>{agent.category}</p>
        {agent.conversation_starters?.map((starter) => (
          <p key={starter}>{starter}</p>
        ))}
        <OGDialogClose>{close}</OGDialogClose>
      </OGDialogContent>
    ),
  };
});

function Harness({ agents, placeholder }: { agents: t.Agent[]; placeholder?: React.ReactNode }) {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={scrollElementRef} data-testid="viewport">
      <VirtualizedAgentGrid
        agents={agents}
        scrollElementRef={scrollElementRef}
        label="Agents"
        hasNextPage={false}
        isFetching={false}
        onLoadMore={jest.fn()}
        placeholder={placeholder}
      />
    </div>
  );
}

let layout: VirtualLayout;

describe('VirtualizedAgentGrid', () => {
  beforeEach(() => {
    mockQueriedAgent = undefined;
    layout = installVirtualLayout();
  });
  afterEach(() => {
    layout.cleanup();
  });

  it('keeps mounted cards bounded while reaching the last of 1,000 agents', async () => {
    render(<Harness agents={makeAgents(1000)} />);
    await screen.findByRole('button', { name: 'Agent 0' });
    expect(screen.getAllByRole('listitem').length).toBeLessThan(50);
    const frame = screen.getByTestId('viewport');
    act(() => {
      frame.scrollTop = frame.scrollHeight - frame.clientHeight;
      fireEvent.scroll(frame);
    });
    await screen.findByRole('button', { name: 'Agent 999' });
    expect(screen.getAllByRole('listitem').length).toBeLessThan(50);
    const last = screen.getByRole('button', { name: 'Agent 999' }).closest('[role="listitem"]');
    expect(last).toHaveAttribute('aria-posinset', '1000');
    expect(last).toHaveAttribute('aria-setsize', '1000');
  });

  it('appends pages during active scrolling without flushing inside React rendering', async () => {
    const errors = jest.spyOn(console, 'error');
    try {
      const agents = makeAgents(1000);
      const view = render(<Harness agents={agents.slice(0, 64)} />);
      await screen.findByRole('button', { name: 'Agent 0' });
      const frame = screen.getByTestId('viewport');
      act(() => {
        frame.scrollTop = 3200;
        fireEvent.scroll(frame);
      });
      await act(async () => {
        view.rerender(<Harness agents={agents} />);
      });
      expect(screen.getAllByRole('listitem').length).toBeLessThan(50);
      expect(screen.getAllByRole('listitem')[0]).toHaveAttribute('aria-setsize', '1000');
      act(() => {
        frame.scrollTop = frame.scrollHeight - frame.clientHeight;
        fireEvent.scroll(frame);
      });
      expect(await screen.findByRole('button', { name: 'Agent 999' })).toBeInTheDocument();
      expect(errors.mock.calls.filter((args) => String(args[0]).includes('flushSync'))).toEqual([]);
    } finally {
      errors.mockRestore();
    }
  });

  it('keeps an open dialog and restores its opener after scrolling and column changes', async () => {
    const user = userEvent.setup();
    render(<Harness agents={makeAgents(1000)} />);
    await user.click(await screen.findByRole('button', { name: 'Agent 0' }));
    expect(await screen.findByRole('dialog', { name: 'Agent 0' })).toBeInTheDocument();
    const frame = screen.getByTestId('viewport');
    act(() => {
      frame.scrollTop = 32000;
      fireEvent.scroll(frame);
      layout.resize(660);
    });
    expect(screen.getByRole('dialog', { name: 'Agent 0' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close preview' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(screen.getByRole('button', { name: 'Agent 0' })).toHaveFocus());
    expect(screen.getAllByRole('listitem').length).toBeLessThan(50);
  });

  it('keeps an open dialog and a focus target when a refresh empties the grid', async () => {
    // Access can be revoked, the agent deleted, or a reorder can push it out of the
    // cached pages while its dialog is open. Tearing the dialog down mid-flight would
    // leave focus on a card being detached in the same commit.
    const user = userEvent.setup();
    const placeholder = <p>{'No agents found'}</p>;
    const view = render(<Harness agents={makeAgents(3)} />);
    await user.click(await screen.findByRole('button', { name: 'Agent 0' }));
    expect(await screen.findByRole('dialog', { name: 'Agent 0' })).toBeInTheDocument();

    view.rerender(<Harness agents={[]} placeholder={placeholder} />);

    expect(screen.getByRole('dialog', { name: 'Agent 0' })).toBeInTheDocument();
    expect(screen.getByText('No agents found')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close preview' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(document.body.contains(document.activeElement)).toBe(true));
    expect(document.activeElement).not.toBe(document.body);
  });

  it('renders the revalidated agent when a refresh moves it out of the loaded window', async () => {
    const agents = makeAgents(3);
    const view = render(<Harness agents={agents} />);
    await userEvent.setup().click(await screen.findByRole('button', { name: 'Agent 0' }));
    expect(await screen.findByRole('dialog', { name: 'Agent 0' })).toBeInTheDocument();

    /* The per-agent VIEW response carries no `category`, so a dialog that took that
       response for the whole agent dropped the badge off an agent that still has one. */
    const { category: _omitted, ...withoutCategory } = agents[0];
    mockQueriedAgent = {
      ...withoutCategory,
      description: 'Fresh description from the agent endpoint.',
      conversation_starters: ['Fresh starter'],
    };
    view.rerender(<Harness agents={agents.slice(1)} placeholder={<p>{'No agents found'}</p>} />);

    const dialog = screen.getByRole('dialog');
    expect(
      await screen.findByText('Fresh description from the agent endpoint.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Fresh starter')).toBeInTheDocument();
    expect(within(dialog).queryByText(agents[0].description ?? '')).not.toBeInTheDocument();
    expect(within(dialog).getByText('general')).toBeInTheDocument();
  });
  it('renders revalidated fields over the loaded row while its dialog stays open', async () => {
    const agents = makeAgents(3);
    const view = render(<Harness agents={agents} />);
    await userEvent.setup().click(await screen.findByRole('button', { name: 'Agent 0' }));
    expect(await screen.findByRole('dialog', { name: 'Agent 0' })).toBeInTheDocument();

    const { category: _omitted, ...withoutCategory } = agents[0];
    mockQueriedAgent = {
      ...withoutCategory,
      description: 'Fresh description from the agent endpoint.',
      conversation_starters: ['Fresh starter'],
    };
    view.rerender(<Harness agents={agents} />);

    const dialog = screen.getByRole('dialog');
    expect(
      await screen.findByText('Fresh description from the agent endpoint.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Fresh starter')).toBeInTheDocument();
    expect(within(dialog).queryByText(agents[0].description ?? '')).not.toBeInTheDocument();
    expect(within(dialog).getByText('general')).toBeInTheDocument();
  });

  it('tabs to the next logical agent even when its row is not currently mounted', async () => {
    const user = userEvent.setup();
    render(<Harness agents={makeAgents(1000)} />);
    await screen.findByRole('button', { name: 'Agent 0' });
    await user.tab();
    expect(screen.getByRole('button', { name: 'Agent 0' })).toHaveFocus();
    const frame = screen.getByTestId('viewport');
    act(() => {
      frame.scrollTop = 32000;
      fireEvent.scroll(frame);
    });
    for (let i = 0; i < 4; i++) await user.tab();
    await waitFor(() => expect(screen.getByRole('button', { name: 'Agent 4' })).toHaveFocus());
    await waitFor(() => expect(frame.scrollTop).toBeLessThan(32000));
  });
  it('restores focus to the same agent after a reorder remounts its row', async () => {
    const agents = makeAgents(3);
    const view = render(<Harness agents={agents} />);
    const target = await screen.findByRole('button', { name: 'Agent 0' });

    act(() => target.focus());
    expect(target).toHaveFocus();

    view.rerender(<Harness agents={[agents[1], agents[0], agents[2]]} />);

    await waitFor(() => expect(screen.getByRole('button', { name: 'Agent 0' })).toHaveFocus());
>>>>>>> upstream/main
  });
});
