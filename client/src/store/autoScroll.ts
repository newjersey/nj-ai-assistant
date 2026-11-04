import { createStorageAtom } from './jotai-utils';

<<<<<<< HEAD
const DEFAULT_AUTO_SCROLL = false;
=======
const DEFAULT_AUTO_SCROLL = true;
>>>>>>> upstream/main

/**
 * Whether opening a conversation lands the reader on its newest message.
 * Persisted under the same `autoScroll` key the Recoil atom used, so a stored
 * preference survives the migration.
 */
export const autoScrollAtom = createStorageAtom<boolean>('autoScroll', DEFAULT_AUTO_SCROLL);
