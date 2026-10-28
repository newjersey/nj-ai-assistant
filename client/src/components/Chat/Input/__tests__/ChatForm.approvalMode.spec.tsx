import React, { useMemo, useState } from 'react';
<<<<<<< HEAD
import '@testing-library/jest-dom';
import { DndProvider } from 'react-dnd';
import { useForm } from 'react-hook-form';
import { RecoilRoot, useRecoilState } from 'recoil';
=======
import { getDefaultStore, useAtom } from 'jotai';
import { filesFamily, isSubmittingFamily, resetSubmitting } from '@librechat/chat/react';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import { DndProvider } from 'react-dnd';
import { useForm } from 'react-hook-form';
>>>>>>> upstream/main
import { HTML5Backend } from 'react-dnd-html5-backend';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryKeys, EModelEndpoint } from 'librechat-data-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { TFile, TConversation } from 'librechat-data-provider';
import type { ChatFormValues } from '~/common';
import { ChatContext, ChatFormProvider } from '~/Providers';
import { AuthContextProvider } from '~/hooks/AuthContext';
<<<<<<< HEAD
import ChatForm from '../ChatForm';
import store from '~/store';
=======
import { SteerHostTestProvider } from 'test/steerHost';
import ChatForm from '../ChatForm';
>>>>>>> upstream/main

jest.mock('~/hooks/Agents/useCodeApprovalMode', () => ({
  __esModule: true,
  ...jest.requireActual('~/hooks/Agents/useCodeApprovalMode'),
  default: () => ({
    available: true,
    modes: ['ask', 'acceptEdits'],
    selected: 'ask',
  }),
}));

const conversation = {
  conversationId: 'conversation-1',
  endpoint: EModelEndpoint.agents,
  agent_id: 'agent-1',
  title: 'Code',
} as TConversation;

function Harness() {
<<<<<<< HEAD
  const [files, setFiles] = useRecoilState(store.filesByIndex(0));
  const [isSubmitting] = useRecoilState(store.isSubmittingFamily(0));
=======
  const [files, setFiles] = useAtom(filesFamily(0));
  const [isSubmitting] = useAtom(isSubmittingFamily(0));
>>>>>>> upstream/main
  const [, setFilesLoading] = useState(false);
  const methods = useForm<ChatFormValues>({ defaultValues: { text: '' } });

  const chatHelpers = useMemo(
    () =>
      ({
        index: 0,
        conversation,
        setConversation: () => undefined,
        files,
        setFiles,
        isSubmitting,
        setIsSubmitting: () => undefined,
        filesLoading: false,
        setFilesLoading,
        newConversation: () => undefined,
        handleStopGenerating: () => undefined,
        stopGenerating: () => undefined,
        getMessages: () => undefined,
        setMessages: () => undefined,
        ask: () => undefined,
        regenerate: () => undefined,
        setSiblingIdx: () => undefined,
<<<<<<< HEAD
        showPopover: false,
        setShowPopover: () => undefined,
=======
>>>>>>> upstream/main
        abortScroll: false,
        setAbortScroll: () => undefined,
        preset: null,
        setPreset: () => undefined,
        optionSettings: {},
        setOptionSettings: () => undefined,
        handleRegenerate: () => undefined,
        handleContinue: () => undefined,
      }) as unknown as React.ContextType<typeof ChatContext>,
    [files, setFiles, isSubmitting],
  );

  return (
    <ChatFormProvider {...methods}>
      <ChatContext.Provider value={chatHelpers}>
        <ChatForm index={0} isLandingPage={false} footerBelow={false} centerFormOnLanding={false} />
      </ChatContext.Provider>
    </ChatFormProvider>
  );
}

function renderComposer({ submitting }: { submitting: boolean }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  queryClient.setQueryData<TFile[]>([QueryKeys.files], []);
  queryClient.setQueryData([QueryKeys.endpoints], { [EModelEndpoint.agents]: { order: 0 } });

  return render(
    <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
      <RecoilRoot initializeState={({ set }) => set(store.isSubmittingFamily(0), submitting)}>
        <Router>
          <AuthContextProvider authConfig={{ loginRedirect: '', test: true }}>
            <DndProvider backend={HTML5Backend}>
              <Harness />
            </DndProvider>
          </AuthContextProvider>
        </Router>
=======
      <RecoilRoot initializeState={() => getDefaultStore().set(isSubmittingFamily(0), submitting)}>
        <SteerHostTestProvider>
          <Router>
            <AuthContextProvider authConfig={{ loginRedirect: '', test: true }}>
              <DndProvider backend={HTML5Backend}>
                <Harness />
              </DndProvider>
            </AuthContextProvider>
          </Router>
        </SteerHostTestProvider>
>>>>>>> upstream/main
      </RecoilRoot>
    </QueryClientProvider>,
  );
}

<<<<<<< HEAD
=======
afterEach(() => {
  resetSubmitting(getDefaultStore());
  getDefaultStore().set(filesFamily(0), new Map());
});

>>>>>>> upstream/main
describe('ChatForm code approval mode', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('keeps the mode selector usable while a run is in flight', async () => {
    renderComposer({ submitting: true });

    expect(await screen.findByTestId('code-approval-mode')).toBeEnabled();
  }, 20000);

  test('keeps the mode selector usable between runs', async () => {
    renderComposer({ submitting: false });

    expect(await screen.findByTestId('code-approval-mode')).toBeEnabled();
  }, 20000);
});
