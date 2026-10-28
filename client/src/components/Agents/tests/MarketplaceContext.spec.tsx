<<<<<<< HEAD
/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EModelEndpoint } from 'librechat-data-provider';
import { MarketplaceProvider } from '../MarketplaceContext';
import { useChatContext } from '~/Providers';

// Mock the ChatContext from Providers
jest.mock('~/Providers', () => ({
  ChatContext: {
    Provider: ({ children, value }: { children: React.ReactNode; value: any }) => (
      <div data-testid="chat-context-provider" data-value={JSON.stringify(value)}>
        {children}
      </div>
    ),
  },
  useChatContext: jest.fn(),
}));

// Mock useChatHelpers to avoid Recoil dependency
jest.mock('~/hooks', () => ({
  useChatHelpers: jest.fn(),
}));

const mockedUseChatContext = useChatContext as jest.MockedFunction<typeof useChatContext>;

// Test component that consumes the context
const TestConsumer: React.FC = () => {
  const context = mockedUseChatContext();

  return (
    <div>
      <div data-testid="endpoint">{context?.conversation?.endpoint}</div>
      <div data-testid="conversation-id">{context?.conversation?.conversationId}</div>
      <div data-testid="title">{context?.conversation?.title}</div>
=======
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EModelEndpoint } from 'librechat-data-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MarketplaceProvider, useMarketplaceHost } from '../MarketplaceContext';
import { useChatContext } from '~/Providers';

const mockResetNewConversation = jest.fn();

const mockUseChatHelpers = jest.fn();

jest.mock('~/hooks/Chat/useChatHelpers', () => ({
  __esModule: true,
  default: (index?: number, paramId?: string) => mockUseChatHelpers(index, paramId),
}));

const chatHelpers = {
  conversation: {
    endpoint: EModelEndpoint.agents,
    conversationId: 'marketplace',
    title: 'Agent Marketplace',
  },
};

const START_LABEL = 'start';

/** Reads both halves of what the provider hands the marketplace: the chat context
 *  the side panel consumes, and the host action the detail dialog asks for. */
const Consumer: React.FC = () => {
  const context = useChatContext();
  const { resetNewConversation } = useMarketplaceHost();

  return (
    <div>
      <span data-testid="conversation-id">{context.conversation?.conversationId}</span>
      <button type="button" aria-label={START_LABEL} onClick={resetNewConversation} />
>>>>>>> upstream/main
    </div>
  );
};

<<<<<<< HEAD
describe('MarketplaceProvider', () => {
  beforeEach(() => {
    mockedUseChatContext.mockClear();

    // Mock useChatHelpers return value
    const { useChatHelpers } = require('~/hooks');
    (useChatHelpers as jest.Mock).mockReturnValue({
      conversation: {
        endpoint: EModelEndpoint.agents,
        conversationId: 'marketplace',
        title: 'Agent Marketplace',
      },
    });
  });

  it('provides correct marketplace context values', () => {
    const mockContext = {
      conversation: {
        endpoint: EModelEndpoint.agents,
        conversationId: 'marketplace',
        title: 'Agent Marketplace',
      },
    };

    mockedUseChatContext.mockReturnValue(mockContext as ReturnType<typeof useChatContext>);

    render(
      <MarketplaceProvider>
        <TestConsumer />
      </MarketplaceProvider>,
    );

    expect(screen.getByTestId('endpoint')).toHaveTextContent(EModelEndpoint.agents);
    expect(screen.getByTestId('conversation-id')).toHaveTextContent('marketplace');
    expect(screen.getByTestId('title')).toHaveTextContent('Agent Marketplace');
  });

  it('creates ChatContext.Provider with correct structure', () => {
    render(
      <MarketplaceProvider>
        <div>{/* eslint-disable-line i18next/no-literal-string */}Test Child</div>
      </MarketplaceProvider>,
    );

    const provider = screen.getByTestId('chat-context-provider');
    expect(provider).toBeInTheDocument();

    const valueData = JSON.parse(provider.getAttribute('data-value') || '{}');
    expect(valueData.conversation).toEqual({
      endpoint: EModelEndpoint.agents,
      conversationId: 'marketplace',
      title: 'Agent Marketplace',
    });
  });

  it('renders children correctly', () => {
    render(
      <MarketplaceProvider>
        <div data-testid="test-child">
          {/* eslint-disable-line i18next/no-literal-string */}Test Content
        </div>
      </MarketplaceProvider>,
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toHaveTextContent('Test Content');
  });

  it('provides stable context value (memoization)', () => {
    const { rerender } = render(
      <MarketplaceProvider>
        <TestConsumer />
      </MarketplaceProvider>,
    );

    const firstProvider = screen.getByTestId('chat-context-provider');
    const firstValue = firstProvider.getAttribute('data-value');

    // Rerender should provide the same memoized value
    rerender(
      <MarketplaceProvider>
        <TestConsumer />
      </MarketplaceProvider>,
    );

    const secondProvider = screen.getByTestId('chat-context-provider');
    const secondValue = secondProvider.getAttribute('data-value');

    expect(firstValue).toBe(secondValue);
  });

  it('provides minimal context without bloated functions', () => {
    render(
      <MarketplaceProvider>
        <div>{/* eslint-disable-line i18next/no-literal-string */}Test</div>
      </MarketplaceProvider>,
    );

    const provider = screen.getByTestId('chat-context-provider');
    const valueData = JSON.parse(provider.getAttribute('data-value') || '{}');

    // Should only have conversation object, not 44 empty functions
    expect(Object.keys(valueData)).toContain('conversation');
    expect(valueData.conversation).toEqual({
      endpoint: EModelEndpoint.agents,
      conversationId: 'marketplace',
      title: 'Agent Marketplace',
    });
=======
const renderProvider = (children: React.ReactNode = <Consumer />) => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={queryClient}>
      <MarketplaceProvider host={{ resetNewConversation: mockResetNewConversation }}>
        {children}
      </MarketplaceProvider>
    </QueryClientProvider>,
  );
};

describe('MarketplaceProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseChatHelpers.mockReturnValue(chatHelpers);
  });

  it('hands the marketplace the chat context its panels read', () => {
    renderProvider();

    expect(screen.getByTestId('conversation-id')).toHaveTextContent('marketplace');
    expect(mockUseChatHelpers).toHaveBeenCalledWith(0, 'new');
  });

  it('passes the host reset straight through to the marketplace that asks for it', async () => {
    const user = userEvent.setup();
    renderProvider();

    await user.click(screen.getByRole('button', { name: START_LABEL }));

    /* What the reset does is the shell's business (see routes/__tests__/Marketplace.spec.tsx);
       what this provider owes the feature is the operation the host handed it, unchanged. */
    expect(mockResetNewConversation).toHaveBeenCalledTimes(1);
  });

  it('refuses to serve the host action outside the provider', () => {
    const HostOnly: React.FC = () => {
      useMarketplaceHost();
      return null;
    };
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    /* A no-op default would leave the previous conversations open on every start-chat,
       which is the bug the reset exists to prevent — so the hook throws instead. */
    expect(() => render(<HostOnly />)).toThrow(/MarketplaceProvider/);
    consoleError.mockRestore();
>>>>>>> upstream/main
  });
});
