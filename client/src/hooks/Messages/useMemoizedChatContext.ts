import { useRef, useMemo } from 'react';
import type { TMessage } from 'librechat-data-provider';
import type { TMessageChatContext } from '~/common/types';
import { useChatContext } from '~/Providers';

<<<<<<< HEAD
=======
type LiveChatValues = {
  isSubmitting: boolean;
  latestMessageId: string | undefined;
  latestMessageDepth: number | undefined;
};

>>>>>>> upstream/main
/**
 * Creates a stable `TMessageChatContext` object for memo'd message components.
 *
 * Subscribes to `useChatContext()` internally (intended to be called from non-memo'd
 * wrapper components like `Message` and `MessageContent`), then produces:
<<<<<<< HEAD
 * - A `chatContext` object that stays referentially stable during streaming
 *   (uses a getter for `isSubmitting` backed by a ref)
 * - A stable `conversation` reference that only updates when rendering-relevant fields change
 * - An `effectiveIsSubmitting` value (false for non-latest messages)
=======
 * - A `chatContext` object that stays referentially stable across submissions and
 *   new turns: `isSubmitting`, `latestMessageId` and `latestMessageDepth` are
 *   getters backed by a ref, for reads at call time (click handlers)
 * - A stable `conversation` reference that only updates when rendering-relevant fields change
 * - An `effectiveIsSubmitting` value (false for non-latest messages)
 * - The current `latestMessageId` / `latestMessageDepth`, which the wrapper passes
 *   to the row as props so the row's comparator can ignore changes that leave
 *   this row's relation to the tail unchanged (see `isSameTailRelation`)
 *
 * Every submission and every server id hydration moves the tail, so keying the
 * context object on those values re-rendered every row of the thread several
 * times per send, when only the rows entering or leaving the tail change.
>>>>>>> upstream/main
 */
export default function useMemoizedChatContext(
  message: TMessage | null | undefined,
  isSubmitting: boolean,
) {
  const chatCtx = useChatContext();
<<<<<<< HEAD

  const isSubmittingRef = useRef(isSubmitting);
  isSubmittingRef.current = isSubmitting;
=======
  const { latestMessageId, latestMessageDepth } = chatCtx;

  const liveRef = useRef<LiveChatValues>({ isSubmitting, latestMessageId, latestMessageDepth });
  liveRef.current = { isSubmitting, latestMessageId, latestMessageDepth };
>>>>>>> upstream/main

  /**
   * Stabilize conversation: only update when rendering-relevant fields change,
   * not on every metadata update (e.g., title generation).
   */
  const stableConversation = useMemo(
    () => chatCtx.conversation,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      chatCtx.conversation?.conversationId,
      chatCtx.conversation?.endpoint,
      chatCtx.conversation?.endpointType,
      chatCtx.conversation?.model,
      chatCtx.conversation?.agent_id,
      chatCtx.conversation?.assistant_id,
    ],
  );

<<<<<<< HEAD
  /**
   * `isSubmitting` is included in deps so that chatContext gets a new reference
   * when streaming starts/ends (2x per session). This ensures HoverButtons
   * re-renders to update regenerate/edit button visibility via useGenerationsByLatest.
   * The getter pattern is still valuable: callbacks reading chatContext.isSubmitting
   * at call-time always get the current value even between these re-renders.
   */
=======
>>>>>>> upstream/main
  const chatContext: TMessageChatContext = useMemo(
    () => ({
      ask: chatCtx.ask,
      index: chatCtx.index,
      regenerate: chatCtx.regenerate,
      conversation: stableConversation,
<<<<<<< HEAD
      latestMessageId: chatCtx.latestMessageId,
      latestMessageDepth: chatCtx.latestMessageDepth,
      handleContinue: chatCtx.handleContinue,
      feedbackEnabled: chatCtx.feedbackEnabled,
      get isSubmitting() {
        return isSubmittingRef.current;
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
=======
      handleContinue: chatCtx.handleContinue,
      feedbackEnabled: chatCtx.feedbackEnabled,
      get isSubmitting() {
        return liveRef.current.isSubmitting;
      },
      get latestMessageId() {
        return liveRef.current.latestMessageId;
      },
      get latestMessageDepth() {
        return liveRef.current.latestMessageDepth;
      },
    }),
>>>>>>> upstream/main
    [
      chatCtx.ask,
      chatCtx.index,
      chatCtx.regenerate,
      stableConversation,
<<<<<<< HEAD
      chatCtx.latestMessageId,
      chatCtx.latestMessageDepth,
      chatCtx.handleContinue,
      chatCtx.feedbackEnabled,
      isSubmitting, // intentional: forces new reference on streaming start/end so HoverButtons re-renders
=======
      chatCtx.handleContinue,
      chatCtx.feedbackEnabled,
>>>>>>> upstream/main
    ],
  );

  const messageId = message?.messageId ?? null;
<<<<<<< HEAD
  const isLatestMessage = messageId === chatCtx.latestMessageId;
  const effectiveIsSubmitting = isLatestMessage ? isSubmitting : false;

  return { chatContext, effectiveIsSubmitting };
=======
  const isLatestMessage = messageId === latestMessageId;
  const effectiveIsSubmitting = isLatestMessage ? isSubmitting : false;

  return { chatContext, effectiveIsSubmitting, latestMessageId, latestMessageDepth };
>>>>>>> upstream/main
}
