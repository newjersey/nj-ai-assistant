import React from 'react';
import { RecoilRoot } from 'recoil';
<<<<<<< HEAD
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, cleanup, render, screen, fireEvent } from '@testing-library/react';
import type { NavLink } from '~/common';

jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string) => key,
}));

jest.mock('~/hooks/useKeyboardShortcuts', () => ({
  useShortcutAriaKey: () => 'Meta+Shift+O',
}));

jest.mock('@librechat/client', () => ({
  Button: ({
    children,
    asChild: _asChild,
    ...props
  }: {
    children: React.ReactNode;
    asChild?: boolean;
  }) => <div {...props}>{children}</div>,
  /** The real `useNewChat` pulls the file-deletion mutation, which reads the toast context. */
  useToastContext: () => ({ showToast: jest.fn() }),
}));

jest.mock('~/Providers', () => ({
  useActivePanel: () => ({ active: 'conversations', setActive: jest.fn() }),
  resolveActivePanel: () => 'conversations',
=======
import { render, screen, cleanup } from '@testing-library/react';
import type { NavLink } from '~/common';

const activePanel = { active: 'conversations' };

jest.mock('~/Providers', () => ({
  useActivePanel: () => ({ active: activePanel.active, setActive: jest.fn() }),
  resolveActivePanel: (active: string) => active,
>>>>>>> upstream/main
  DEFAULT_PANEL: 'conversations',
}));

jest.mock('~/components/Nav/SearchBar', () => ({
  __esModule: true,
  default: () => <div data-testid="search-bar" />,
}));

<<<<<<< HEAD
/** The heavy reset itself is the unit under order-test; only the navigation
 *  internals below useNewChat are stubbed. */
const mockNewConversation = jest.fn();
jest.mock('~/hooks/useNewConvo', () => ({
  __esModule: true,
  default: () => ({ newConversation: mockNewConversation }),
}));

import BottomBar from '../BottomBar';

const links = [] as NavLink[];
let queryClient: QueryClient;

describe('mobile bottom bar — new chat ordering', () => {
  beforeEach(() => {
    queryClient = new QueryClient();
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    queryClient.clear();
  });

  /**
   * The drawer close must start BEFORE the conversation reset: run
   * synchronously, the reset's cache clearing and navigation flush in the
   * tap's task and stall the slide's first frame. The reset rides the
   * close's `afterSlide` callback instead.
   */
  it('closes the drawer first and defers the conversation reset to afterSlide', () => {
    const order: string[] = [];
    let afterSlide: (() => void) | undefined;
    const onNewChat = jest.fn((callback?: () => void) => {
      order.push('close');
      afterSlide = callback;
    });
    mockNewConversation.mockImplementation(() => {
      order.push('reset');
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BottomBar links={links} onNewChat={onNewChat} />
        </RecoilRoot>
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByTestId('nav-new-chat-fab'));

    expect(order).toEqual(['close']);
    expect(afterSlide).toBeDefined();

    act(() => afterSlide?.());
    expect(order).toEqual(['close', 'reset']);
  });

  it('leaves modified clicks to the browser (new tab)', () => {
    const onNewChat = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BottomBar links={links} onNewChat={onNewChat} />
        </RecoilRoot>
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByTestId('nav-new-chat-fab'), { ctrlKey: true });

    expect(onNewChat).not.toHaveBeenCalled();
    expect(mockNewConversation).not.toHaveBeenCalled();
=======
import BottomBar from '../BottomBar';
import store from '~/store';

const links = [] as NavLink[];

const renderBar = (searchEnabled = true) =>
  render(
    <RecoilRoot
      initializeState={({ set }) =>
        set(store.search, (prev) => ({ ...prev, enabled: searchEnabled }))
      }
    >
      <BottomBar links={links} />
    </RecoilRoot>,
  );

describe('mobile bottom bar', () => {
  afterEach(() => {
    activePanel.active = 'conversations';
    cleanup();
  });

  /** New chat moved to the header strip: repeated under every panel it was a
   *  second, larger copy of a destination the panel has nothing to do with. */
  it('carries search and nothing else', () => {
    renderBar();

    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.queryByTestId('nav-new-chat-fab')).not.toBeInTheDocument();
  });

  /** Searching messages only means anything from the conversation list. What
   *  remains is an empty spacer for the bottom safe-area inset, so the panel
   *  above still stops short of the home indicator. */
  it('stands down to the safe-area spacer on a panel that has nothing to search', () => {
    activePanel.active = 'prompts';
    const { container } = renderBar();

    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();
    expect(container.firstElementChild).toBeEmptyDOMElement();
  });

  it('stands down to the safe-area spacer where the deployment has search off', () => {
    const { container } = renderBar(false);

    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();
    expect(container.firstElementChild).toBeEmptyDOMElement();
>>>>>>> upstream/main
  });
});
