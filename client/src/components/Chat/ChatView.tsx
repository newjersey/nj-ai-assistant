import { memo, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
<<<<<<< HEAD
import { Spinner } from '@librechat/client';
import { useParams } from 'react-router-dom';
import { Constants, buildTree } from 'librechat-data-provider';
import type { TChatProject } from 'librechat-data-provider';
import type { ChatFormValues } from '~/common';
import {
  useScrollbarGutterSeed,
  useAddedResponse,
  useResumeOnLoad,
  useAdaptiveSSE,
  useChatHelpers,
  useQueueDrain,
  useQueuedTurnReveal,
  useLocalize,
} from '~/hooks';
import { ChatContext, AddedChatContext, ChatFormProvider, useFileMapContext } from '~/Providers';
import NewJerseyChatNotice from '~/nj/components/NewJerseyChatNotice';
import ApprovalProvider from './Messages/Content/ApprovalContext';
import ConversationStarters from './Input/ConversationStarters';
import { pendingApprovalActionFamily } from './approval/state';
import { useGetMessagesByConvoId } from '~/data-provider';
import Footer, { useConfiguredFooter } from './Footer';
import { AskAnswerHostProvider } from './ask/state';
=======
import { useParams } from 'react-router-dom';
import { Constants, buildTree } from 'librechat-data-provider';
import { ChatPane, getChatPaneView, QueuedTurnPortalProvider } from '@librechat/chat/components';
import {
  submissionByIndex,
  ChatSessionProvider,
  useScrollbarGutterSeed,
  AskAnswerHostProvider,
  ComposerRestoreProvider,
  pendingApprovalActionFamily,
} from '@librechat/chat/react';
import type { TChatProject, TMessage } from 'librechat-data-provider';
import type { ChatFormValues } from '~/common';
import { AddedChatContext, ChatFormProvider, useChatContext, useFileMapContext } from '~/Providers';
import Footer, { useLandingFooter, useConfiguredFooter } from './Footer';
import { useChatSettings } from '~/Providers/ChatSettingsContext';
import ApprovalProvider from './Messages/Content/ApprovalContext';
import ConversationStarters from './Input/ConversationStarters';
import ProjectBadge from '~/components/Projects/ProjectBadge';
import { OwnerTextProvider } from './Messages/PrivateText';
import { useAddedResponse, useLocalize } from '~/hooks';
>>>>>>> upstream/main
import MessagesView from './Messages/MessagesView';
import Presentation from './Presentation';
import ChatForm from './Input/ChatForm';
import { TraceSurface } from './Trace';
<<<<<<< HEAD
import Landing from './Landing';
import Header from './Header';
import { cn } from '~/utils';
import store from '~/store';

function LoadingSpinner() {
  return (
    <div className="relative flex-1 overflow-hidden overflow-y-auto">
      <div className="relative flex h-full items-center justify-center">
        <Spinner className="text-text-primary" />
      </div>
    </div>
  );
}

function ChatView({ index = 0, project }: { index?: number; project?: TChatProject }) {
  const { conversationId } = useParams();
  const localize = useLocalize();
  const rootSubmission = useRecoilValue(store.submissionByIndex(index));
  const isSubmitting = useRecoilValue(store.isSubmittingFamily(index));
  const saveDrafts = useRecoilValue(store.saveDrafts);
  const centerFormOnLanding = false; // NJ: force this to be `false` to put our landing page text up
=======
import Lia from '~/components/Lia';
import Landing from './Landing';
import Header from './Header';
import store from '~/store';

type ChatViewProps = {
  index?: number;
  project?: TChatProject;
  /** The route is loading another conversation, or failed to. */
  routePending?: boolean;
};

function ChatViewPane({
  index = 0,
  project,
  routePending = false,
  conversationId,
  messages,
  isLoading,
}: ChatViewProps & {
  conversationId?: string;
  messages: TMessage[] | null;
  isLoading: boolean;
}) {
  const localize = useLocalize();
  const rootSubmission = useAtomValue(submissionByIndex(index));
  const { saveDrafts } = useChatSettings();
  const enterToSend = useRecoilValue(store.enterToSend);
  const autoSendText = useRecoilValue(store.autoSendText);
  const speechSettingsInitialized = useRecoilValue(store.speechSettingsInitialized);
  const centerFormOnLanding = useRecoilValue(store.centerFormOnLanding);
>>>>>>> upstream/main
  const pendingAction = useAtomValue(
    pendingApprovalActionFamily(conversationId ?? Constants.NEW_CONVO),
  );

  /** The welcome screen reserves the message column's scrollbar band before any
<<<<<<< HEAD
   *  column exists to measure it (see the column's class list below). */
=======
   *  column exists to measure it (see the column classes in `ChatPane`). */
>>>>>>> upstream/main
  useScrollbarGutterSeed();

  /** A conversation carries a footer only for configured content, and the
   *  composer's clearance has to account for the bar when it does — including
   *  before the config answers, so a cold load does not jump. */
  const configuredFooter = useConfiguredFooter();
<<<<<<< HEAD
=======
  const landingFooter = useLandingFooter();
>>>>>>> upstream/main

  const methods = useForm<ChatFormValues>({
    defaultValues: { text: '' },
  });

  const fileMap = useFileMapContext();

<<<<<<< HEAD
  const {
    data: messages = null,
    isLoading,
    isFetching,
  } = useGetMessagesByConvoId(
    conversationId ?? '',
    {
      enabled: !!conversationId && conversationId !== Constants.SEARCH,
      /** Refetch stale caches on mount: navigation invalidates (not removes)
       * messages now, so a warm conversation renders instantly from cache and
       * reconciles in the background instead of unmounting into a spinner. */
      refetchOnMount: true,
    },
    { isStreaming: isSubmitting },
  );
=======
>>>>>>> upstream/main
  const messagesTree = useMemo(() => {
    const dataTree = buildTree({ messages, fileMap });
    return dataTree?.length === 0 ? null : (dataTree ?? null);
  }, [messages, fileMap]);

<<<<<<< HEAD
  const chatHelpers = useChatHelpers(index, conversationId);
  const addedChatHelpers = useAddedResponse();

  const activeConversation =
    chatHelpers.conversation?.conversationId === conversationId
      ? chatHelpers.conversation
      : undefined;
  const activeSubagentThread = activeConversation?.subagentThread;

  useAdaptiveSSE(rootSubmission, chatHelpers, false, index);

  // Auto-resume if navigating back to conversation with active job.
  // Wait for messages to load AND the warm-cache background revalidation to
  // settle: a stale invalidated cache mounts with isLoading false while the
  // refetch is in flight, and resume must not build from (or race) it.
  useResumeOnLoad(conversationId, chatHelpers.getMessages, index, !isLoading && !isFetching);

  // Show a server-owned queued follow-up as the next user turn as soon as its
  // predecessor completes, ahead of the receipt and active-job polls.
  const revealQueuedTurn = useQueuedTurnReveal(conversationId, index);

  // Auto-send queued follow-up messages once a run finishes cleanly.
  useQueueDrain(index, conversationId, chatHelpers.ask, revealQueuedTurn);

  let content: JSX.Element | null | undefined;
  const isLandingPage =
    (!messagesTree || messagesTree.length === 0) &&
    (conversationId === Constants.NEW_CONVO || !conversationId);

  /** A footer bar renders beneath the composer on the welcome screen always, and
   *  in a conversation when the deployment configured one. The shell already
   *  carried that answer, so this is the same value before and after the config
   *  resolves. */
  const footerBelow = isLandingPage || configuredFooter;
  const isNavigating = (!messagesTree || messagesTree.length === 0) && conversationId != null;
  const isProjectLandingPage = isLandingPage && project != null;

  if (isLoading && conversationId !== Constants.NEW_CONVO) {
    content = <LoadingSpinner />;
  } else if ((isLoading || isNavigating) && !isLandingPage) {
    content = <LoadingSpinner />;
  } else if (!isLandingPage) {
    content = <MessagesView messagesTree={messagesTree} messages={messages} />;
  } else {
    content = <Landing centerFormOnLanding={centerFormOnLanding} />;
  }

=======
  const chat = useChatContext();
  const addedChatHelpers = useAddedResponse();

  const activeConversation =
    chat.conversation?.conversationId === conversationId ? chat.conversation : undefined;
  const activeSubagentThread = activeConversation?.subagentThread;
  const chatProjectId = activeConversation?.chatProjectId || undefined;

  const view = getChatPaneView({
    conversationId,
    isLoading,
    hasMessages: messagesTree != null && messagesTree.length > 0,
  });
  const { isLanding: isLandingPage } = view;

  /** The welcome screen carries the full footer unless the deployment turned it
   *  off; otherwise a footer bar renders only for configured content. */
  const fullFooter = isLandingPage && landingFooter;
  const footerBelow = fullFooter || configuredFooter;
  const isProjectLandingPage = isLandingPage && project != null;

>>>>>>> upstream/main
  const chatFormPlaceholder =
    isProjectLandingPage && project
      ? localize('com_ui_new_chat_in_project', { name: project.name })
      : undefined;

  // Recoil conversation can lag the route during navigation; only announce a
  // title that belongs to the conversation currently in the URL.
<<<<<<< HEAD
  const conversationTitle =
    chatHelpers.conversation?.conversationId === conversationId
      ? chatHelpers.conversation?.title?.trim()
      : undefined;
=======
  const conversationTitle = activeConversation?.title?.trim();
>>>>>>> upstream/main
  const pageHeading =
    isLandingPage || !conversationTitle ? localize('com_ui_new_chat') : conversationTitle;
  const parentConversationId = activeSubagentThread?.parentConversationId;
  /** Durable child threads are an execution record owned by their parent agent.
   * Human continuation is a separate future fork/promotion flow, never an
   * in-place mutation of this canonical child transcript. */
  const isSubagentThreadReadOnly = activeSubagentThread != null;

  return (
    <AskAnswerHostProvider saveDrafts={saveDrafts}>
      <ChatFormProvider {...methods}>
<<<<<<< HEAD
        <ChatContext.Provider value={chatHelpers}>
          <AddedChatContext.Provider value={addedChatHelpers}>
            <ApprovalProvider pendingAction={pendingAction}>
              <Presentation>
                <TraceSurface conversationId={conversationId}>
                  <h1 className="sr-only">{pageHeading}</h1>
                  <Header
                    parentConversationId={parentConversationId}
                    readOnly={isSubagentThreadReadOnly}
                    index={index}
                    isLandingPage={isLandingPage}
                  />
                  <>
                    <div
                      className={cn(
                        'flex flex-col',
                        isLandingPage
                          ? /* The gutter is reserved once per state, wherever the
                               centring happens. A conversation centres the composer
                               inside the band below, against a message column that
                               holds the scrollbar band back; the landing page centres
                               this whole column instead, greeting and composer
                               together, so it holds the same band back here. Without
                               it the composer lands 4px right of where a conversation
                               puts it and slides sideways on the way in. */
                            'scrollbar-gutter-spacer flex-1 items-center justify-end sm:justify-center'
                          : 'h-full overflow-y-auto',
                      )}
                    >
                      {content}
                      {/* Named + opaque so a view transition (the ask_user_question
                        popover ⇄ chat-card morph) paints the whole composer band
                        over the travelling card instead of letting it show
                        through below the composer. The background matches the
                        page, so normal rendering is unchanged. */}
                      <div
                        className={cn(
                          'w-full bg-presentation [view-transition-name:chat-form]',
                          !isLandingPage && 'scrollbar-gutter-spacer',
                          isLandingPage && 'max-w-3xl transition-all duration-200 xl:max-w-4xl',
                        )}
                      >
                        {isLandingPage && <ConversationStarters />}
                        {isSubagentThreadReadOnly ? (
                          <div
                            className="mx-auto w-full max-w-3xl px-4 py-3 text-center text-sm text-text-secondary xl:max-w-4xl"
                            role="note"
                          >
                            {localize('com_ui_subagent_thread_read_only')}
                          </div>
                        ) : (
                          <ChatForm
                            index={index}
                            placeholder={chatFormPlaceholder}
                            project={isProjectLandingPage ? project : undefined}
                            isLandingPage={isLandingPage}
                            footerBelow={footerBelow}
                            centerFormOnLanding={centerFormOnLanding}
                          />
                        )}
                        <NewJerseyChatNotice />
                        {/* The generic disclaimer is the welcome screen's; a
                            deployment's own footer, privacy policy and terms
                            stay with the conversation that always showed them. */}
                        {!isLandingPage && configuredFooter && <Footer configuredOnly />}
                      </div>
                    </div>
                    {isLandingPage && <Footer />}
                  </>
                </TraceSurface>
              </Presentation>
            </ApprovalProvider>
          </AddedChatContext.Provider>
        </ChatContext.Provider>
=======
        <ComposerRestoreProvider>
          <QueuedTurnPortalProvider>
            <AddedChatContext.Provider value={addedChatHelpers}>
              <ApprovalProvider pendingAction={pendingAction}>
                <Presentation routePending={routePending}>
                  <TraceSurface conversationId={conversationId}>
                    <ChatPane
                      index={index}
                      view={view}
                      heading={pageHeading}
                      header={
                        <Header
                          parentConversationId={parentConversationId}
                          readOnly={isSubagentThreadReadOnly}
                        />
                      }
                      badge={chatProjectId ? <ProjectBadge projectId={chatProjectId} /> : null}
                      messages={<MessagesView messagesTree={messagesTree} messages={messages} />}
                      landing={<Landing centerFormOnLanding={centerFormOnLanding} />}
                      renderColumn={(column) => (
                        <OwnerTextProvider
                          messages={messages}
                          conversationId={conversationId}
                          isSubmitting={chat.isSubmitting}
                        >
                          {column}
                        </OwnerTextProvider>
                      )}
                      starters={<ConversationStarters />}
                      readOnlyNote={
                        isSubagentThreadReadOnly
                          ? localize('com_ui_subagent_thread_read_only')
                          : undefined
                      }
                      composer={
                        <ChatForm
                          index={index}
                          routePending={routePending}
                          placeholder={chatFormPlaceholder}
                          project={isProjectLandingPage ? project : undefined}
                          isLandingPage={isLandingPage}
                          enterToSend={enterToSend}
                          autoSendText={autoSendText}
                          speechSettingsInitialized={speechSettingsInitialized}
                          footerBelow={footerBelow}
                          centerFormOnLanding={centerFormOnLanding}
                        />
                      }
                      /* The generic disclaimer and the policy links are the welcome
                         screen's; a deployment's own footer stays with the
                         conversation that always showed it. */
                      bandFooter={
                        !fullFooter && configuredFooter ? <Footer configuredOnly /> : null
                      }
                      footer={fullFooter ? <Footer /> : null}
                      renderMascot={(bandRef) => (
                        <Lia
                          bandRef={bandRef}
                          landing={isLandingPage}
                          submission={rootSubmission}
                        />
                      )}
                    />
                  </TraceSurface>
                </Presentation>
              </ApprovalProvider>
            </AddedChatContext.Provider>
          </QueuedTurnPortalProvider>
        </ComposerRestoreProvider>
>>>>>>> upstream/main
      </ChatFormProvider>
    </AskAnswerHostProvider>
  );
}

<<<<<<< HEAD
=======
function ChatView(props: ChatViewProps) {
  const { index = 0 } = props;
  const { conversationId } = useParams();

  return (
    <ChatSessionProvider index={index} conversationId={conversationId}>
      {({ messages, isLoading }) => (
        <ChatViewPane
          {...props}
          conversationId={conversationId}
          messages={messages}
          isLoading={isLoading}
        />
      )}
    </ChatSessionProvider>
  );
}

>>>>>>> upstream/main
export default memo(ChatView);
