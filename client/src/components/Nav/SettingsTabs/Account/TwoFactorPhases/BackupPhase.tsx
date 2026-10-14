import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
<<<<<<< HEAD
import { Button, Label } from '@librechat/client';
=======
import { Button } from '@librechat/client';
>>>>>>> upstream/main
import { useLocalize } from '~/hooks';

const fadeAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 },
};

interface BackupPhaseProps {
  onNext: () => void;
  onError: (error: Error) => void;
  backupCodes: string[];
  onDownload: () => void;
  downloaded: boolean;
<<<<<<< HEAD
=======
  isCompleting?: boolean;
>>>>>>> upstream/main
}

export const BackupPhase: React.FC<BackupPhaseProps> = ({
  backupCodes,
  onDownload,
  downloaded,
  onNext,
<<<<<<< HEAD
=======
  isCompleting = false,
>>>>>>> upstream/main
}) => {
  const localize = useLocalize();

  return (
<<<<<<< HEAD
    <motion.div {...fadeAnimation} className="space-y-6">
      <Label className="break-keep text-sm">{localize('com_ui_download_backup_tooltip')}</Label>
      <div className="grid grid-cols-2 gap-4 rounded-xl bg-surface-secondary p-6">
=======
    <motion.div {...fadeAnimation} className="text-text-primary space-y-6">
      <p className="text-text-primary text-sm break-keep">
        {localize('com_ui_download_backup_tooltip')}
      </p>
      <div className="bg-surface-secondary grid grid-cols-1 gap-4 rounded-xl p-4">
>>>>>>> upstream/main
        {backupCodes.map((code, index) => (
          <motion.div
            key={code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
<<<<<<< HEAD
            className="rounded-lg bg-surface-tertiary p-3"
          >
            <div className="flex items-center justify-between">
              <span className="hidden text-sm text-text-secondary sm:inline">#{index + 1}</span>
              <span className="font-mono text-lg">{code}</span>
=======
            className="bg-surface-tertiary min-w-0 rounded-lg p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-text-primary shrink-0 text-sm">#{index + 1}</span>
              <span className="text-text-primary min-w-0 font-mono text-sm break-all">{code}</span>
>>>>>>> upstream/main
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-4">
<<<<<<< HEAD
        <Button variant="outline" onClick={onDownload} className="flex-1 gap-2">
          <Download className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">{localize('com_ui_download_backup')}</span>
        </Button>
        <Button onClick={onNext} disabled={!downloaded} className="flex-1">
          {localize('com_ui_complete_setup')}
=======
        <Button
          variant="outline"
          onClick={onDownload}
          className="flex-1 gap-2"
          aria-label={localize('com_ui_download_backup')}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">{localize('com_ui_download_backup')}</span>
        </Button>
        <Button onClick={onNext} disabled={!downloaded || isCompleting} className="flex-1">
          {isCompleting ? localize('com_ui_loading') : localize('com_ui_complete_setup')}
>>>>>>> upstream/main
        </Button>
      </div>
    </motion.div>
  );
};
