import { useState, useEffect, useRef, useCallback, startTransition } from 'react';
import { Outlet } from 'react-router-dom';
import {
  PromptGroupsProvider,
  AssistantsMapContext,
  AgentsMapContext,
  SetConvoProvider,
  FileMapContext,
} from '~/Providers';
import {
  useSearchEnabled,
  useAssistantsMap,
  useAuthContext,
  useAgentsMap,
  useFileMap,
} from '~/hooks';
import { UnifiedSidebar, SIDEBAR_TRANSITION } from '~/components/UnifiedSidebar';
import KeyboardShortcutsDialog from '~/components/Nav/KeyboardShortcutsDialog';
import KeyboardDeleteDialog from '~/components/Nav/KeyboardDeleteDialog';
import { useUserTermsQuery, useGetStartupConfig } from '~/data-provider';
import useKeyboardShortcuts from '~/hooks/useKeyboardShortcuts';
import useSidebarState from '~/hooks/Nav/useSidebarState';
import { TermsAndConditionsModal } from '~/components/ui';
import useDrawerSwipe from '~/hooks/Nav/useDrawerSwipe';
import { useHealthCheck } from '~/data-provider';
import { Banner } from '~/components/Banners';
import store from '~/store';
import '@newjersey/feedback-widget/feedback-widget.min.js';
import SkipToContentLink from '~/nj/components/SkipToContentLink';

// NJ: Tells TypeScript that <feedback-widget> is a valid custom element.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'feedback-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

/** Isolates keyboard shortcut listeners so they only mount after auth. */
function KeyboardShortcutsProvider() {
  /* NJ: return early to disable keyboard shortcuts, which allow unsupported functionality (e.g. deleting chats). */
  return null;

  useKeyboardShortcuts();
  return (
    <>
      <KeyboardShortcutsDialog />
      <KeyboardDeleteDialog />
    </>
  );
}

export default function Root() {
  const [showTerms, setShowTerms] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);
  /** Shared with the drawer so the two agree on the breakpoint-transition frame. */
  const {
    isSmallScreen,
    expanded: sidebarExpanded,
    setExpanded: setSidebarExpanded,
  } = useSidebarState();
  const paneRef = useRef<HTMLDivElement>(null);
  /** Focus handoff lives in the drawer header's own expanded-effect — the
   * commit drives it, so every opener (button, swipe) is covered without a
   * timer racing the deferred state flip. */
  const handleDrawerOpenChange = useCallback(
    (next: boolean) => {
      startTransition(() => {
        setSidebarExpanded(next);
      });
    },
    [setSidebarExpanded],
  );
  const { isAuthenticated, logout } = useAuthContext();

  useDrawerSwipe({
    paneRef,
    /** Auth gates the whole tree below (`return null`), so the swipe surfaces
     * only exist once authenticated — enabling earlier would attach to
     * nothing and never re-run when they mount. */
    enabled: isSmallScreen && isAuthenticated,
    open: sidebarExpanded,
    onOpenChange: handleDrawerOpenChange,
  });

  useHealthCheck(isAuthenticated);

  const assistantsMap = useAssistantsMap({ isAuthenticated });
  const agentsMap = useAgentsMap({ isAuthenticated });
  const fileMap = useFileMap({ isAuthenticated });

  const { data: config } = useGetStartupConfig();
  const { data: termsData } = useUserTermsQuery({
    enabled: isAuthenticated && config?.interface?.termsOfService?.modalAcceptance === true,
  });

  useSearchEnabled(isAuthenticated);

  useEffect(() => {
    if (termsData) {
      setShowTerms(!termsData.termsAccepted);
    }
  }, [termsData]);

  const handleAcceptTerms = () => {
    setShowTerms(false);
  };

  const handleDeclineTerms = () => {
    setShowTerms(false);
    logout('/login?redirect=false');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SetConvoProvider>
      <FileMapContext.Provider value={fileMap}>
        <AssistantsMapContext.Provider value={assistantsMap}>
          <AgentsMapContext.Provider value={agentsMap}>
            <PromptGroupsProvider>
              {/* NJ: We added dynamic height measurement via CSS instead of setBannerHeight, required extra div */}
              <div className="flex h-dvh flex-col">
                <SkipToContentLink targetRef={paneRef} />
                <Banner onHeightChange={setBannerHeight} />
                <div className="flex min-h-0 flex-1">
                  <div className="relative z-0 flex h-full w-full overflow-hidden">
                    <UnifiedSidebar />
                    <div
                      ref={paneRef}
                      className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden"
                      tabIndex={-1}
                      style={{
                        /** Self-referential, so it needs no width literal and survives rotation. */transform:
                          isSmallScreen && sidebarExpanded
                            ? 'translateX(100%)'
                            : 'none',
                        transition: SIDEBAR_TRANSITION,
                      }}
                      inert={isSmallScreen && sidebarExpanded ? '' : undefined}
                    >
                      <Outlet />
                    </div>
                  </div>
                </div>
                {/* For small screens, the widget blocks too much content, so hide then */}
                <div className="hidden md:block">
                  <feedback-widget show-comment-disclaimer="false" skip-email-step="true" />
                </div>
              </div>
            </PromptGroupsProvider>
            <KeyboardShortcutsProvider />
          </AgentsMapContext.Provider>
          {config?.interface?.termsOfService?.modalAcceptance === true && (
            <TermsAndConditionsModal
              open={showTerms}
              onOpenChange={setShowTerms}
              onAccept={handleAcceptTerms}
              onDecline={handleDeclineTerms}
              title={config.interface.termsOfService.modalTitle}
              modalContent={config.interface.termsOfService.modalContent}
            />
          )}
        </AssistantsMapContext.Provider>
      </FileMapContext.Provider>
    </SetConvoProvider>
  );
}
