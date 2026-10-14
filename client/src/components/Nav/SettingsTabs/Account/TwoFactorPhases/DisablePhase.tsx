import React, { useState } from 'react';
import { motion } from 'framer-motion';
<<<<<<< HEAD
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
=======
import { REGEXP_ONLY_DIGITS } from 'input-otp';
>>>>>>> upstream/main
import {
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  Spinner,
} from '@librechat/client';
<<<<<<< HEAD
=======
import BackupCodeInput, { isBackupCode } from '~/components/Auth/BackupCodeInput';
>>>>>>> upstream/main
import { useLocalize } from '~/hooks';

const fadeAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 },
};

interface DisablePhaseProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onDisable: (token: string, useBackup: boolean) => void;
  isDisabling: boolean;
}

export const DisablePhase: React.FC<DisablePhaseProps> = ({ onDisable, isDisabling }) => {
  const localize = useLocalize();
  const [token, setToken] = useState('');
  const [useBackup, setUseBackup] = useState(false);

  return (
<<<<<<< HEAD
    <motion.div {...fadeAnimation} className="space-y-8">
      <div className="flex justify-center">
        <InputOTP
          value={token}
          onChange={setToken}
          maxLength={useBackup ? 8 : 6}
          pattern={useBackup ? REGEXP_ONLY_DIGITS_AND_CHARS : REGEXP_ONLY_DIGITS}
          className="gap-2"
        >
          {useBackup ? (
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
              <InputOTPSlot index={6} />
              <InputOTPSlot index={7} />
            </InputOTPGroup>
          ) : (
=======
    <motion.div {...fadeAnimation} className="text-text-primary space-y-8">
      <div className="flex justify-center">
        {useBackup ? (
          <BackupCodeInput value={token} onChange={setToken} />
        ) : (
          <InputOTP
            aria-label={localize('com_ui_2fa_verification_required')}
            value={token}
            onChange={setToken}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            className="gap-2"
          >
>>>>>>> upstream/main
            <>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </>
<<<<<<< HEAD
          )}
        </InputOTP>
=======
          </InputOTP>
        )}
>>>>>>> upstream/main
      </div>
      <Button
        variant="destructive"
        onClick={() => onDisable(token, useBackup)}
<<<<<<< HEAD
        disabled={isDisabling || token.length !== (useBackup ? 8 : 6)}
=======
        disabled={isDisabling || !(useBackup ? isBackupCode(token) : token.length === 6)}
>>>>>>> upstream/main
        className="w-full rounded-xl px-6 py-3 transition-all disabled:opacity-50"
      >
        {isDisabling && <Spinner className="mr-2" />}
        {isDisabling ? localize('com_ui_disabling') : localize('com_ui_2fa_disable')}
      </Button>
      <Button
        type="button"
        variant="link"
        onClick={() => setUseBackup(!useBackup)}
<<<<<<< HEAD
        className="h-auto p-0 text-sm text-text-primary hover:underline"
=======
        className="text-text-primary h-auto p-0 text-sm hover:underline"
>>>>>>> upstream/main
      >
        {useBackup ? localize('com_ui_use_2fa_code') : localize('com_ui_use_backup_code')}
      </Button>
    </motion.div>
  );
};
