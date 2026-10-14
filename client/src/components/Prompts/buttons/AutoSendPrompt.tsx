import { useRecoilState } from 'recoil';
<<<<<<< HEAD
import { Button, Checkbox } from '@librechat/client';
=======
import { Button, CheckboxGlyph } from '@librechat/client';
>>>>>>> upstream/main
import { useLocalize } from '~/hooks';
import store from '~/store';

export default function AutoSendPrompt({
  onCheckedChange,
}: {
  onCheckedChange?: (value: boolean) => void;
}) {
  const [autoSendPrompts, setAutoSendPrompts] = useRecoilState<boolean>(store.autoSendPrompts);
  const localize = useLocalize();

  const handleCheckedChange = (value: boolean) => {
    setAutoSendPrompts(value);
    if (onCheckedChange) {
      onCheckedChange(value);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => handleCheckedChange(!autoSendPrompts)}
      aria-label={localize('com_nav_auto_send_prompts')}
      aria-pressed={autoSendPrompts}
<<<<<<< HEAD
      className={`relative h-9 w-full gap-2 rounded-lg border-border-light font-medium ${autoSendPrompts ? 'bg-surface-hover hover:bg-surface-hover' : ''}`}
    >
      <Checkbox
        checked={autoSendPrompts}
        tabIndex={-1}
        aria-hidden="true"
        aria-label={localize('com_nav_auto_send_prompts')}
        className="pointer-events-none"
      />
=======
      className={`border-border-light relative h-9 w-full gap-2 rounded-lg font-medium ${autoSendPrompts ? 'bg-surface-hover hover:bg-surface-hover' : ''}`}
    >
      {/* The button owns the state through `aria-pressed`; this is the mark, not a
          second control inside it. */}
      <CheckboxGlyph checked={autoSendPrompts} />
>>>>>>> upstream/main
      {localize('com_nav_auto_send_prompts')}
    </Button>
  );
}
