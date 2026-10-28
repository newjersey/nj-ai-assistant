<<<<<<< HEAD
import { useRecoilCallback } from 'recoil';
import type { TSubmission } from 'librechat-data-provider';
import store from '~/store';
=======
import { useCallback } from 'react';
import { useStore } from 'jotai';
import { submissionByIndex, useClearSubmissions } from '@librechat/chat/react';
import type { TSubmission } from 'librechat-data-provider';
>>>>>>> upstream/main

/**
 * Identity-guarded post-abort cleanup: the abort HTTP response can resolve
 * AFTER the aborted run's final SSE already fired the interrupt drain and
 * started the NEXT submission — clearing unconditionally at that point tears
 * down the new run's stream before it ever attaches, so its placeholder
 * finalizes empty. Capture the submission before the abort round-trip and
 * only clear when it is still the current one.
 */
export function useAbortCleanup(index: string | number) {
<<<<<<< HEAD
  const clearAllSubmissions = store.useClearSubmissionState();

  const captureSubmission = useRecoilCallback(
    ({ snapshot }) =>
      (): TSubmission | null =>
        snapshot.getLoadable(store.submissionByIndex(index)).getValue(),
    [index],
  );

  const clearSubmissionsUnlessReplaced = useRecoilCallback(
    ({ snapshot }) =>
      (captured: TSubmission | null) => {
        const current = snapshot.getLoadable(store.submissionByIndex(index)).getValue();
        if (current != null && current !== captured) {
          return;
        }
        clearAllSubmissions();
      },
    [clearAllSubmissions, index],
=======
  const jotaiStore = useStore();
  const clearAllSubmissions = useClearSubmissions();

  const captureSubmission = useCallback(
    (): TSubmission | null => jotaiStore.get(submissionByIndex(index)),
    [jotaiStore, index],
  );

  const clearSubmissionsUnlessReplaced = useCallback(
    (captured: TSubmission | null) => {
      const current = jotaiStore.get(submissionByIndex(index));
      if (current != null && current !== captured) {
        return;
      }
      clearAllSubmissions();
    },
    [clearAllSubmissions, jotaiStore, index],
>>>>>>> upstream/main
  );

  return { captureSubmission, clearSubmissionsUnlessReplaced };
}
