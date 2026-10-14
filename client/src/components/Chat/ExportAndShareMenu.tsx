import { useState, useId } from 'react';
<<<<<<< HEAD
import { Share2 } from 'lucide-react';
import * as Ariakit from '@ariakit/react';
import { DropdownPopup, TooltipAnchor, useMediaQuery } from '@librechat/client';
import useExportShare from '~/hooks/Chat/useExportShare';
=======
import { Ellipsis } from 'lucide-react';
import * as Ariakit from '@ariakit/react';
import { DropdownPopup, TooltipAnchor, useMediaQuery } from '@librechat/client';
import useChatOptions from '~/hooks/Chat/useChatOptions';
>>>>>>> upstream/main
import { useLocalize } from '~/hooks';

export default function ExportAndShareMenu({
  isSharedButtonEnabled,
<<<<<<< HEAD
}: {
  isSharedButtonEnabled: boolean;
=======
  readOnly = false,
}: {
  isSharedButtonEnabled: boolean;
  readOnly?: boolean;
>>>>>>> upstream/main
}) {
  const localize = useLocalize();
  const menuId = useId();
  const [isPopoverActive, setIsPopoverActive] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
<<<<<<< HEAD
  const { show, items, hasSharedLink, dialogs } = useExportShare({ isSharedButtonEnabled });
=======
  const { show, items, hasSharedLink, dialogs } = useChatOptions({
    isSharedButtonEnabled,
    readOnly,
    closeMenu: () => setIsPopoverActive(false),
  });
>>>>>>> upstream/main

  if (!show) {
    return null;
  }

  const description = localize(
<<<<<<< HEAD
    hasSharedLink ? 'com_ui_export_share_link_active' : 'com_endpoint_export_share',
=======
    hasSharedLink ? 'com_ui_chat_options_link_active' : 'com_ui_chat_options',
>>>>>>> upstream/main
  );

  return (
    <>
      <DropdownPopup
        portal={true}
        menuId={menuId}
        focusLoop={true}
        unmountOnHide={true}
        isOpen={isPopoverActive}
        setIsOpen={setIsPopoverActive}
        trigger={
          <TooltipAnchor
            description={description}
            render={
              <Ariakit.MenuButton
                id="export-menu-button"
                aria-label={description}
<<<<<<< HEAD
                className="relative inline-flex size-9 flex-shrink-0 items-center justify-center rounded-xl border border-border-light bg-presentation text-text-primary transition-all ease-in-out hover:bg-surface-tertiary disabled:pointer-events-none disabled:opacity-50 radix-state-open:bg-surface-tertiary"
              >
                <Share2
=======
                className="border-border-chrome bg-presentation text-text-primary hover:bg-surface-tertiary aria-expanded:bg-surface-tertiary relative inline-flex size-9 shrink-0 items-center justify-center rounded-xl border transition-all ease-in-out disabled:pointer-events-none disabled:opacity-50"
              >
                <Ellipsis
>>>>>>> upstream/main
                  className="icon-md text-text-primary"
                  aria-hidden="true"
                  focusable="false"
                />
                {hasSharedLink && (
                  <span
<<<<<<< HEAD
                    className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-status-info ring-2 ring-presentation"
=======
                    className="bg-status-info ring-presentation absolute -top-0.5 -right-0.5 size-2 rounded-full ring-2"
>>>>>>> upstream/main
                    data-testid="header-shared-link-indicator"
                    aria-hidden="true"
                  />
                )}
              </Ariakit.MenuButton>
            }
          />
        }
        items={items}
<<<<<<< HEAD
        className={isSmallScreen ? '' : 'absolute right-0 top-0 mt-2'}
=======
        className={isSmallScreen ? '' : 'absolute top-0 right-0 mt-2'}
>>>>>>> upstream/main
      />
      {dialogs}
    </>
  );
}
