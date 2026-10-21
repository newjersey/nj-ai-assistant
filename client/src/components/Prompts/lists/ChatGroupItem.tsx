import { useState, memo, useRef, useCallback, useId, useMemo } from 'react';
import * as Ariakit from '@ariakit/react';
<<<<<<< HEAD
import { useNavigate, useParams } from 'react-router-dom';
import { PermissionBits, ResourceType } from 'librechat-data-provider';
=======
import { PermissionBits } from 'librechat-data-provider';
import { useNavigate, useParams } from 'react-router-dom';
import { hasPermissions } from 'librechat-data-provider/react-query';
>>>>>>> upstream/main
import { Ellipsis, Eye, SquarePen, Trash, EarthIcon, User } from 'lucide-react';
import {
  Label,
  Button,
  Spinner,
  OGDialog,
  TooltipAnchor,
  DropdownPopup,
  OGDialogTemplate,
  useToastContext,
} from '@librechat/client';
import type { TPromptGroup } from 'librechat-data-provider';
<<<<<<< HEAD
import { useLocalize, useAuthContext, useSubmitMessage, useResourcePermissions } from '~/hooks';
import { useRecordPromptUsage, useDeletePromptGroup } from '~/data-provider';
=======
import { detectVariables, cn, rowActionClasses, rowActionSlotClasses } from '~/utils';
import { useRecordPromptUsage, useDeletePromptGroup } from '~/data-provider';
import { useLocalize, useAuthContext, useSubmitMessage } from '~/hooks';
>>>>>>> upstream/main
import VariableDialog from '../dialogs/VariableDialog';
import PreviewPrompt from '../dialogs/PreviewPrompt';
import CategoryIcon from '../utils/CategoryIcon';
import { useLiveAnnouncer } from '~/Providers';
<<<<<<< HEAD
import { detectVariables, cn } from '~/utils';
=======
>>>>>>> upstream/main

const PROMPT_PATH = '/prompts';

function ChatGroupItem({
  group,
  isChatRoute = true,
<<<<<<< HEAD
}: {
  group: TPromptGroup;
  isChatRoute?: boolean;
=======
  permissionBits = 0,
}: {
  group: TPromptGroup;
  isChatRoute?: boolean;
  permissionBits?: number;
>>>>>>> upstream/main
}) {
  const localize = useLocalize();
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuthContext();
  const { submitPrompt } = useSubmitMessage();
  const recordUsage = useRecordPromptUsage();
  const { announcePolite } = useLiveAnnouncer();

  const { showToast } = useToastContext();
  const menuId = useId();
  const isSharedPrompt = group.author !== user?.id && Boolean(group.authorName);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPreviewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [isVariableDialogOpen, setVariableDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const groupIsGlobal = group.isPublic === true;

<<<<<<< HEAD
  const { hasPermission } = useResourcePermissions(ResourceType.PROMPTGROUP, group._id || '');
  const canEdit = hasPermission(PermissionBits.EDIT);
  const canDelete = hasPermission(PermissionBits.DELETE);
=======
  const canEdit = hasPermissions(permissionBits, PermissionBits.EDIT);
  const canDelete = hasPermissions(permissionBits, PermissionBits.DELETE);
>>>>>>> upstream/main

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const deleteGroup = useDeletePromptGroup({
    onSuccess: () => {
      setDeleteOpen(false);
      announcePolite({
        message: localize('com_ui_prompt_deleted_group', { 0: group.name }),
        isStatus: true,
      });
      if (!isChatRoute && params.promptId === group._id) {
        navigate(PROMPT_PATH, { replace: true });
      }
    },
    onError: () => {
      showToast({ status: 'error', message: localize('com_ui_prompt_delete_error') });
    },
  });

  const handleDelete = () => {
    if (!group._id) {
      return;
    }
    deleteGroup.mutate({ id: group._id });
  };

  const onCardClick = useCallback(() => {
    if (!isChatRoute) {
      navigate(`${PROMPT_PATH}/${group._id}`, { replace: true });
      return;
    }

    const text = group.productionPrompt?.prompt;
    if (!text?.trim()) {
      return;
    }

    if (detectVariables(text)) {
      setVariableDialogOpen(true);
      return;
    }

    submitPrompt(text);
    if (group._id) {
      recordUsage.mutate(group._id);
    }
  }, [group, submitPrompt, recordUsage, isChatRoute, navigate]);

  const snippet =
    typeof group.oneliner === 'string' && group.oneliner.length > 0
      ? group.oneliner
      : (group.productionPrompt?.prompt ?? '');

  const ariaLabel = group.category
    ? localize('com_ui_prompt_group_button', { name: group.name, category: group.category })
    : localize('com_ui_prompt_group_button_no_category', { name: group.name });

  const dropdownItems = useMemo(() => {
    const items = [
      {
        label: localize('com_ui_preview'),
        onClick: () => setPreviewDialogOpen(true),
<<<<<<< HEAD
        icon: <Eye className="icon-sm mr-2 text-text-primary" aria-hidden="true" />,
=======
        icon: <Eye className="icon-sm text-text-primary mr-2" aria-hidden="true" />,
>>>>>>> upstream/main
      },
    ];
    if (canEdit) {
      items.push({
        label: localize('com_ui_edit'),
        onClick: () => navigate(`${PROMPT_PATH}/${group._id}`),
<<<<<<< HEAD
        icon: <SquarePen className="icon-sm mr-2 text-text-primary" aria-hidden="true" />,
=======
        icon: <SquarePen className="icon-sm text-text-primary mr-2" aria-hidden="true" />,
>>>>>>> upstream/main
      });
    }
    if (canDelete) {
      items.push({
        label: localize('com_ui_delete'),
        onClick: () => setDeleteOpen(true),
<<<<<<< HEAD
        icon: <Trash className="icon-sm mr-2 text-text-primary" aria-hidden="true" />,
=======
        icon: <Trash className="icon-sm text-text-primary mr-2" aria-hidden="true" />,
>>>>>>> upstream/main
      });
    }
    return items;
  }, [localize, canEdit, canDelete, group._id, navigate]);

  return (
    <>
      <div
        className={cn(
<<<<<<< HEAD
          'group/prompt relative mb-1.5 rounded-xl border border-border-light bg-transparent transition-colors hover:bg-surface-secondary',
          !isChatRoute && params.promptId === group._id && 'bg-surface-hover',
=======
          'group relative mb-0.5 rounded-lg bg-transparent',
          !isChatRoute && params.promptId === group._id
            ? 'bg-surface-nav-selected'
            : 'hover:bg-surface-nav-hover',
>>>>>>> upstream/main
        )}
      >
        {/* Clickable overlay for card */}
        <button
          type="button"
<<<<<<< HEAD
          className="absolute inset-0 z-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary"
=======
          className="focus-visible:ring-ring-primary absolute inset-0 z-0 rounded-xl focus:outline-hidden focus-visible:ring-2"
>>>>>>> upstream/main
          onClick={onCardClick}
          aria-label={ariaLabel}
        />
        <div className="flex items-start gap-2.5 px-3 py-2.5">
          <CategoryIcon
            category={group.category ?? ''}
            className="mt-0.5 size-4 shrink-0"
            aria-hidden="true"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <TooltipAnchor
                description={group.name}
                side="top"
                render={
<<<<<<< HEAD
                  <span className="truncate text-sm font-semibold text-text-primary">
=======
                  <span className="text-text-primary truncate text-sm font-medium">
>>>>>>> upstream/main
                    {group.name}
                  </span>
                }
              />
              {isSharedPrompt && (
                <TooltipAnchor
                  description={localize('com_ui_by_author', { 0: group.authorName })}
                  side="top"
                  render={
                    <span
                      tabIndex={0}
                      role="img"
                      aria-label={localize('com_ui_by_author', { 0: group.authorName })}
                      className="flex shrink-0 items-center"
                    >
<<<<<<< HEAD
                      <User className="size-3.5 text-text-secondary" aria-hidden="true" />
=======
                      <User className="text-text-secondary size-3.5" aria-hidden="true" />
>>>>>>> upstream/main
                    </span>
                  }
                />
              )}
              {groupIsGlobal && (
                <TooltipAnchor
                  description={localize('com_ui_sr_global_prompt')}
                  side="top"
                  render={
                    <span
                      tabIndex={0}
                      role="img"
                      aria-label={localize('com_ui_sr_global_prompt')}
                      className="flex shrink-0 items-center"
                    >
<<<<<<< HEAD
                      <EarthIcon className="size-3.5 text-accent-primary" aria-hidden="true" />
=======
                      <EarthIcon className="text-accent-primary size-3.5" aria-hidden="true" />
>>>>>>> upstream/main
                    </span>
                  }
                />
              )}
<<<<<<< HEAD
            </div>
            <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-text-secondary">
              {snippet}
            </p>
          </div>
          <div className="relative z-10 shrink-0">
            <DropdownPopup
              portal={true}
              menuId={menuId}
              focusLoop={true}
              className="z-[125]"
              unmountOnHide={true}
              isOpen={menuOpen}
              setIsOpen={setMenuOpen}
              trigger={
                <Ariakit.MenuButton
                  ref={menuButtonRef}
                  aria-label={localize('com_nav_convo_menu_options')}
                  className={cn(
                    'flex size-7 items-center justify-center rounded-md text-text-secondary transition-opacity hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary',
                    menuOpen
                      ? 'opacity-100'
                      : 'opacity-0 focus-visible:opacity-100 group-hover/prompt:opacity-100',
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Ellipsis className="size-4" aria-hidden="true" />
                </Ariakit.MenuButton>
              }
              items={dropdownItems}
            />
          </div>
=======
              {/* The menu shares the title's line, so only the title gives way to it.
                  The snippet below keeps the full width of the row either way. */}
              <div
                className={cn(rowActionSlotClasses({ open: menuOpen }), 'relative z-10 ml-auto')}
              >
                <DropdownPopup
                  portal={true}
                  menuId={menuId}
                  focusLoop={true}
                  className="z-[125]"
                  unmountOnHide={true}
                  isOpen={menuOpen}
                  setIsOpen={setMenuOpen}
                  trigger={
                    <Ariakit.MenuButton
                      ref={menuButtonRef}
                      aria-label={localize('com_nav_convo_menu_options')}
                      className={rowActionClasses({ open: menuOpen })}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Ellipsis className="size-4" aria-hidden="true" />
                    </Ariakit.MenuButton>
                  }
                  items={dropdownItems}
                />
              </div>
            </div>
            <p className="text-text-secondary mt-0.5 line-clamp-2 text-xs leading-relaxed">
              {snippet}
            </p>
          </div>
>>>>>>> upstream/main
        </div>
      </div>
      <PreviewPrompt
        group={group}
        open={isPreviewDialogOpen}
        onOpenChange={setPreviewDialogOpen}
        onCloseAutoFocus={() => {
          requestAnimationFrame(() => {
            menuButtonRef.current?.focus({ preventScroll: true });
          });
        }}
      />
      {isChatRoute && (
        <VariableDialog
          open={isVariableDialogOpen}
          onClose={() => setVariableDialogOpen(false)}
          group={group}
        />
      )}
      <OGDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <OGDialogTemplate
          title={localize('com_ui_delete_prompt')}
          className="w-11/12 max-w-md"
          main={<Label>{localize('com_ui_prompt_delete_confirm', { 0: group.name })}</Label>}
          selection={
            <Button onClick={handleDelete} variant="destructive" disabled={deleteGroup.isLoading}>
              {deleteGroup.isLoading ? <Spinner /> : localize('com_ui_delete')}
            </Button>
          }
        />
      </OGDialog>
    </>
  );
}

export default memo(ChatGroupItem);
