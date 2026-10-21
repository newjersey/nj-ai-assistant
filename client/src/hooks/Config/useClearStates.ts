import { useStore } from 'jotai';
import { useRecoilCallback } from 'recoil';
<<<<<<< HEAD
import { siblingIdxFamily, siblingKey } from '~/components/Chat/Messages/Thread/state';
=======
import { Constants } from 'librechat-data-provider';
import {
  filesFamily,
  presetFamily,
  abortScrollFamily,
  isSubmittingFamily,
  optionSettingsFamily,
  showStopButtonByIndex,
  submissionStartFamily,
  useClearSubmissions,
} from '@librechat/chat/react';
import {
  getReasoningStateKey,
  clearPendingComposerContext,
  clearPendingReasoningOverrides,
} from '~/components/Chat/Input/Composer/state';
import { siblingIdxFamily, siblingKey } from '~/components/Chat/Messages/Thread/state';
import { showFilesDialogAtom, filesDialogTriggerAtom } from '~/store/filesDialog';
>>>>>>> upstream/main
import { showSkillsPopoverFamily } from '~/components/Chat/Input/skillsState';
import { clearLocalStorage } from '~/utils/localStorage';
import store from '~/store';

export default function useClearStates() {
  const clearConversations = store.useClearConvoState();
<<<<<<< HEAD
  const clearSubmissions = store.useClearSubmissionState();
=======
  const clearSubmissions = useClearSubmissions();
>>>>>>> upstream/main
  const jotaiStore = useStore();

  const clearStates = useRecoilCallback(
    ({ reset, snapshot }) =>
      async (skipFirst?: boolean) => {
        await clearSubmissions(skipFirst);
        await clearConversations(skipFirst);
<<<<<<< HEAD

        const keys = await snapshot.getPromise(store.conversationKeysAtom);
=======
        /* Jotai's default store outlives the authenticated route: left alone, a
           file manager open at logout reopens for the next session, still
           holding the previous session's unmounted opener. */
        jotaiStore.set(showFilesDialogAtom, false);
        jotaiStore.set(filesDialogTriggerAtom, null);

        const keys = await snapshot.getPromise(store.conversationKeysAtom);
        const keptReasoningKeys = new Set<string>();
        const keptContextKeys = new Set<string>();
        if (skipFirst === true) {
          const firstConvoId = (await snapshot.getPromise(store.conversationByIndex(0)))
            ?.conversationId;
          keptReasoningKeys.add(getReasoningStateKey(null, 0));
          keptReasoningKeys.add(getReasoningStateKey(firstConvoId, 0));
          keptContextKeys.add('0');
          keptContextKeys.add(firstConvoId ?? Constants.NEW_CONVO);
        }
        clearPendingReasoningOverrides(jotaiStore, keptReasoningKeys);
        /* Staged quotes and skill picks are keyed by every conversation the
           composer has visited, not only the panes mounted now: sweep them all
           so none reaches the next session's composer. */
        clearPendingComposerContext(jotaiStore, keptContextKeys);
>>>>>>> upstream/main

        for (const key of keys) {
          if (skipFirst === true && key === 0) {
            continue;
          }

<<<<<<< HEAD
          reset(store.filesByIndex(key));
          reset(store.presetByIndex(key));
          reset(store.textByIndex(key));
          reset(store.showStopButtonByIndex(key));
          reset(store.abortScrollFamily(key));
          reset(store.isSubmittingFamily(key));
          reset(store.optionSettingsFamily(key));
          reset(store.showPopoverFamily(key));
=======
          jotaiStore.set(filesFamily(key), new Map());
          jotaiStore.set(presetFamily(key), null);
          jotaiStore.set(showStopButtonByIndex(key), false);
          jotaiStore.set(abortScrollFamily(key), false);
          jotaiStore.set(submissionStartFamily(key), null);
          jotaiStore.set(isSubmittingFamily(key), false);
          jotaiStore.set(optionSettingsFamily(key), {});
>>>>>>> upstream/main
          reset(store.showMentionPopoverFamily(key));
          reset(store.showPlusPopoverFamily(key));
          reset(store.showPromptsPopoverFamily(key));
          jotaiStore.set(showSkillsPopoverFamily(key), false);
<<<<<<< HEAD
          reset(store.pendingManualSkillsByConvoId(key.toString()));
          reset(store.pendingQuotesByConvoId(key.toString()));
          /**
           * Pending skill/quote queues are keyed by the conversation id the
           * composer wrote under, not this UI index — also clear by the resolved
           * id so queued-but-unsent selections don't linger in Recoil.
           */
          const convoId = (await snapshot.getPromise(store.conversationByIndex(key)))
            ?.conversationId;
          if (convoId != null) {
            reset(store.pendingManualSkillsByConvoId(convoId));
            reset(store.pendingQuotesByConvoId(convoId));
          }
=======
>>>>>>> upstream/main
          reset(store.activePromptByIndex(key));
          reset(store.globalAudioURLFamily(key));
          reset(store.globalAudioFetchingFamily(key));
          reset(store.globalAudioPlayingFamily(key));
          reset(store.activeRunFamily(key));
          reset(store.audioRunFamily(key));
          jotaiStore.set(siblingIdxFamily(siblingKey(key.toString())), 0);
        }

        clearLocalStorage(skipFirst);
      },
    [clearConversations, clearSubmissions, jotaiStore],
  );

  return clearStates;
}
