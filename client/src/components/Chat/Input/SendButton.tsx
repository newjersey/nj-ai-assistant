import React, { forwardRef } from 'react';
import { useWatch } from 'react-hook-form';
import { composerSubmitClasses, SendIcon, TooltipAnchor } from '@librechat/client';
import type { Control } from 'react-hook-form';
import NewJerseySendIcon from '~/nj/svgs/NewJerseySendIcon';
import { cn, isSubmittableMessage } from '~/utils';
import { useLocalize } from '~/hooks';

type SendButtonProps = {
  disabled: boolean;
  control: Control<{ text: string }>;
  /** Number of attached files; attachments allow sending without text */
  fileCount?: number;
};

const SubmitButton = React.memo(
  forwardRef((props: { disabled: boolean }, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const localize = useLocalize();
    return (
      <TooltipAnchor
        description={localize('com_nav_send_message')}
        render={
          <button
            ref={ref}
            aria-label={localize('com_nav_send_message')}
            id="send-button"
            disabled={props.disabled}
            // NJ: NewJerseySendIcon draws its own square, no composerSubmitClasses()
            className={cn(
              'text-text-primary outline-offset-4 transition-all duration-200 disabled:cursor-not-allowed disabled:text-text-secondary disabled:opacity-10',
              // NJ: A thumb needs 44px, which the icon's own square must not grow to give
              'flex items-center justify-center touch:size-theme-control-touch',
            )}
            data-testid="send-button"
            type="submit"
          >
            <span className="" data-state="closed">
              <NewJerseySendIcon />
            </span>
          </button>
        }
      />
    );
  }),
);

const SendButton = React.memo(
  forwardRef((props: SendButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const data = useWatch({ control: props.control });
    const canSubmit = isSubmittableMessage(data?.text, props.fileCount);
    return <SubmitButton ref={ref} disabled={props.disabled || !canSubmit} />;
  }),
);

export default SendButton;
