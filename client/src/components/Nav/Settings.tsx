<<<<<<< HEAD
import type { TDialogProps } from '~/common';
import { SettingsDialog } from './Settings/index';

export default function Settings(props: TDialogProps) {
  return <SettingsDialog {...props} />;
=======
import { lazy, Suspense, useEffect } from 'react';
import { atom, useAtom } from 'jotai';

export const settingsOpenAtom = atom(false);

/** Keep settings lazy without tying its lifetime to a responsive account-menu trigger. */
const SettingsDialog = lazy(() => import('./Settings/Dialog'));

export default function Settings() {
  const [open, setOpen] = useAtom(settingsOpenAtom);

  useEffect(() => () => setOpen(false), [setOpen]);

  return open ? (
    <Suspense fallback={null}>
      <SettingsDialog open={open} onOpenChange={setOpen} />
    </Suspense>
  ) : null;
>>>>>>> upstream/main
}
