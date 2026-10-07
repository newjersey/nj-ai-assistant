import { useRecoilValue } from 'recoil';
<<<<<<< HEAD
import type { TMessage } from 'librechat-data-provider';
import { useLatestMessage } from '~/hooks/Messages/useLatestMessage';
import { getLatestText } from '~/utils';
=======
import { getSpeechText } from 'librechat-data-provider';
import type { TMessage } from 'librechat-data-provider';
import { useLatestMessage } from '~/hooks/Messages/useLatestMessage';
>>>>>>> upstream/main
import store from '~/store';

export type TAutoplayTrigger = {
  /** Whether the latest assistant message is finalized and its run has not been played yet */
  shouldPlay: boolean;
  activeRunId: string | null;
  latestMessage: TMessage | null;
};

/**
 * Shared "Autoplay Latest Message" gate so every TTS engine autoplays on identical terms:
 * the run must be finished, the branch tail must be a persisted assistant message carrying
<<<<<<< HEAD
 * text, and its run must not have been played already.
=======
 * speakable text (reasoning alone is not), and its run must not have been played already.
>>>>>>> upstream/main
 */
export default function useAutoplayTrigger(index: string | number = 0): TAutoplayTrigger {
  const activeRunId = useRecoilValue(store.activeRunFamily(index));
  const audioRunId = useRecoilValue(store.audioRunFamily(index));
  const isSubmitting = useRecoilValue(store.isSubmittingFamily(index));
  const latestMessage = useLatestMessage(index);

  const shouldPlay = !!(
    !isSubmitting &&
    latestMessage &&
    latestMessage.isCreatedByUser !== true &&
<<<<<<< HEAD
    getLatestText(latestMessage) &&
=======
    getSpeechText(latestMessage) &&
>>>>>>> upstream/main
    latestMessage.messageId &&
    !latestMessage.messageId.includes('_') &&
    activeRunId != null &&
    activeRunId !== audioRunId
  );

  return { shouldPlay, activeRunId, latestMessage };
}
