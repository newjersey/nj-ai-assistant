import React, { useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import {
  Button,
  OGDialog,
  OGDialogTrigger,
  TooltipAnchor,
  OGDialogTemplate,
<<<<<<< HEAD
} from '@librechat/client';
=======
  useToastContext,
} from '@librechat/client';
import { getPromptMutationErrorKey } from '~/utils';
>>>>>>> upstream/main
import { useDeletePrompt } from '~/data-provider';
import { useLocalize } from '~/hooks';

const DeleteConfirmDialog = ({
  name,
  disabled,
  selectHandler,
}: {
  name: string;
  disabled?: boolean;
  selectHandler: () => void;
}) => {
  const localize = useLocalize();

  return (
    <OGDialog>
      <OGDialogTrigger asChild>
        <TooltipAnchor
          description={localize('com_ui_delete')}
          side="bottom"
          render={
            <Button
<<<<<<< HEAD
              variant="destructive"
=======
              variant="destructive-soft"
>>>>>>> upstream/main
              size="icon"
              aria-label={localize('com_ui_delete')}
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Trash2 className="size-5" aria-hidden="true" />
            </Button>
          }
        />
      </OGDialogTrigger>
      <OGDialogTemplate
        showCloseButton={false}
        title={localize('com_ui_delete_prompt')}
<<<<<<< HEAD
        className="max-w-[450px]"
        main={
          <div className="flex w-full flex-col items-center gap-2">
            <div className="grid w-full items-center gap-2">
              <p className="text-left text-sm text-text-primary">
=======
        className="max-w-[28.125rem]"
        main={
          <div className="flex w-full flex-col items-center gap-2">
            <div className="grid w-full items-center gap-2">
              <p className="text-text-primary text-start text-sm">
>>>>>>> upstream/main
                {localize('com_ui_delete_confirm_prompt_version_var', { 0: name })}
              </p>
            </div>
          </div>
        }
        selection={{
          selectHandler,
          selectClasses:
            'bg-surface-destructive hover:bg-surface-destructive-hover transition-colors duration-200 text-text-on-status',
          selectText: localize('com_ui_delete'),
        }}
      />
    </OGDialog>
  );
};

interface DeletePromptProps {
  promptId?: string;
  groupId: string;
  promptName: string;
  disabled: boolean;
}

const DeletePrompt = React.memo(
  ({ promptId, groupId, promptName, disabled }: DeletePromptProps) => {
<<<<<<< HEAD
    const deletePromptMutation = useDeletePrompt();
=======
    const localize = useLocalize();
    const { showToast } = useToastContext();
    const deletePromptMutation = useDeletePrompt({
      onError: (error) => {
        showToast({
          status: 'error',
          message: localize(getPromptMutationErrorKey(error, 'com_ui_prompt_delete_error')),
        });
      },
    });
>>>>>>> upstream/main

    const handleDelete = useCallback(() => {
      if (!promptId) {
        return;
      }
      deletePromptMutation.mutate({
        _id: promptId,
        groupId,
      });
    }, [promptId, groupId, deletePromptMutation]);

    if (!promptId) {
      return null;
    }

    return (
      <DeleteConfirmDialog
        name={promptName}
        disabled={disabled || !promptId}
        selectHandler={handleDelete}
      />
    );
  },
);

DeletePrompt.displayName = 'DeletePrompt';

export default DeletePrompt;
