import { useState, useRef } from 'react';
import { Pencil } from 'lucide-react';
import { Trans } from 'react-i18next';
import {
  Label,
  Button,
  Spinner,
  OGDialog,
  TrashIcon,
  TooltipAnchor,
  OGDialogTrigger,
  OGDialogTemplate,
  useToastContext,
} from '@librechat/client';
import type { TUserMemory } from 'librechat-data-provider';
import { useDeleteMemoryMutation } from '~/data-provider';
import MemoryEditDialog from './MemoryEditDialog';
<<<<<<< HEAD
import { getMemoryAddress } from './address';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
=======
import { rowActionSlotClasses } from '~/utils';
import { getMemoryAddress } from './address';
import { useLocalize } from '~/hooks';
>>>>>>> upstream/main

interface MemoryCardActionsProps {
  memory: TUserMemory;
}

export default function MemoryCardActions({ memory }: MemoryCardActionsProps) {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const memoryAddress = getMemoryAddress(memory);

  const { mutate: deleteMemory, isLoading: isDeleting } = useDeleteMemoryMutation();

<<<<<<< HEAD
  // NJ: Update styling slightly
  const buttonBaseClass = cn(
    'flex size-7 items-center justify-center rounded-md',
    'transition-colors duration-150',
    // 'text-text-secondary hover:text-text-primary',
    'hover:bg-surface-tertiary',
    ' bg-surface-primary-alt text-text-primary mx-0.5',
  );

=======
>>>>>>> upstream/main
  const confirmDelete = () => {
    if (!memoryAddress) {
      return;
    }
    deleteMemory(
      { ...memoryAddress, agentId: memory.agentId },
      {
        onSuccess: () => {
          showToast({ message: localize('com_ui_deleted'), status: 'success' });
          setDeleteOpen(false);
        },
        onError: () => {
          showToast({ message: localize('com_ui_error'), status: 'error' });
        },
      },
    );
  };

  if (!memoryAddress) {
    return null;
  }

  return (
<<<<<<< HEAD
    <div className="flex items-center gap-0.5">
=======
    <div className={rowActionSlotClasses({ open: editOpen || deleteOpen })}>
>>>>>>> upstream/main
      {/* Edit Button */}
      <MemoryEditDialog
        open={editOpen}
        memory={memory}
        onOpenChange={setEditOpen}
        triggerRef={triggerRef as React.MutableRefObject<HTMLButtonElement | null>}
      >
        <OGDialogTrigger asChild>
          <TooltipAnchor
            description={localize('com_ui_edit_memory')}
            side="top"
            render={
              <Button
                ref={triggerRef}
<<<<<<< HEAD
                variant="ghost"
                size="icon"
                className={buttonBaseClass}
                aria-label={localize('com_ui_edit')}
                onClick={() => setEditOpen(true)}
              >
                <Pencil className="size-3.5" aria-hidden="true" />
=======
                type="button"
                variant="row-action-reveal"
                size="icon-xs"
                data-open={editOpen || undefined}
                aria-label={localize('com_ui_edit')}
                onClick={() => setEditOpen(true)}
              >
                <Pencil className="size-4" aria-hidden="true" />
>>>>>>> upstream/main
              </Button>
            }
          />
        </OGDialogTrigger>
      </MemoryEditDialog>

      {/* Delete Button */}
      <OGDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <OGDialogTrigger asChild>
          <TooltipAnchor
            description={localize('com_ui_delete_memory')}
            side="top"
            render={
              <Button
<<<<<<< HEAD
                variant="ghost"
                size="icon"
                className={buttonBaseClass}
=======
                type="button"
                variant="row-action-reveal"
                size="icon-xs"
                data-open={deleteOpen || undefined}
>>>>>>> upstream/main
                aria-label={localize('com_ui_delete')}
                onClick={() => setDeleteOpen(true)}
              >
                {isDeleting ? (
<<<<<<< HEAD
                  <Spinner className="size-3.5" />
                ) : (
                  <TrashIcon className="size-3.5" aria-hidden="true" />
=======
                  <Spinner className="size-4" />
                ) : (
                  <TrashIcon className="size-4" aria-hidden="true" />
>>>>>>> upstream/main
                )}
              </Button>
            }
          />
        </OGDialogTrigger>
        <OGDialogTemplate
          showCloseButton={false}
          title={localize('com_ui_delete_memory')}
          className="w-11/12 max-w-lg"
          main={
<<<<<<< HEAD
            <Label className="text-left text-sm font-medium">
              <Trans
                i18nKey="com_ui_delete_confirm_strong"
                values={{ title: memory.key || localize('com_ui_memory') }}
                components={{ strong: <strong /> }}
=======
            <Label className="block text-left text-sm font-medium">
              {/* The key is the user's: it breaks anywhere, so a long one wraps inside
                  the dialog instead of setting its width. */}
              <Trans
                i18nKey="com_ui_delete_confirm_strong"
                values={{ title: memory.key || localize('com_ui_memory') }}
                components={{ strong: <strong className="break-all" /> }}
>>>>>>> upstream/main
              />
            </Label>
          }
          selection={{
            selectHandler: confirmDelete,
            selectClasses:
              'bg-surface-destructive text-text-on-status hover:bg-surface-destructive-hover',
            selectText: localize('com_ui_delete'),
          }}
        />
      </OGDialog>
    </div>
  );
}
