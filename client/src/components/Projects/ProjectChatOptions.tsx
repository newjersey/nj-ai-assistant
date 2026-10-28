import { memo, useId, useMemo, useRef, useState } from 'react';
import * as Ariakit from '@ariakit/react';
<<<<<<< HEAD
import { Ellipsis, FolderInput, FolderX } from 'lucide-react';
import { DropdownPopup, Spinner, useToastContext } from '@librechat/client';
import type { TConversation } from 'librechat-data-provider';
import type { MenuItemProps } from '~/common';
import ProjectButton from '~/components/Conversations/ConvoOptions/ProjectButton';
import DeleteButton from '~/components/Conversations/ConvoOptions/DeleteButton';
import { useAssignConversationToProjectMutation } from '~/data-provider';
import { NotificationSeverity } from '~/common';
=======
import { Ellipsis, Trash2 } from 'lucide-react';
import { DropdownPopup, buttonVariants } from '@librechat/client';
import type { TConversation } from 'librechat-data-provider';
import type { MenuItemProps } from '~/common';
import DeleteButton from '~/components/Conversations/ConvoOptions/DeleteButton';
import useProjectMenuItem from '~/hooks/Chat/useProjectMenuItem';
>>>>>>> upstream/main
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

type ProjectChatOptionsProps = {
  conversation: TConversation;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
};

const noop = () => {};

function ProjectChatOptions({ conversation, isMenuOpen, setIsMenuOpen }: ProjectChatOptionsProps) {
  const localize = useLocalize();
<<<<<<< HEAD
  const { showToast } = useToastContext();
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showProjectDialog, setShowProjectDialog] = useState(false);

  const conversationId = conversation.conversationId ?? '';
  const chatProjectId = conversation.chatProjectId ?? null;
  const assignConversationToProject = useAssignConversationToProjectMutation();
=======
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const conversationId = conversation.conversationId ?? '';
  const chatProjectId = conversation.chatProjectId ?? null;
  const projectItem = useProjectMenuItem({
    conversationId,
    chatProjectId,
    enabled: isMenuOpen && conversationId !== '',
    onAssigned: () => setIsMenuOpen(false),
  });
>>>>>>> upstream/main

  const menuItems = useMemo<MenuItemProps[]>(() => {
    if (!conversationId) {
      return [];
    }

    return [
<<<<<<< HEAD
      {
        label: localize('com_ui_change_project'),
        onClick: () => setShowProjectDialog(true),
        icon: <FolderInput className="size-4 text-text-secondary" aria-hidden="true" />,
        /** Hiding the menu here restores focus to the trigger, which the dialog
         *  mounting alongside it reads as an outside interaction and closes on.
         *  Both dialogs receive setIsMenuOpen and close the menu themselves. */
        hideOnClick: false,
        render: (props) => <button {...props} />,
      },
      {
        label: localize('com_ui_remove_from_project'),
        show: Boolean(chatProjectId),
        onClick: () => {
          assignConversationToProject.mutate(
            { conversationId, projectId: null },
            {
              onSuccess: () => {
                setIsMenuOpen(false);
                showToast({
                  message: localize('com_ui_project_updated'),
                  severity: NotificationSeverity.SUCCESS,
                  showIcon: true,
                });
              },
              onError: () => {
                showToast({
                  message: localize('com_ui_project_update_error'),
                  severity: NotificationSeverity.ERROR,
                  showIcon: true,
                });
              },
            },
          );
        },
        hideOnClick: false,
        icon: assignConversationToProject.isLoading ? (
          <Spinner className="size-4" />
        ) : (
          <FolderX className="size-4 text-text-secondary" aria-hidden="true" />
        ),
      },
      /* NJ: Hide the delete option from the projects dropdown
=======
      projectItem,
>>>>>>> upstream/main
      {
        label: localize('com_ui_delete'),
        onClick: () => setShowDeleteDialog(true),
        hideOnClick: false,
        render: (props) => <button {...props} />,
<<<<<<< HEAD
        icon: <Trash2 className="size-4 text-text-secondary" aria-hidden="true" />,
      },
      */
    ];
  }, [
    assignConversationToProject,
    chatProjectId,
    conversationId,
    localize,
    setIsMenuOpen,
    showToast,
  ]);
=======
        icon: <Trash2 className="text-text-secondary size-4" aria-hidden="true" />,
      },
    ];
  }, [conversationId, localize, projectItem]);
>>>>>>> upstream/main

  return (
    <>
      <DropdownPopup
        portal={true}
        focusLoop={true}
        unmountOnHide={true}
        menuId={menuId}
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
<<<<<<< HEAD
        className="z-[125] min-w-44"
        iconClassName="mr-2 text-text-secondary"
=======
        className="z-[125]"
        minWidth="11rem"
        iconClassName="me-2 text-text-secondary"
>>>>>>> upstream/main
        trigger={
          <Ariakit.MenuButton
            ref={menuButtonRef}
            aria-label={localize('com_nav_convo_menu_options')}
            className={cn(
<<<<<<< HEAD
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary outline-none transition-colors',
              'hover:bg-surface-hover hover:text-text-primary',
              'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-primary',
              isMenuOpen && 'bg-surface-hover text-text-primary',
=======
              buttonVariants({ variant: 'row-action', size: 'icon-sm' }),
              'text-text-secondary rounded-lg',
              isMenuOpen && 'bg-surface-hover-alt text-text-primary',
>>>>>>> upstream/main
            )}
          >
            <Ellipsis className="h-4 w-4" aria-hidden="true" />
          </Ariakit.MenuButton>
        }
        items={menuItems}
      />
<<<<<<< HEAD
      {showProjectDialog ? (
        <ProjectButton
          conversationId={conversationId}
          chatProjectId={chatProjectId}
          setMenuOpen={setIsMenuOpen}
          triggerRef={menuButtonRef}
          showProjectDialog={showProjectDialog}
          setShowProjectDialog={setShowProjectDialog}
        />
      ) : null}
=======
>>>>>>> upstream/main
      {showDeleteDialog ? (
        <DeleteButton
          title={conversation.title ?? ''}
          retainView={noop}
          triggerRef={menuButtonRef}
          setMenuOpen={setIsMenuOpen}
          showDeleteDialog={showDeleteDialog}
          conversationId={conversationId}
          setShowDeleteDialog={setShowDeleteDialog}
        />
      ) : null}
    </>
  );
}

export default memo(ProjectChatOptions);
