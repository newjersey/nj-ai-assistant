import { PlusCircle } from 'lucide-react';
<<<<<<< HEAD
import { TooltipAnchor } from '@librechat/client';
=======
import { Button, TooltipAnchor } from '@librechat/client';
>>>>>>> upstream/main
import useMultiConvo from '~/hooks/Chat/useMultiConvo';
import { useLocalize } from '~/hooks';

function AddMultiConvo() {
  const localize = useLocalize();
  const { show, addConversation } = useMultiConvo();

  if (!show) {
    return null;
  }

  return (
    <TooltipAnchor
      description={localize('com_ui_add_multi_conversation')}
<<<<<<< HEAD
      role="button"
      tabIndex={0}
      aria-label={localize('com_ui_add_multi_conversation')}
      onClick={addConversation}
      data-testid="add-multi-convo-button"
      className="inline-flex size-9 flex-shrink-0 items-center justify-center rounded-xl border border-border-light bg-presentation text-text-primary transition-all ease-in-out hover:bg-surface-tertiary disabled:pointer-events-none disabled:opacity-50 radix-state-open:bg-surface-tertiary"
    >
      <PlusCircle className="icon-sm" aria-hidden="true" />
    </TooltipAnchor>
=======
      render={
        <Button
          size="icon"
          className="size-9"
          variant="header-action"
          aria-label={localize('com_ui_add_multi_conversation')}
          onClick={addConversation}
          data-testid="add-multi-convo-button"
        >
          <PlusCircle className="icon-sm" aria-hidden="true" />
        </Button>
      }
    />
>>>>>>> upstream/main
  );
}

export default AddMultiConvo;
