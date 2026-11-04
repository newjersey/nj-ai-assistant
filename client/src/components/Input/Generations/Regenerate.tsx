import { RegenerateIcon } from '@librechat/client';
import type { TGenButtonProps } from '~/common';
import { useLocalize } from '~/hooks';
import Button from './Button';

export default function Regenerate({ onClick }: TGenButtonProps) {
  const localize = useLocalize();

  return (
    <Button onClick={onClick} shortcutId="regenerateResponse">
<<<<<<< HEAD
      <RegenerateIcon className="h-3 w-3 flex-shrink-0 text-text-secondary" />
=======
      <RegenerateIcon className="text-text-secondary h-3 w-3 shrink-0" />
>>>>>>> upstream/main
      {localize('com_ui_regenerate')}
    </Button>
  );
}
