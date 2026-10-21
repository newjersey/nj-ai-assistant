<<<<<<< HEAD
import { useRecoilValue } from 'recoil';
=======
import { useAtomValue } from 'jotai';
import { useRecoilValue } from 'recoil';
import { anySubmittingAtom } from '@librechat/chat/react';
>>>>>>> upstream/main
import useWakeLock from '~/hooks/useWakeLock';
import store from '~/store';

/**
 * WakeLockManager Component
 *
 * Manages the Screen Wake Lock during AI response generation to prevent
 * device screens from sleeping or dimming during long-running operations.
 *
 * The wake lock is only active when:
<<<<<<< HEAD
 * 1. Any conversation is currently generating a response (anySubmittingSelector)
=======
 * 1. Any conversation is currently generating a response (anySubmittingAtom)
>>>>>>> upstream/main
 * 2. User has not disabled the feature in settings (keepScreenAwake preference)
 *
 * This component is rendered at the root level of the application
 * to ensure wake lock state persists across all conversations and routes.
 *
 * @see useWakeLock - The hook that manages the actual wake lock implementation
<<<<<<< HEAD
 * @see anySubmittingSelector - Recoil selector tracking if any conversation is generating
 */
const WakeLockManager = () => {
  const isSubmitting = useRecoilValue(store.anySubmittingSelector);
=======
 * @see anySubmittingAtom - Jotai atom tracking if any conversation is generating
 */
const WakeLockManager = () => {
  const isSubmitting = useAtomValue(anySubmittingAtom);
>>>>>>> upstream/main
  const keepScreenAwake = useRecoilValue(store.keepScreenAwake);

  const shouldPreventSleep = isSubmitting && keepScreenAwake;
  useWakeLock(shouldPreventSleep);

  return null;
};

export default WakeLockManager;
