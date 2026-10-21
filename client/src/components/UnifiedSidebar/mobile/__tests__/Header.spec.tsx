import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import type { NavLink } from '~/common';

<<<<<<< HEAD
let mockShowMarketplace = true;

jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string) => key,
  useShowMarketplace: () => mockShowMarketplace,
=======
jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string) => key,
>>>>>>> upstream/main
}));

jest.mock('~/hooks/useKeyboardShortcuts', () => ({
  useShortcutAriaKey: () => 'Meta+Shift+S',
}));

jest.mock('@librechat/client', () => ({
  Button: jest
    .requireActual<typeof import('react')>('react')
    .forwardRef<
      HTMLButtonElement,
      React.ComponentProps<'button'>
    >(({ children, ...props }, ref) => (
      <button ref={ref} {...props}>
        {children}
      </button>
    )),
  Sidebar: (props: React.ComponentProps<'svg'>) => <svg data-testid="sidebar-icon" {...props} />,
  Skeleton: () => <div data-testid="skeleton" />,
  TooltipAnchor: ({ render: trigger }: { render: React.ReactNode }) => trigger,
}));

jest.mock('../Switcher', () => ({
  __esModule: true,
  default: () => <div data-testid="panel-switcher" />,
}));

<<<<<<< HEAD
=======
jest.mock('../NewChat', () => ({
  __esModule: true,
  default: () => <div data-testid="nav-new-chat-fab" />,
}));

>>>>>>> upstream/main
jest.mock('~/components/Nav/AccountSettings', () => ({
  __esModule: true,
  default: () => <div data-testid="nav-user" />,
}));

jest.mock('~/components/Chat/Menus/OpenSidebar', () => ({
  CLOSE_SIDEBAR_ID: 'close-sidebar-button',
}));

import Header from '../Header';

const links = [] as NavLink[];

describe('mobile drawer header', () => {
  it('claims the close identity while the drawer is open', () => {
<<<<<<< HEAD
    render(<Header links={links} expanded={true} onClose={jest.fn()} />, { wrapper: MemoryRouter });
=======
    render(
      <Header
        links={links}
        expanded={true}
        onClose={jest.fn()}
        onNewChat={jest.fn()}
        switchToHistory={true}
      />,
      {
        wrapper: MemoryRouter,
      },
    );
>>>>>>> upstream/main

    const close = screen.getByTestId('close-sidebar-button');
    expect(close).toHaveAttribute('id', 'close-sidebar-button');
    expect(close).toHaveAttribute('aria-expanded', 'true');
  });

  /**
   * The drawer stays mounted while closed so it can slide, and a translated
   * element still counts as visible — so anything probing for the close button
   * would find one sitting off-viewport and act on it.
   */
  it('gives up that identity once closed', () => {
<<<<<<< HEAD
    render(<Header links={links} expanded={false} onClose={jest.fn()} />, {
      wrapper: MemoryRouter,
    });
=======
    render(
      <Header
        links={links}
        expanded={false}
        onClose={jest.fn()}
        onNewChat={jest.fn()}
        switchToHistory={true}
      />,
      {
        wrapper: MemoryRouter,
      },
    );
>>>>>>> upstream/main

    expect(screen.queryByTestId('close-sidebar-button')).not.toBeInTheDocument();
    expect(document.getElementById('close-sidebar-button')).toBeNull();
  });

  /** The only close control while open, so its binding must be discoverable here. */
  it('advertises the toggle shortcut on the close control', () => {
<<<<<<< HEAD
    render(<Header links={links} expanded={true} onClose={jest.fn()} />, { wrapper: MemoryRouter });
=======
    render(
      <Header
        links={links}
        expanded={true}
        onClose={jest.fn()}
        onNewChat={jest.fn()}
        switchToHistory={true}
      />,
      {
        wrapper: MemoryRouter,
      },
    );
>>>>>>> upstream/main

    expect(screen.getByTestId('close-sidebar-button')).toHaveAttribute(
      'aria-keyshortcuts',
      'Meta+Shift+S',
    );
  });

  it('keeps the closed drawer out of the tab order', () => {
<<<<<<< HEAD
    render(<Header links={links} expanded={false} onClose={jest.fn()} />, {
      wrapper: MemoryRouter,
    });
=======
    render(
      <Header
        links={links}
        expanded={false}
        onClose={jest.fn()}
        onNewChat={jest.fn()}
        switchToHistory={true}
      />,
      {
        wrapper: MemoryRouter,
      },
    );
>>>>>>> upstream/main

    expect(screen.getByLabelText('com_nav_close_sidebar')).toHaveAttribute('tabindex', '-1');
  });

  /**
   * Opening makes the chat pane inert, so keyboard/AT focus must move into
   * the drawer. The commit itself drives the handoff — a wall-clock timer
   * races the deferred state flip and silently misses when the flip
   * outlasts it (the id does not exist until `expanded` commits).
   */
  it('moves focus to the toggle when the drawer opens', () => {
<<<<<<< HEAD
    const { rerender } = render(<Header links={links} expanded={false} onClose={jest.fn()} />, {
      wrapper: MemoryRouter,
    });
    expect(document.activeElement).toBe(document.body);

    rerender(<Header links={links} expanded={true} onClose={jest.fn()} />);
=======
    const { rerender } = render(
      <Header
        links={links}
        expanded={false}
        onClose={jest.fn()}
        onNewChat={jest.fn()}
        switchToHistory={true}
      />,
      {
        wrapper: MemoryRouter,
      },
    );
    expect(document.activeElement).toBe(document.body);

    rerender(
      <Header
        links={links}
        expanded={true}
        onClose={jest.fn()}
        onNewChat={jest.fn()}
        switchToHistory={true}
      />,
    );
>>>>>>> upstream/main

    expect(document.activeElement).toBe(screen.getByTestId('close-sidebar-button'));
  });

  it('never steals focus while closed', () => {
<<<<<<< HEAD
    render(<Header links={links} expanded={false} onClose={jest.fn()} />, {
      wrapper: MemoryRouter,
    });
=======
    render(
      <Header
        links={links}
        expanded={false}
        onClose={jest.fn()}
        onNewChat={jest.fn()}
        switchToHistory={true}
      />,
      {
        wrapper: MemoryRouter,
      },
    );
>>>>>>> upstream/main

    expect(document.activeElement).toBe(document.body);
  });

  /**
<<<<<<< HEAD
   * The toggle mirrors the chat header's OpenSidebar — same icon, same shared
   * Button variant, same far-left slot — so the drawer reads as the one
   * persistent control flipping state rather than a new X appearing elsewhere.
   */
  it('leads the row with the shared header-action toggle', () => {
    const { container } = render(<Header links={links} expanded={true} onClose={jest.fn()} />, {
      wrapper: MemoryRouter,
    });
=======
   * The toggle mirrors the chat header's OpenSidebar (same icon, same shared
   * Button variant, same far-left slot), so the drawer reads as the one
   * persistent control flipping state rather than a new X appearing elsewhere.
   */
  it('leads the row with the shared header-action toggle', () => {
    const { container } = render(
      <Header
        links={links}
        expanded={true}
        onClose={jest.fn()}
        onNewChat={jest.fn()}
        switchToHistory={true}
      />,
      {
        wrapper: MemoryRouter,
      },
    );
>>>>>>> upstream/main

    const toggle = screen.getByTestId('close-sidebar-button');
    expect(container.firstElementChild?.firstElementChild).toBe(toggle);
    expect(toggle).toHaveAttribute('variant', 'header-action');
    expect(toggle.querySelector('[data-testid="sidebar-icon"]')).not.toBeNull();
  });

<<<<<<< HEAD
  it('keeps an Agent Marketplace entry reachable from the drawer', () => {
    /* The drawer is the only sidebar surface on small screens, so losing this
     * entry here leaves marketplace users with no sidebar route to `/agents`. */
    render(<Header links={links} expanded={true} onClose={jest.fn()} />, {
      wrapper: MemoryRouter,
    });

    const marketplace = screen.getByTestId('nav-agents-marketplace-button');
    expect(marketplace).toHaveAttribute('href', '/agents');
  });

  it('omits the marketplace entry without marketplace access', () => {
    mockShowMarketplace = false;
    render(<Header links={links} expanded={true} onClose={jest.fn()} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.queryByTestId('nav-agents-marketplace-button')).not.toBeInTheDocument();
    mockShowMarketplace = true;
=======
  /** New chat took the marketplace icon's slot. It belongs beside the panel
   *  switcher because it means the same thing whichever panel is showing, which
   *  is exactly why it no longer repeats under each panel's contents. */
  it('carries new chat in the strip, and not the marketplace', () => {
    render(
      <Header
        links={links}
        expanded={true}
        onClose={jest.fn()}
        onNewChat={jest.fn()}
        switchToHistory={true}
      />,
      {
        wrapper: MemoryRouter,
      },
    );

    expect(screen.getByTestId('nav-new-chat-fab')).toBeInTheDocument();
    expect(screen.queryByTestId('nav-agents-marketplace-button')).not.toBeInTheDocument();
>>>>>>> upstream/main
  });
});
