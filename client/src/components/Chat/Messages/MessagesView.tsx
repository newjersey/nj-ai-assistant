<<<<<<< HEAD
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { useRecoilValue } from 'recoil';
import { Constants } from 'librechat-data-provider';
import type { TMessage } from 'librechat-data-provider';
import { useScreenshot, useMessageScrolling, useScrollbarGutter, useLocalize } from '~/hooks';
import { MessagesViewProvider, useChatContext, useFileMapContext } from '~/Providers';
import { RowMountProvider, useProgressiveRowMount } from '~/hooks/Messages';
import { useChatSurface } from '~/components/Chat/Subagents/surface';
import useThreadRows from '~/hooks/Messages/useThreadRows';
import { steerOverlayHeightFamily } from '~/store/steer';
import { autoScrollAtom } from '~/store/autoScroll';
import { FLAT_THREAD, ThreadList } from './Thread';
import { fontSizeAtom } from '~/store/fontSize';
=======
import { MessagesView as MessagesList } from '@librechat/chat/components';
import type { MessagesThreadProps } from '@librechat/chat/components';
import type { TMessage } from 'librechat-data-provider';
import { MessagePartsHostProvider, appMessagePartsHost } from '~/Providers/MessagePartsHostContext';
import { MessagesViewProvider, useFileMapContext } from '~/Providers';
import { useChatSurface } from '~/components/Chat/Subagents/surface';
import useThreadRows from '~/hooks/Messages/useThreadRows';
import PendingSteers from './Content/Parts/PendingSteers';
import { FLAT_THREAD, ThreadList } from './Thread';
>>>>>>> upstream/main
import MultiMessage from './MultiMessage';
import ScrollButton from './ScrollButton';
import PendingTurn from './PendingTurn';
import MessageNav from './MessageNav';
<<<<<<< HEAD
import { cn } from '~/utils';
import store from '~/store';

function MessagesViewContent({
  messagesTree: _messagesTree,
=======

/** The flat thread renderer by default, the recursive one when the flag turns it off. */
function Thread({
  messagesTree,
  messages,
  conversationId,
  currentEditId,
  setCurrentEditId,
}: MessagesThreadProps) {
  const fileMap = useFileMapContext();
  const threadRows = useThreadRows(FLAT_THREAD ? messages : null, conversationId, fileMap);
  if (FLAT_THREAD && threadRows) {
    return (
      <ThreadList
        rows={threadRows}
        setCurrentEditId={setCurrentEditId}
        currentEditId={currentEditId ?? null}
      />
    );
  }
  return (
    <MultiMessage
      messagesTree={messagesTree}
      messageId={conversationId ?? null}
      setCurrentEditId={setCurrentEditId}
      currentEditId={currentEditId ?? null}
    />
  );
}

function MessagesViewContent({
  messagesTree,
>>>>>>> upstream/main
  messages,
}: {
  messagesTree?: TMessage[] | null;
  messages?: TMessage[] | null;
}) {
<<<<<<< HEAD
  const localize = useLocalize();
  const fontSize = useAtomValue(fontSizeAtom);
  const { screenshotTargetRef } = useScreenshot();
  const [currentEditId, setCurrentEditId] = useState<number | string | null>(-1);

  const {
    conversation,
    contentRef,
    scrollableRef,
    messagesEndRef,
    handleSmoothToRef,
    debouncedHandleScroll,
    handleNearBottomChange,
  } = useMessageScrolling(_messagesTree);

  useScrollbarGutter(scrollableRef);

  const { conversationId } = conversation ?? {};
  const fileMap = useFileMapContext();
  const threadRows = useThreadRows(FLAT_THREAD ? messages : null, conversationId, fileMap);

  const { index, latestMessageDepth } = useChatContext();
  const isSubmitting = useRecoilValue(store.isSubmittingFamily(index));
  const { showScrollButton, maximizeChatSpace } = useChatSurface();
  const autoScroll = useAtomValue(autoScrollAtom);
  /** Re-arm from the conversation that owns the RENDERED tree: the Recoil
   *  conversation id lags the route during warm-cache navigation, and keying
   *  off it would first mount the new tree unwindowed, then narrow it after
   *  the fact — visibly unmounting rows the user is already reading. */
  const treeConversationId = _messagesTree?.[0]?.conversationId ?? conversationId;
  const mountWindow = useProgressiveRowMount({
    tailDepth: latestMessageDepth,
    anchorBottom: autoScroll || isSubmitting,
    isSubmitting,
    conversationId: treeConversationId,
    scrollableRef,
  });

  /** The in-flight steer overlay floats above the composer over the bottom of
   *  the thread (see `InFlightSteers`); reserve an equal band here so the
   *  newest message rests above it and older ones scroll behind. */
  const overlayConversationId = conversationId ?? Constants.NEW_CONVO;
  const steerOverlayHeight = useAtomValue(steerOverlayHeightFamily(overlayConversationId));

  return (
    <>
      <div className="relative flex-1 overflow-hidden overflow-y-auto">
        <div className="relative h-full">
          <div
            className="scrollbar-gutter-stable"
            onScroll={debouncedHandleScroll}
            ref={scrollableRef}
            style={{
              height: '100%',
              overflowY: 'auto',
              width: '100%',
              /** The mount hook pins the anchor row itself (document-space
               *  measurement); native scroll anchoring reacting to the same
               *  insertions would double-correct. */
              overflowAnchor: mountWindow != null ? 'none' : undefined,
            }}
          >
            <div
              ref={contentRef}
              className="flex flex-col pb-9 pt-20 dark:bg-transparent"
              style={
                steerOverlayHeight > 0
                  ? { paddingBottom: `calc(2.25rem + ${steerOverlayHeight}px)` }
                  : undefined
              }
            >
              {(_messagesTree && _messagesTree.length == 0) || _messagesTree === null ? (
                <div
                  className={cn(
                    'flex w-full items-center justify-center p-3 text-text-secondary',
                    fontSize,
                  )}
                >
                  {localize('com_ui_nothing_found')}
                </div>
              ) : (
                <>
                  <div ref={screenshotTargetRef} data-testid="screenshot-target">
                    <RowMountProvider mountWindow={mountWindow}>
                      {FLAT_THREAD && threadRows ? (
                        <ThreadList
                          rows={threadRows}
                          setCurrentEditId={setCurrentEditId}
                          currentEditId={currentEditId ?? null}
                        />
                      ) : (
                        <MultiMessage
                          messagesTree={_messagesTree}
                          messageId={conversationId ?? null}
                          setCurrentEditId={setCurrentEditId}
                          currentEditId={currentEditId ?? null}
                        />
                      )}
                    </RowMountProvider>
                  </div>
                  <PendingTurn
                    scrollableRef={scrollableRef}
                    messages={messages}
                    maximizeChatSpace={maximizeChatSpace}
                  />
                </>
              )}
              <div
                id="messages-end"
                className="group h-0 w-full flex-shrink-0"
                ref={messagesEndRef}
              />
            </div>
          </div>

          <ScrollButton
            conversationId={overlayConversationId}
            enabled={showScrollButton}
            maximizeChatSpace={maximizeChatSpace}
            scrollableRef={scrollableRef}
            messagesEndRef={messagesEndRef}
            scrollHandler={handleSmoothToRef}
            onNearBottomChange={handleNearBottomChange}
            overlayHeight={steerOverlayHeight}
          />

          {/* NJ: We're hiding this until it's made more accessible
          <MessageNav scrollableRef={scrollableRef} />
          */}
        </div>
      </div>
    </>
=======
  const { showScrollButton, maximizeChatSpace } = useChatSurface();
  return (
    <MessagesList
      messagesTree={messagesTree}
      messages={messages}
      showScrollButton={showScrollButton}
      maximizeChatSpace={maximizeChatSpace}
      renderThread={(props) => <Thread {...props} />}
      renderPendingTurn={(props) => <PendingTurn {...props} />}
      renderPendingSteers={(props) => <PendingSteers {...props} />}
      renderScrollButton={(props) => <ScrollButton {...props} />}
      renderNav={({ conversationId, scrollableRef }) => (
        <MessageNav
          key={conversationId}
          conversationId={conversationId}
          scrollableRef={scrollableRef}
        />
      )}
    />
>>>>>>> upstream/main
  );
}

export default function MessagesView({
  messagesTree,
  messages,
}: {
  messagesTree?: TMessage[] | null;
  messages?: TMessage[] | null;
}) {
  return (
    <MessagesViewProvider>
<<<<<<< HEAD
      <MessagesViewContent messagesTree={messagesTree} messages={messages} />
=======
      <MessagePartsHostProvider host={appMessagePartsHost}>
        <MessagesViewContent messagesTree={messagesTree} messages={messages} />
      </MessagePartsHostProvider>
>>>>>>> upstream/main
    </MessagesViewProvider>
  );
}
