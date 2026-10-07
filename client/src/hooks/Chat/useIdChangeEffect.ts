import { useEffect, useRef } from 'react';
<<<<<<< HEAD
import { useResetRecoilState } from 'recoil';
import { logger } from '~/utils';
import store from '~/store';
=======
import { useChatSettings } from '~/Providers/ChatSettingsContext';
import { logger } from '~/utils';
>>>>>>> upstream/main

/**
 * Hook to reset visible artifacts when the conversation ID changes
 * @param conversationId - The current conversation ID
 */
export default function useIdChangeEffect(conversationId: string) {
  const lastConvoId = useRef<string | null>(null);
<<<<<<< HEAD
  const resetVisibleArtifacts = useResetRecoilState(store.visibleArtifacts);
=======
  const { resetVisibleArtifacts } = useChatSettings();
>>>>>>> upstream/main

  useEffect(() => {
    if (conversationId !== lastConvoId.current) {
      logger.log('conversation', 'Conversation ID change');
      resetVisibleArtifacts();
    }
    lastConvoId.current = conversationId;
  }, [conversationId, resetVisibleArtifacts]);
}
