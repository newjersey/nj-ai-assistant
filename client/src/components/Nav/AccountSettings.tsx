import { useState, memo, useRef } from 'react';
<<<<<<< HEAD
import { useSetRecoilState } from 'recoil';
import * as Menu from '@ariakit/react/menu';
import icons from '@uswds/uswds/img/sprite.svg';
import { GearIcon, DropdownMenuSeparator, Avatar } from '@librechat/client';
=======
import { useSetAtom } from 'jotai';
import { useSetRecoilState } from 'recoil';
import * as Menu from '@ariakit/react/menu';
import { GearIcon, Avatar } from '@librechat/client';
>>>>>>> upstream/main
import {
  Archive,
  ChevronRight,
  CircleHelp,
<<<<<<< HEAD
=======
  Files,
>>>>>>> upstream/main
  Keyboard,
  LifeBuoy,
  LogOut,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { ArchivedChatsModal } from '~/components/Nav/SettingsTabs/General/ArchivedChatsModal';
<<<<<<< HEAD
import { NewJerseySelectItems } from '~/nj/components/NewJerseySelectItems';
import { useGetStartupConfig, useGetUserBalance } from '~/data-provider';
import { useAuthContext } from '~/hooks/AuthContext';
import { useLocalize } from '~/hooks';
import Settings from './Settings';
=======
import { filesDialogTriggerAtom, showFilesDialogAtom } from '~/store/filesDialog';
import useDirection, { inlineSide } from '~/hooks/Nav/useDirection';
import { useGetStartupConfig } from '~/data-provider';
import { useAuthContext } from '~/hooks/AuthContext';
import { openInNewTab, policyUrls } from '~/utils';
import { settingsOpenAtom } from './Settings';
import { useLocalize } from '~/hooks';
>>>>>>> upstream/main
import store from '~/store';

function HelpSubmenu({
  helpAndFaqURL,
  termsOfServiceURL,
  privacyPolicyURL,
  onShowShortcuts,
}: {
  helpAndFaqURL?: string;
  termsOfServiceURL?: string;
  privacyPolicyURL?: string;
  onShowShortcuts: () => void;
}) {
  const localize = useLocalize();
  const hasHelpFaq = !!helpAndFaqURL && helpAndFaqURL !== '/';
  const hasTos = !!termsOfServiceURL;
  const hasPrivacy = !!privacyPolicyURL;
  const showLegalDivider = (hasHelpFaq || true) && (hasTos || hasPrivacy);
<<<<<<< HEAD

  return (
    <Menu.MenuProvider placement="right-start">
=======
  const submenuSide = inlineSide(useDirection(), 'end');

  return (
    <Menu.MenuProvider placement={`${submenuSide}-start`}>
>>>>>>> upstream/main
      <Menu.MenuItem
        hideOnClick={false}
        render={
          <Menu.MenuButton className="select-item flex w-full cursor-pointer items-center gap-2 text-sm" />
        }
      >
        <CircleHelp className="icon-md" aria-hidden="true" />
<<<<<<< HEAD
        <span className="flex-1 text-left">{localize('com_nav_help')}</span>
        <ChevronRight className="h-4 w-4 text-text-secondary" aria-hidden="true" />
=======
        <span className="flex-1 text-start">{localize('com_nav_help')}</span>
        <ChevronRight className="text-text-secondary h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
>>>>>>> upstream/main
      </Menu.MenuItem>
      <Menu.Menu
        portal
        gutter={12}
<<<<<<< HEAD
        className="account-settings-popover popover-ui popover-from-left z-[126] w-[244px] rounded-lg"
      >
        {hasHelpFaq && (
          <Menu.MenuItem
            onClick={() => window.open(helpAndFaqURL, '_blank', 'noopener,noreferrer')}
=======
        className="popover-ui popover-from-left z-[126] w-[min(15.25rem,90vw)]"
      >
        {hasHelpFaq && (
          <Menu.MenuItem
            onClick={() => openInNewTab(helpAndFaqURL)}
>>>>>>> upstream/main
            className="select-item text-sm"
          >
            <LifeBuoy className="icon-md" aria-hidden="true" />
            {localize('com_nav_help_faq')}
          </Menu.MenuItem>
        )}
        <Menu.MenuItem onClick={onShowShortcuts} className="select-item text-sm">
          <Keyboard className="icon-md" aria-hidden="true" />
          {localize('com_shortcut_keyboard_shortcuts')}
        </Menu.MenuItem>
<<<<<<< HEAD
        {showLegalDivider && (hasTos || hasPrivacy) && <DropdownMenuSeparator />}
        {hasTos && (
          <Menu.MenuItem
            onClick={() => window.open(termsOfServiceURL, '_blank', 'noopener,noreferrer')}
=======
        {showLegalDivider && (hasTos || hasPrivacy) && (
          <Menu.MenuSeparator className="bg-surface-hover -mx-1 my-1 h-px border-0" />
        )}
        {hasTos && (
          <Menu.MenuItem
            onClick={() => openInNewTab(termsOfServiceURL)}
>>>>>>> upstream/main
            className="select-item text-sm"
          >
            <Scale className="icon-md" aria-hidden="true" />
            {localize('com_ui_terms_of_service')}
          </Menu.MenuItem>
        )}
        {hasPrivacy && (
          <Menu.MenuItem
<<<<<<< HEAD
            onClick={() => window.open(privacyPolicyURL, '_blank', 'noopener,noreferrer')}
=======
            onClick={() => openInNewTab(privacyPolicyURL)}
>>>>>>> upstream/main
            className="select-item text-sm"
          >
            <ShieldCheck className="icon-md" aria-hidden="true" />
            {localize('com_ui_privacy_policy')}
          </Menu.MenuItem>
        )}
      </Menu.Menu>
    </Menu.MenuProvider>
  );
}

function AccountSettings({ collapsed = false }: { collapsed?: boolean }) {
  const localize = useLocalize();
<<<<<<< HEAD
  const { user, isAuthenticated, logout } = useAuthContext();
  const { data: startupConfig } = useGetStartupConfig();
  const balanceQuery = useGetUserBalance({
    enabled: !!isAuthenticated && startupConfig?.balance?.enabled,
  });
  const [showSettings, setShowSettings] = useState(false);
  const setShowShortcutsDialog = useSetRecoilState(store.showShortcutsDialog);
  const [showArchived, setShowArchived] = useState(false);
  const accountSettingsButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Menu.MenuProvider placement={collapsed ? 'right-end' : undefined}>
=======
  const { user, logout } = useAuthContext();
  const { data: startupConfig } = useGetStartupConfig();
  const { privacyPolicyUrl, termsOfServiceUrl } = policyUrls(startupConfig);
  const setShowSettings = useSetAtom(settingsOpenAtom);
  const setShowFiles = useSetAtom(showFilesDialogAtom);
  const setFilesDialogTrigger = useSetAtom(filesDialogTriggerAtom);
  const setShowShortcutsDialog = useSetRecoilState(store.showShortcutsDialog);
  const [showArchived, setShowArchived] = useState(false);
  const accountSettingsButtonRef = useRef<HTMLButtonElement>(null);
  /** The collapsed rail opens the menu beside it, toward the content. */
  const railSide = inlineSide(useDirection(), 'end');

  return (
    <Menu.MenuProvider placement={collapsed ? `${railSide}-end` : undefined}>
>>>>>>> upstream/main
      <Menu.MenuButton
        ref={accountSettingsButtonRef}
        aria-label={localize('com_nav_account_settings')}
        data-testid="nav-user"
        className={
          collapsed
<<<<<<< HEAD
            ? 'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-surface-active-alt aria-[expanded=true]:bg-surface-active-alt'
            : 'mt-text-sm flex h-auto w-full items-center gap-2 rounded-xl p-2 text-sm transition-all duration-200 ease-in-out hover:bg-surface-active-alt aria-[expanded=true]:bg-surface-active-alt'
        }
      >
        <div
          className={collapsed ? 'size-7 flex-shrink-0' : '-ml-0.9 -mt-0.8 h-8 w-8 flex-shrink-0'}
        >
=======
            ? 'hover:bg-surface-nav-hover aria-[expanded=true]:bg-surface-nav-selected flex h-9 w-9 items-center justify-center rounded-lg transition-colors'
            : 'hover:bg-surface-nav-hover aria-[expanded=true]:bg-surface-nav-selected flex h-auto w-full items-center gap-2 rounded-xl p-2 text-sm transition-all duration-200 ease-in-out'
        }
      >
        <div className={collapsed ? 'size-7 shrink-0' : 'h-8 w-8 shrink-0'}>
>>>>>>> upstream/main
          <div className="relative flex">
            <Avatar user={user} size={collapsed ? 28 : 32} />
          </div>
        </div>
        {!collapsed && (
<<<<<<< HEAD
          <div
            className="mt-2 grow overflow-hidden text-ellipsis whitespace-nowrap text-left text-text-primary"
            style={{ marginTop: '0', marginLeft: '0' }}
          >
=======
          <div className="text-text-primary grow overflow-hidden text-start text-ellipsis whitespace-nowrap">
>>>>>>> upstream/main
            {user?.name ?? user?.username ?? localize('com_nav_user')}
          </div>
        )}
      </Menu.MenuButton>
      <Menu.Menu
        portal
<<<<<<< HEAD
        className="account-settings-popover popover-ui z-[125] w-[305px] rounded-lg md:w-[244px]"
        style={{
          transformOrigin: collapsed ? 'left bottom' : 'bottom',
          translate: collapsed ? '4px 0' : '0 -4px',
        }}
      >
        <div className="text-token-text-secondary ml-3 mr-2 py-2 text-sm" role="note">
          {user?.email ?? localize('com_nav_user')}
        </div>
        {/* NJ: Hide "balance", "my files", "help & faq", & "settings" (we'll re-enable as we desire)
        {startupConfig?.balance?.enabled === true && balanceQuery.data != null && (
          <>
            <div className="text-token-text-secondary ml-3 mr-2 py-2 text-sm" role="note">
              {localize('com_nav_balance')}:{' '}
              {new Intl.NumberFormat().format(Math.round(balanceQuery.data.tokenCredits))}
            </div>
            <DropdownMenuSeparator />
          </>
        )}
        <HelpSubmenu
          helpAndFaqURL={startupConfig?.helpAndFaqURL}
          termsOfServiceURL={startupConfig?.interface?.termsOfService?.externalUrl}
          privacyPolicyURL={startupConfig?.interface?.privacyPolicy?.externalUrl}
=======
        className="popover-ui z-[125] w-[min(19.0625rem,90vw)] md:w-[min(15.25rem,90vw)]"
        style={{
          transformOrigin: collapsed
            ? `${railSide === 'right' ? 'left' : 'right'} bottom`
            : 'bottom',
          translate: collapsed ? `${railSide === 'right' ? 4 : -4}px 0` : '0 -4px',
        }}
      >
        <div className="text-text-secondary ms-3 me-2 py-2 text-sm" role="note">
          {user?.email ?? localize('com_nav_user')}
        </div>
        <Menu.MenuSeparator className="bg-surface-hover -mx-1 my-1 h-px border-0" />
        <HelpSubmenu
          helpAndFaqURL={startupConfig?.helpAndFaqURL}
          termsOfServiceURL={termsOfServiceUrl}
          privacyPolicyURL={privacyPolicyUrl}
>>>>>>> upstream/main
          onShowShortcuts={() => setShowShortcutsDialog(true)}
        />
        <Menu.MenuItem onClick={() => setShowArchived(true)} className="select-item text-sm">
          <Archive className="icon-md" aria-hidden="true" />
          {localize('com_nav_archived_chats')}
        </Menu.MenuItem>
<<<<<<< HEAD
=======

        <Menu.MenuItem
          onClick={() => {
            /** The menu is gone by the time the dialog captures focus, so the
             *  account button has to be named here or focus returns to the
             *  document body when the dialog closes. */
            setFilesDialogTrigger(accountSettingsButtonRef);
            setShowFiles(true);
          }}
          className="select-item text-sm"
          data-testid="nav-files"
        >
          <Files className="icon-md" aria-hidden="true" />
          {localize('com_nav_my_files')}
        </Menu.MenuItem>
>>>>>>> upstream/main
        <Menu.MenuItem
          onClick={() => setShowSettings(true)}
          className="select-item text-sm"
          data-testid="nav-settings"
        >
          <GearIcon className="icon-md" aria-hidden="true" />
          {localize('com_nav_settings')}
        </Menu.MenuItem>
<<<<<<< HEAD
        <DropdownMenuSeparator />
        */}
        <NewJerseySelectItems />
        <Menu.MenuItem onClick={() => logout()} className="select-item text-sm">
          <svg
            className="usa-icon usa-icon--size-2"
            aria-hidden="true"
            focusable="false"
            role="img"
          >
            <use href={`${icons}#logout`} />
          </svg>
          {/* NJ: Use USWDS icon (to match the other icons in the menu)
          <LogOut className="icon-md" aria-hidden="true" />
           */}
=======
        <Menu.MenuSeparator className="bg-surface-hover -mx-1 my-1 h-px border-0" />
        <Menu.MenuItem onClick={() => logout()} className="select-item text-sm">
          <LogOut className="icon-md" aria-hidden="true" />
>>>>>>> upstream/main
          {localize('com_nav_log_out')}
        </Menu.MenuItem>
      </Menu.Menu>
      {showArchived && (
        <ArchivedChatsModal
          open={showArchived}
          onOpenChange={setShowArchived}
          triggerRef={accountSettingsButtonRef}
        />
      )}
<<<<<<< HEAD
      {showSettings && <Settings open={showSettings} onOpenChange={setShowSettings} />}
=======
>>>>>>> upstream/main
    </Menu.MenuProvider>
  );
}

export default memo(AccountSettings);
