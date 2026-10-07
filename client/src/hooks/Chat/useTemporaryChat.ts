import { useCallback } from 'react';
<<<<<<< HEAD
import { Constants } from 'librechat-data-provider';
import { useRecoilState, useRecoilValue } from 'recoil';

=======
import { useRecoilValue } from 'recoil';
import { Constants, isForcedTemporaryRetention } from 'librechat-data-provider';
import { useChatSettings } from '~/Providers/ChatSettingsContext';
import { useGetStartupConfig } from '~/data-provider';
>>>>>>> upstream/main
import store from '~/store';

export type UseTemporaryChatResult = {
  /** Only offered before a conversation has any history, it cannot be toggled mid-thread. */
  show: boolean;
  isTemporary: boolean;
  /** Temporary mode is locked in for the conversation in progress, leaving only a read-only indicator. */
  isActive: boolean;
<<<<<<< HEAD
=======
  /** The administrator forces temporary mode, so the toggle is read-only rather than absent. */
  isEnforced: boolean;
>>>>>>> upstream/main
  toggle: () => void;
};

export default function useTemporaryChat(): UseTemporaryChatResult {
<<<<<<< HEAD
  const [isTemporary, setIsTemporary] = useRecoilState(store.isTemporary);
  const conversation = useRecoilValue(store.conversationByIndex(0));
  const isSubmitting = useRecoilValue(store.isSubmittingFamily(0));

  const toggle = useCallback(() => {
    setIsTemporary((previous) => !previous);
  }, [setIsTemporary]);
=======
  const { data: startupConfig } = useGetStartupConfig();
  const { isTemporary, setIsTemporary } = useChatSettings();
  const conversation = useRecoilValue(store.conversationByIndex(0));
  const isSubmitting = useRecoilValue(store.isSubmittingFamily(0));
  const isEnforced = isForcedTemporaryRetention(startupConfig?.interface?.retentionMode);

  const toggle = useCallback(() => {
    if (isEnforced) {
      return;
    }
    setIsTemporary((previous) => !previous);
  }, [isEnforced, setIsTemporary]);
>>>>>>> upstream/main

  const conversationId = conversation?.conversationId;
  const hasStarted = conversationId != null && conversationId !== Constants.NEW_CONVO;
  const hasMessages = Array.isArray(conversation?.messages) && conversation.messages.length >= 1;

  const show = !hasStarted && !hasMessages && !isSubmitting;
<<<<<<< HEAD

  return {
    show,
    isTemporary,
    isActive: isTemporary && !show,
=======
  const isForced = isEnforced || isTemporary;

  return {
    show,
    isTemporary: isForced,
    isActive: isForced && !show,
    isEnforced,
>>>>>>> upstream/main
    toggle,
  };
}
