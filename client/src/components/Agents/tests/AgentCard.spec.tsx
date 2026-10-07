import React from 'react';
<<<<<<< HEAD
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type t from 'librechat-data-provider';
import AgentCard from '../AgentCard';

jest.mock('~/utils', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
    renderAgentAvatar: (agent: any) => {
      const avatar = agent.avatar;
      const src = typeof avatar === 'string' ? avatar : avatar?.filepath;
      if (src) {
        return <img src={src} alt={`${agent.name} avatar`} />;
      }
      return <svg className="lucide-feather" />;
    },
  };
});

// Mock useLocalize hook
jest.mock('~/hooks/useLocalize', () => () => (key: string) => {
  const mockTranslations: Record<string, string> = {
    com_agents_created_by: 'Created by',
    com_agents_agent_card_label: '{{name}} agent. {{description}}',
    com_agents_category_general: 'General',
    com_agents_category_hr: 'Human Resources',
    com_agents_contact: 'Contact',
    com_agents_no_contact_available: 'No contact available',
    com_agents_description_card: '{{description}}',
  };
  return mockTranslations[key] || key;
});

// Mock useAgentCategories hook
jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string, values?: Record<string, string | number>) => {
    const mockTranslations: Record<string, string> = {
      com_agents_created_by: 'Created by',
      com_agents_agent_card_label: '{{name}} agent. {{description}}',
      com_agents_category_general: 'General',
      com_agents_category_hr: 'Human Resources',
      com_agents_contact: 'Contact',
      com_agents_no_contact_available: 'No contact available',
      com_agents_description_card: '{{description}}',
    };
    let translation = mockTranslations[key] || key;

    // Replace placeholders with actual values
    if (values) {
      Object.entries(values).forEach(([placeholder, value]) => {
        translation = translation.replace(
          new RegExp(`\\{\\{${placeholder}\\}\\}`, 'g'),
          String(value),
        );
      });
    }

    return translation;
  },
  useAgentCategories: () => ({
    categories: [
      { value: 'general', label: 'com_agents_category_general' },
      { value: 'hr', label: 'com_agents_category_hr' },
      { value: 'custom', label: 'Custom Category' }, // Non-localized custom category
    ],
  }),
  useDefaultConvo: jest.fn(() => jest.fn(() => ({}))),
  useFavorites: jest.fn(() => ({
    isFavoriteAgent: jest.fn(() => false),
    toggleFavoriteAgent: jest.fn(),
  })),
}));

// Mock AgentDetailContent to avoid testing dialog internals
jest.mock('../AgentDetailContent', () => ({
  __esModule: true,
  // eslint-disable-next-line i18next/no-literal-string
  default: () => <div data-testid="agent-detail-content">Agent Detail Content</div>,
}));

// Mock Providers
jest.mock('~/Providers', () => ({
  useChatContext: jest.fn(() => ({
    conversation: null,
    newConversation: jest.fn(),
  })),
}));

// Mock @librechat/client with proper Dialog behavior
jest.mock('@librechat/client', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  return {
    useToastContext: jest.fn(() => ({
      showToast: jest.fn(),
    })),
    OGDialog: ({ children, open, onOpenChange }: any) => {
      // Store onOpenChange in context for trigger to call
      return (
        <div data-testid="dialog-wrapper" data-open={open}>
          {React.Children.map(children, (child: any) => {
            if (child?.type?.displayName === 'OGDialogTrigger' || child?.props?.['data-trigger']) {
              return React.cloneElement(child, { onOpenChange });
            }
            // Only render content when open
            if (child?.type?.displayName === 'OGDialogContent' && !open) {
              return null;
            }
            return child;
          })}
        </div>
      );
    },
    OGDialogTrigger: ({ children, asChild, onOpenChange }: any) => {
      if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
          onClick: (e: any) => {
            (children as any).props?.onClick?.(e);
            onOpenChange?.(true);
          },
        });
      }
      return <div onClick={() => onOpenChange?.(true)}>{children}</div>;
    },
    OGDialogContent: ({ children }: any) => <div data-testid="dialog-content">{children}</div>,
    Label: ({ children, className }: any) => <span className={className}>{children}</span>,
  };
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

describe('AgentCard', () => {
  const mockAgent: t.Agent = {
    id: '1',
    name: 'Test Agent',
    description: 'A test agent for testing purposes',
    support_contact: {
      name: 'Test Support',
      email: 'test@example.com',
    },
    avatar: { filepath: '/test-avatar.png', source: 'local' },
    created_at: 1672531200000,
    instructions: 'Test instructions',
    provider: 'openai' as const,
    model: 'gpt-4',
    model_parameters: {
      temperature: 0.7,
      maxContextTokens: 4096,
      max_context_tokens: 4096,
      max_output_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
  };

  const mockOnSelect = jest.fn();
  const Wrapper = createWrapper();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('renders agent information correctly', () => {
    render(
      <Wrapper>
        <AgentCard agent={mockAgent} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    expect(screen.getByText('Test Agent')).toBeInTheDocument();
    expect(screen.getByText('A test agent for testing purposes')).toBeInTheDocument();
  });

  it('renders an HTML description as plain text in the card and accessible label', () => {
    render(
      <Wrapper>
        <AgentCard
          agent={{
            ...mockAgent,
            description:
              '<span>Assistant for projects. <a href="https://example.com">Read the guide</a></span>',
          }}
        />
      </Wrapper>,
=======
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import type t from 'librechat-data-provider';
import AgentCard from '../AgentCard';

jest.mock('~/utils', () => ({
  ...jest.requireActual('~/utils/agents'),
  cn: (...classes: Array<string | false | undefined | null>) => classes.filter(Boolean).join(' '),
}));

jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string) => {
    const labels: Record<string, string> = {
      com_ui_agent: 'Agent',
      com_agents_category_general: 'General',
      com_agents_description_empty: 'No description provided.',
      com_agents_view_details: 'View details',
      com_agents_contact: 'Contact',
      com_agents_no_contact_available: 'No contact available',
    };
    return labels[key] ?? key;
  },
  useAgentCategories: () => ({
    categories: [{ value: 'general', label: 'com_agents_category_general' }],
  }),
}));

const agent: t.Agent = {
  id: 'agent-one',
  name: 'Research Assistant',
  description: 'Find clear answers and compare sources.',
  category: 'general',
  support_contact: { name: 'Research Team', email: 'support@example.com' },
  avatar: null,
  created_at: 0,
  provider: 'openai',
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
};

describe('AgentCard', () => {
  it('shows the public identity and keeps its support link independent', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<AgentCard agent={agent} onSelect={onSelect} />);
    expect(screen.getByRole('heading', { name: agent.name as string })).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
    const trigger = screen.getByRole('button', { name: agent.name as string });
    expect(trigger).toHaveAccessibleDescription(agent.description as string);
    const contact = screen.getByRole('link', { name: 'Research Team' });
    expect(contact).toHaveAttribute('href', 'mailto:support@example.com');
    contact.addEventListener('click', (event) => event.preventDefault());
    await user.click(contact);
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('strips markup from a rich description so the blurb stays text', () => {
    render(
      <AgentCard
        agent={{
          ...agent,
          support_contact: undefined,
          description:
            '<span>Assistant for projects. <a href="https://example.com">Read the guide</a></span>',
        }}
        onSelect={jest.fn()}
      />,
>>>>>>> upstream/main
    );

    expect(screen.getByText('Assistant for projects. Read the guide')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Read the guide' })).not.toBeInTheDocument();
<<<<<<< HEAD
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Test Agent agent. Assistant for projects. Read the guide',
    );
  });

  it('displays avatar when provided as object', () => {
    render(
      <Wrapper>
        <AgentCard agent={mockAgent} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    const avatarImg = screen.getByAltText('Test Agent avatar');
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', '/test-avatar.png');
  });

  it('displays avatar when provided as string', () => {
    const agentWithStringAvatar = {
      ...mockAgent,
      avatar: '/string-avatar.png' as any, // Legacy support for string avatars
    };

    render(
      <Wrapper>
        <AgentCard agent={agentWithStringAvatar} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    const avatarImg = screen.getByAltText('Test Agent avatar');
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', '/string-avatar.png');
  });

  it('displays Feather icon fallback when no avatar is provided', () => {
    const agentWithoutAvatar = {
      ...mockAgent,
      avatar: undefined,
    };

    render(
      <Wrapper>
        <AgentCard agent={agentWithoutAvatar as any as t.Agent} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    // Check for Feather icon presence by looking for the svg with lucide-feather class
    const featherIcon = document.querySelector('.lucide-feather');
    expect(featherIcon).toBeInTheDocument();
  });

  it('card is clickable and has dialog trigger', () => {
    render(
      <Wrapper>
        <AgentCard agent={mockAgent} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    const card = screen.getByRole('button');
    // Card should be clickable - the actual dialog behavior is handled by Radix
    expect(card).toBeInTheDocument();
    expect(() => fireEvent.click(card)).not.toThrow();
  });

  it('handles Enter key press', () => {
    render(
      <Wrapper>
        <AgentCard agent={mockAgent} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    const card = screen.getByRole('button');
    // Card should respond to keyboard - the actual dialog behavior is handled by Radix
    expect(() => fireEvent.keyDown(card, { key: 'Enter' })).not.toThrow();
  });

  it('handles Space key press', () => {
    render(
      <Wrapper>
        <AgentCard agent={mockAgent} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    const card = screen.getByRole('button');
    // Card should respond to keyboard - the actual dialog behavior is handled by Radix
    expect(() => fireEvent.keyDown(card, { key: ' ' })).not.toThrow();
  });

  it('does not call onSelect for other keys', () => {
    render(
      <Wrapper>
        <AgentCard agent={mockAgent} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Escape' });

    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it('applies additional className when provided', () => {
    render(
      <Wrapper>
        <AgentCard agent={mockAgent} onSelect={mockOnSelect} className="custom-class" />
      </Wrapper>,
    );

    const card = screen.getByRole('button');
    expect(card).toHaveClass('custom-class');
  });

  it('handles missing support contact gracefully', () => {
    const agentWithoutContact = {
      ...mockAgent,
      support_contact: undefined,
      authorName: undefined,
    };

    render(
      <Wrapper>
        <AgentCard agent={agentWithoutContact} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    expect(screen.getByText('Test Agent')).toBeInTheDocument();
    expect(screen.getByText('A test agent for testing purposes')).toBeInTheDocument();
    expect(screen.getByText('No contact available')).toBeInTheDocument();
  });

  it('falls back to owner contact when support_contact is missing', () => {
    const agentWithAuthorName = {
      ...mockAgent,
      support_contact: undefined,
      authorName: 'John Doe',
      owner_contact: {
        name: 'Owner User',
      },
    };

    render(
      <Wrapper>
        <AgentCard agent={agentWithAuthorName} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    expect(screen.getByText('Contact:')).toBeInTheDocument();
    expect(screen.getByText('Owner User')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Owner User' })).not.toBeInTheDocument();
    expect(screen.queryByText('by John Doe')).not.toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <Wrapper>
        <AgentCard agent={mockAgent} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute(
      'aria-label',
      'Test Agent agent. A test agent for testing purposes',
    );
  });

  it('displays localized category label', () => {
    const agentWithCategory = {
      ...mockAgent,
      category: 'general',
    };

    render(
      <Wrapper>
        <AgentCard agent={agentWithCategory} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('displays custom category label', () => {
    const agentWithCustomCategory = {
      ...mockAgent,
      category: 'custom',
    };

    render(
      <Wrapper>
        <AgentCard agent={agentWithCustomCategory} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    expect(screen.getByText('Custom Category')).toBeInTheDocument();
  });

  it('displays capitalized fallback for unknown category', () => {
    const agentWithUnknownCategory = {
      ...mockAgent,
      category: 'unknown',
    };

    render(
      <Wrapper>
        <AgentCard agent={agentWithUnknownCategory} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('does not display category tag when category is not provided', () => {
    render(
      <Wrapper>
        <AgentCard agent={mockAgent} onSelect={mockOnSelect} />
      </Wrapper>,
    );

    expect(screen.queryByText('General')).not.toBeInTheDocument();
    expect(screen.queryByText('Unknown')).not.toBeInTheDocument();
  });

  it('works without onSelect callback', () => {
    render(
      <Wrapper>
        <AgentCard agent={mockAgent} />
      </Wrapper>,
    );

    const card = screen.getByRole('button');
    // Should not throw when clicking without onSelect
    expect(() => fireEvent.click(card)).not.toThrow();
=======
    expect(screen.getByRole('button', { name: agent.name as string })).toHaveAccessibleDescription(
      'Assistant for projects. Read the guide',
    );
  });

  it('selects the agent exactly once on click', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<AgentCard agent={agent} onSelect={onSelect} />);
    const trigger = screen.getByRole('button', { name: agent.name as string });
    await user.click(trigger);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(agent);
  });

  it.each(['{Enter}', ' '])('uses native keyboard activation for %s', async (key) => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(<AgentCard agent={agent} onSelect={onSelect} />);
    await user.tab();
    expect(screen.getByRole('button', { name: agent.name as string })).toHaveFocus();
    await user.keyboard(key);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('keeps cards usable when their avatar fails to load', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <AgentCard
        onSelect={onSelect}
        agent={{ ...agent, avatar: { filepath: '/missing-avatar.png', source: 'local' } }}
      />,
    );
    const image = screen.getByRole('img', { name: 'Research Assistant avatar' });
    fireEvent.error(image);
    expect(image).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: agent.name as string }));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: agent.id }));
  });

  it('keeps accessible labels distinct when the same agent appears twice', () => {
    render(
      <>
        <AgentCard agent={agent} onSelect={jest.fn()} />
        <AgentCard
          onSelect={jest.fn()}
          agent={{ ...agent, name: 'Second appearance', description: 'A different summary' }}
        />
      </>,
    );
    expect(screen.getByRole('button', { name: 'Research Assistant' })).toHaveAccessibleDescription(
      'Find clear answers and compare sources.',
    );
    expect(screen.getByRole('button', { name: 'Second appearance' })).toHaveAccessibleDescription(
      'A different summary',
    );
  });

  it('offers details without inventing missing metadata', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <AgentCard
        onSelect={onSelect}
        agent={{
          ...agent,
          name: null,
          description: null,
          category: undefined,
          support_contact: undefined,
        }}
      />,
    );
    expect(screen.queryByText('General')).not.toBeInTheDocument();
    expect(screen.queryByText('No contact available')).not.toBeInTheDocument();
    const trigger = screen.getByRole('button', { name: 'Agent' });
    expect(trigger).toHaveAccessibleDescription('No description provided.');
    await user.click(trigger);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: agent.id, name: null }));
>>>>>>> upstream/main
  });
});
