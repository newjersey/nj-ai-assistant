import React from 'react';
import { RecoilRoot } from 'recoil';
import { renderHook } from '@testing-library/react';
<<<<<<< HEAD
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { TStartupConfig } from 'librechat-data-provider';
import useChatHelpers from '../useChatHelpers';
=======
import { useChatHelpers } from '@librechat/chat/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { TStartupConfig } from 'librechat-data-provider';
import ChatSettingsProvider from '~/routes/ChatSettings';
import { SteerHostTestProvider } from 'test/steerHost';
import { ChatHostTestProvider } from 'test/chatHost';
>>>>>>> upstream/main

let mockStartupConfig: Partial<TStartupConfig> | undefined;

jest.mock('~/data-provider', () => ({
  useGetStartupConfig: () => ({ data: mockStartupConfig }),
  useAbortStreamMutation: () => ({ mutateAsync: jest.fn() }),
  supportsGenerationProtocolV2: () => false,
}));

<<<<<<< HEAD
=======
jest.mock('~/hooks/AuthContext', () => ({
  useAuthContext: () => ({ user: undefined }),
}));

>>>>>>> upstream/main
jest.mock('~/hooks/Messages/useLatestMessage', () => ({
  useLatestMessage: () => null,
  useLatestMessageId: () => null,
}));

<<<<<<< HEAD
jest.mock('~/hooks/Chat/useChatFunctions', () => ({
  __esModule: true,
  default: () => ({ ask: jest.fn(), regenerate: jest.fn() }),
=======
jest.mock('~/hooks/Chat/services', () => ({
  __esModule: true,
  default: () => jest.requireActual('test/turnServices').createTestTurnServices(),
>>>>>>> upstream/main
}));

jest.mock('~/hooks/useNewConvo', () => ({
  __esModule: true,
  default: () => ({ newConversation: jest.fn() }),
}));

<<<<<<< HEAD
jest.mock('~/hooks/Chat/useSteerConvert', () => ({
  __esModule: true,
  default: () => jest.fn(),
}));

=======
>>>>>>> upstream/main
function renderChatHelpers() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
      <RecoilRoot>{children}</RecoilRoot>
=======
      <RecoilRoot>
        <ChatSettingsProvider>
          <SteerHostTestProvider>
            <ChatHostTestProvider>{children}</ChatHostTestProvider>
          </SteerHostTestProvider>
        </ChatSettingsProvider>
      </RecoilRoot>
>>>>>>> upstream/main
    </QueryClientProvider>
  );
  return renderHook(() => useChatHelpers(0), { wrapper });
}

describe('useChatHelpers feedbackEnabled', () => {
  afterEach(() => {
    mockStartupConfig = undefined;
  });

  /** Fail closed while loading: a `feedback: false` deployment must never flash controls
   *  whose writes the server rejects with 403. */
  it('withholds feedback until the startup config resolves', () => {
    mockStartupConfig = undefined;

    expect(renderChatHelpers().result.current.feedbackEnabled).toBe(false);
  });

  it('enables feedback when the interface leaves the flag unconfigured', () => {
    mockStartupConfig = { interface: {} } as Partial<TStartupConfig>;

    expect(renderChatHelpers().result.current.feedbackEnabled).toBe(true);
  });

  it('enables feedback when the interface explicitly enables it', () => {
    mockStartupConfig = { interface: { feedback: true } } as Partial<TStartupConfig>;

    expect(renderChatHelpers().result.current.feedbackEnabled).toBe(true);
  });

  it('disables feedback when the interface disables it', () => {
    mockStartupConfig = { interface: { feedback: false } } as Partial<TStartupConfig>;

    expect(renderChatHelpers().result.current.feedbackEnabled).toBe(false);
  });
});
