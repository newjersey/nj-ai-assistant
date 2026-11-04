import React from 'react';
import { RecoilRoot } from 'recoil';
<<<<<<< HEAD
=======
import { getDefaultStore } from 'jotai';
>>>>>>> upstream/main
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { MessagesSquare, NotebookPen } from 'lucide-react';
import { render, fireEvent, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
<<<<<<< HEAD
import type { MutableSnapshot } from 'recoil';
import type { NavLink } from '~/common';
import { ActivePanelProvider, DEFAULT_PANEL } from '~/Providers';
=======
import type { NavLink } from '~/common';
import { ActivePanelProvider, DEFAULT_PANEL, activePanelAtom } from '~/Providers';
>>>>>>> upstream/main

const mockNewConversation = jest.fn();
const mockClearMessagesCache = jest.fn();

jest.mock('~/store', () => {
  const { atom } = jest.requireActual('recoil');
  let counter = 0;
<<<<<<< HEAD
  const switchAtom = atom({
    key: 'mock-newChatSwitchToHistory',
    default: true,
  });
=======
>>>>>>> upstream/main
  const customShortcutsAtom = atom({
    key: 'mock-customShortcuts',
    default: {},
  });
  const shortcutsEnabledAtom = atom({
    key: 'mock-shortcutsEnabled',
    default: true,
  });
  return {
    __esModule: true,
    default: {
      conversationByIndex: () =>
        atom({ key: `mock-conversationByIndex-${counter++}`, default: null }),
      conversationIdByIndex: () =>
        atom({ key: `mock-conversationIdByIndex-${counter++}`, default: null }),
<<<<<<< HEAD
      newChatSwitchToHistory: switchAtom,
=======
>>>>>>> upstream/main
      customShortcuts: customShortcutsAtom,
      shortcutsEnabled: shortcutsEnabledAtom,
    },
  };
});

jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string) => key,
  useNewConvo: () => ({ newConversation: mockNewConversation }),
  useShowMarketplace: () => false,
}));

/**
 * Stands in for the real hook, which reaches `useNewConvo` by deep path and so
 * escapes the `~/hooks` mock above. Mirrors its contract closely enough that
 * the panel-switch assertions still exercise the `onNewChat` wiring.
 */
<<<<<<< HEAD
jest.mock('~/hooks/Chat/useNewChat', () => ({
=======
jest.mock('~/hooks/Conversations/useNewChat', () => ({
>>>>>>> upstream/main
  __esModule: true,
  default: ({ onNewChat }: { onNewChat?: () => void } = {}) => ({
    newConversation: mockNewConversation,
    startNewChat: () => {
      mockNewConversation();
      onNewChat?.();
    },
    handleNewChatClick: (event: React.MouseEvent<HTMLElement>) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }
      event.preventDefault();
      mockClearMessagesCache();
      mockNewConversation();
      onNewChat?.();
    },
  }),
}));

jest.mock('~/utils', () => ({
  clearMessagesCache: (...args: unknown[]) => mockClearMessagesCache(...args),
  cn: (...classes: unknown[]) => classes.filter(Boolean).join(' '),
}));

jest.mock('~/components/Chat/Menus/OpenSidebar', () => ({
  CLOSE_SIDEBAR_ID: 'close-sidebar',
}));

jest.mock('~/components/Nav/AccountSettings', () => ({
  __esModule: true,
  default: () => <div data-testid="account-settings" />,
}));

import ExpandedPanel from '../ExpandedPanel';
<<<<<<< HEAD
import store from '~/store';
=======
>>>>>>> upstream/main

const createLinks = (): NavLink[] => [
  {
    title: 'com_ui_chat_history' as const,
    icon: MessagesSquare,
    id: DEFAULT_PANEL,
  },
  {
    title: 'com_ui_prompts' as const,
    icon: NotebookPen,
    id: 'prompts',
  },
];

const createQueryClient = () => new QueryClient({ defaultOptions: { queries: { retry: false } } });

function renderPanel({
  expanded = true,
  links = createLinks(),
  onCollapse = jest.fn(),
  onExpand = jest.fn(),
  onNavigate,
  initialPanel = DEFAULT_PANEL,
<<<<<<< HEAD
  initializeState,
=======
  switchToHistory = true,
>>>>>>> upstream/main
}: {
  expanded?: boolean;
  links?: NavLink[];
  onCollapse?: jest.Mock;
  onExpand?: jest.Mock;
  onNavigate?: jest.Mock;
  initialPanel?: string;
<<<<<<< HEAD
  initializeState?: (snapshot: MutableSnapshot) => void;
} = {}) {
  if (initialPanel !== DEFAULT_PANEL) {
    localStorage.setItem('side:active-panel', initialPanel);
  }
=======
  switchToHistory?: boolean;
} = {}) {
  getDefaultStore().set(activePanelAtom, initialPanel);
>>>>>>> upstream/main

  const result = render(
    <MemoryRouter>
      <QueryClientProvider client={createQueryClient()}>
<<<<<<< HEAD
        <RecoilRoot initializeState={initializeState}>
=======
        <RecoilRoot>
>>>>>>> upstream/main
          <ActivePanelProvider>
            <ExpandedPanel
              links={links}
              expanded={expanded}
              onCollapse={onCollapse}
              onExpand={onExpand}
              onNavigate={onNavigate}
<<<<<<< HEAD
=======
              switchToHistory={switchToHistory}
>>>>>>> upstream/main
            />
          </ActivePanelProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </MemoryRouter>,
  );

  return { ...result, onCollapse, onExpand };
}

describe('ExpandedPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('NavIconButton collapse toggle', () => {
    it('collapses sidebar when clicking the active icon while expanded', () => {
      const { onCollapse } = renderPanel({ expanded: true });
      const activeButton = screen.getByRole('button', { name: 'com_ui_chat_history' });
      fireEvent.click(activeButton);
      expect(onCollapse).toHaveBeenCalledTimes(1);
    });

    it('switches panel when clicking an inactive icon while expanded', () => {
      const { onCollapse } = renderPanel({ expanded: true });
      const inactiveButton = screen.getByRole('button', { name: 'com_ui_prompts' });
      fireEvent.click(inactiveButton);
      expect(onCollapse).not.toHaveBeenCalled();
<<<<<<< HEAD
      expect(localStorage.getItem('side:active-panel')).toBe('prompts');
=======
      expect(getDefaultStore().get(activePanelAtom)).toBe('prompts');
>>>>>>> upstream/main
    });

    it('expands sidebar when clicking any icon while collapsed', () => {
      const { onExpand } = renderPanel({ expanded: false });
      const activeButton = screen.getByRole('button', { name: 'com_ui_chat_history' });
      fireEvent.click(activeButton);
      expect(onExpand).toHaveBeenCalledTimes(1);
    });

    it('sets active panel and expands when clicking an inactive icon while collapsed', () => {
      const { onExpand } = renderPanel({ expanded: false });
      const inactiveButton = screen.getByRole('button', { name: 'com_ui_prompts' });
      fireEvent.click(inactiveButton);
      expect(onExpand).toHaveBeenCalledTimes(1);
<<<<<<< HEAD
      expect(localStorage.getItem('side:active-panel')).toBe('prompts');
=======
      expect(getDefaultStore().get(activePanelAtom)).toBe('prompts');
>>>>>>> upstream/main
    });

    it('notifies mobile navigation after a route link is selected', () => {
      const onClick = jest.fn();
      const onNavigate = jest.fn();
      const links = [
        ...createLinks(),
        {
          title: 'com_insights_navigation' as const,
          icon: NotebookPen,
          id: 'insights',
          onClick,
        },
      ];

      renderPanel({ links, onNavigate });
      fireEvent.click(screen.getByRole('button', { name: 'com_insights_navigation' }));

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onNavigate).toHaveBeenCalledTimes(1);
    });
<<<<<<< HEAD
=======

    it('marks only the current panel pressed and paints it with the navigation roles', () => {
      renderPanel({ expanded: true });
      const active = screen.getByRole('button', { name: 'com_ui_chat_history' });
      const idle = screen.getByRole('button', { name: 'com_ui_prompts' });

      expect(active).toHaveAttribute('aria-pressed', 'true');
      expect(idle).toHaveAttribute('aria-pressed', 'false');
      for (const button of [active, idle]) {
        expect(button).toHaveClass(
          'hover:bg-surface-nav-hover',
          'aria-pressed:bg-surface-nav-selected',
        );
        expect(button).not.toHaveClass('bg-surface-active-alt');
      }

      fireEvent.click(idle);
      expect(idle).toHaveAttribute('aria-pressed', 'true');
      expect(active).toHaveAttribute('aria-pressed', 'false');
    });

    it('hovers the sidebar toggle and new chat link in the navigation role', () => {
      renderPanel({ expanded: true });

      expect(screen.getByTestId('close-sidebar-button')).toHaveClass('hover:bg-surface-nav-hover');
      expect(screen.getByTestId('new-chat-button')).toHaveClass('hover:bg-surface-nav-hover');
      expect(screen.getByTestId('new-chat-button')).not.toHaveClass('hover:bg-surface-hover');
    });
>>>>>>> upstream/main
  });

  describe('NewChatButton panel switch', () => {
    it('switches to chat history panel on new chat click when setting is enabled', () => {
      renderPanel({ expanded: true, initialPanel: 'prompts' });

      const newChatLink = screen.getByTestId('new-chat-button');
      fireEvent.click(newChatLink);

      expect(mockNewConversation).toHaveBeenCalledTimes(1);
<<<<<<< HEAD
      expect(localStorage.getItem('side:active-panel')).toBe(DEFAULT_PANEL);
=======
      expect(getDefaultStore().get(activePanelAtom)).toBe(DEFAULT_PANEL);
>>>>>>> upstream/main
    });

    it('does not switch panel on new chat click when setting is disabled', () => {
      renderPanel({
        expanded: true,
        initialPanel: 'prompts',
<<<<<<< HEAD
        initializeState: ({ set }: MutableSnapshot) => {
          set(store.newChatSwitchToHistory, false);
        },
=======
        switchToHistory: false,
>>>>>>> upstream/main
      });

      const newChatLink = screen.getByTestId('new-chat-button');
      fireEvent.click(newChatLink);

      expect(mockNewConversation).toHaveBeenCalledTimes(1);
<<<<<<< HEAD
      expect(localStorage.getItem('side:active-panel')).toBe('prompts');
=======
      expect(getDefaultStore().get(activePanelAtom)).toBe('prompts');
>>>>>>> upstream/main
    });
  });
});
