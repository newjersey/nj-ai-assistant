import React from 'react';
<<<<<<< HEAD
// import { motion } from 'framer-motion';
// import { LockIcon, UnlockIcon } from 'lucide-react';
import { Label, Button } from '@librechat/client';
=======
import { Button, TooltipAnchor } from '@librechat/client';
>>>>>>> upstream/main
import { useLocalize } from '~/hooks';

interface DisableTwoFactorToggleProps {
  enabled: boolean;
<<<<<<< HEAD
=======
  required?: boolean;
>>>>>>> upstream/main
  onChange: () => void;
  disabled?: boolean;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

export const DisableTwoFactorToggle: React.FC<DisableTwoFactorToggleProps> = ({
  enabled,
<<<<<<< HEAD
=======
  required,
>>>>>>> upstream/main
  onChange,
  disabled,
  buttonRef,
}) => {
  const localize = useLocalize();
<<<<<<< HEAD
=======
  const isDisableBlockedByPolicy = enabled && required === true;
  const buttonLabel = enabled ? localize('com_ui_2fa_disable') : localize('com_ui_2fa_enable');
  const actionButton = (
    <Button
      ref={buttonRef}
      variant={enabled ? 'destructive' : 'outline'}
      onClick={isDisableBlockedByPolicy ? undefined : onChange}
      disabled={disabled}
      aria-disabled={isDisableBlockedByPolicy || disabled || undefined}
      className={isDisableBlockedByPolicy ? 'cursor-not-allowed' : undefined}
      aria-haspopup="dialog"
      aria-controls="two-factor-authentication-dialog"
    >
      {buttonLabel}
    </Button>
  );
>>>>>>> upstream/main

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
<<<<<<< HEAD
        <Label> {localize('com_nav_2fa')}</Label>
      </div>
      <div className="flex items-center gap-3">
        <Button
          ref={buttonRef}
          variant={enabled ? 'destructive' : 'outline'}
          onClick={onChange}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-controls="two-factor-authentication-dialog"
        >
          {enabled ? localize('com_ui_2fa_disable') : localize('com_ui_2fa_enable')}
        </Button>
=======
        <span className="text-text-primary text-sm">{localize('com_nav_2fa')}</span>
      </div>
      <div className="flex items-center gap-3">
        {isDisableBlockedByPolicy ? (
          <TooltipAnchor
            description={localize('com_ui_2fa_required')}
            aria-label={`${buttonLabel}: ${localize('com_ui_2fa_required')}`}
            data-testid="required-2fa-disable-control"
            className="inline-flex cursor-not-allowed"
            render={actionButton}
          />
        ) : (
          actionButton
        )}
>>>>>>> upstream/main
      </div>
    </div>
  );
};
