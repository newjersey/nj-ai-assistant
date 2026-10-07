import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
<<<<<<< HEAD
import copy from 'copy-to-clipboard';
import * as Tabs from '@radix-ui/react-tabs';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { Button, Spinner, useMediaQuery, Radio } from '@librechat/client';
import { Code, Maximize2, Minimize2, Play, RefreshCw, X } from 'lucide-react';
import type { SandpackPreviewRef } from '@codesandbox/sandpack-react';
import type { ProcessedMermaidSvg } from '~/utils/diagram/export';
import { TOOL_ARTIFACT_TYPES, isCodeOnlyArtifact, isPreviewOnlyArtifact } from '~/utils/artifacts';
import { displayFilename } from '~/components/Chat/Messages/Content/Parts/attachmentTypes';
import CopyButton from '~/components/Messages/Content/CopyButton';
import { useShareContext, useMutationState } from '~/Providers';
import useArtifacts from '~/hooks/Artifacts/useArtifacts';
=======
import { useAtom } from 'jotai';
import copy from 'copy-to-clipboard';
import * as Tabs from '@radix-ui/react-tabs';
import { useSetRecoilState, useResetRecoilState } from 'recoil';
import { Button, Spinner, useMediaQuery, Radio, useToastContext } from '@librechat/client';
import {
  Code,
  Maximize2,
  Minimize2,
  PanelRight,
  PictureInPicture2,
  Play,
  RefreshCw,
  X,
} from 'lucide-react';
import type { SandpackPreviewRef } from '@codesandbox/sandpack-react';
import type { ProcessedMermaidSvg } from '~/utils/diagram/export';
import { TOOL_ARTIFACT_TYPES, isCodeOnlyArtifact, isPreviewOnlyArtifact } from '~/utils/artifacts';
import { copyWithinDocument, openUndockedWindow, prepareUndockedDocument } from './undockedWindow';
import { artifactsOpenedArtifactId, artifactsPaneFocusRequest, undockedArtifacts } from './state';
import { displayFilename } from '~/components/Chat/Messages/Content/Parts/attachmentTypes';
import { useArtifactsContext, useShareContext, useMutationState } from '~/Providers';
import CopyButton from '~/components/Messages/Content/CopyButton';
import { ARTIFACTS_SHEET_MAX_WIDTH } from '~/utils/breakpoints';
import useArtifacts from '~/hooks/Artifacts/useArtifacts';
import useScaledMaxWidth from '~/hooks/useScaledMaxWidth';
>>>>>>> upstream/main
import { useFocusTrap, useLocalize } from '~/hooks';
import DownloadArtifact from './DownloadArtifact';
import ArtifactVersion from './ArtifactVersion';
import MermaidExport from './Mermaid/Export';
import ArtifactTabs from './ArtifactTabs';
import { cn, logger } from '~/utils';
import store from '~/store';

const MAX_BLUR_AMOUNT = 32;
const MAX_BACKDROP_OPACITY = 0.3;

export default function Artifacts() {
  const localize = useLocalize();
  const { isMutating } = useMutationState();
  const { isSharedConvo } = useShareContext();
<<<<<<< HEAD
  const isMobile = useMediaQuery('(max-width: 868px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const previewRef = useRef<SandpackPreviewRef>();
  const artifactContainerRef = useRef<HTMLDivElement>(null);
  const fullscreenPortalRef = useRef<HTMLDivElement>(null);
=======
  /* A deployment can keep the docked pane: the host resolves
   * `interface.artifactUndocking` and passes the answer in. */
  const { canUndock } = useArtifactsContext();
  const [detached, setDetached] = useAtom(undockedArtifacts);
  const [paneFocusRequest, setPaneFocusRequest] = useAtom(artifactsPaneFocusRequest);
  const isUndocked = detached != null;
  const undockButtonRef = useRef<HTMLButtonElement>(null);
  /* The undocked window is its own viewport: the host's width says nothing
   * about it, and a bottom sheet — backdrop, drag handle, no dock action — is
   * not what a window wants to be. */
  const isMobile = useScaledMaxWidth(ARTIFACTS_SHEET_MAX_WIDTH) && !isUndocked;
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const previewRef = useRef<SandpackPreviewRef>();
  const artifactContainerRef = useRef<HTMLDivElement>(null);
  const [fullscreenPortal, setFullscreenPortal] = useState<HTMLDivElement | null>(null);
>>>>>>> upstream/main
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
<<<<<<< HEAD
=======
  const [fullscreenEnabled, setFullscreenEnabled] = useState(
    typeof document === 'undefined' ? false : document.fullscreenEnabled,
  );
>>>>>>> upstream/main
  const [isMounted, setIsMounted] = useState(false);
  const [height, setHeight] = useState(90);
  const [isDragging, setIsDragging] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [mermaidExportState, setMermaidExportState] = useState<{
    artifactId: string;
    data: ProcessedMermaidSvg | null;
  } | null>(null);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(90);
  const setArtifactsVisible = useSetRecoilState(store.artifactsVisibility);
  const resetCurrentArtifactId = useResetRecoilState(store.currentArtifactId);
<<<<<<< HEAD
=======
  const { showToast } = useToastContext();
  /* Radix portals default to the host document's body, which is the wrong
   * window once undocked — and the wrong stacking context in fullscreen. */
  const overlayPortal = isFullscreen || isUndocked ? (fullscreenPortal ?? undefined) : undefined;
>>>>>>> upstream/main

  const allTabOptions = useMemo(
    () => [
      {
        value: 'code',
        label: localize('com_ui_code'),
        icon: <Code className="size-4" />,
      },
      {
        value: 'preview',
        label: localize('com_ui_preview'),
        icon: <Play className="size-4" />,
      },
    ],
    [localize],
  );

  useEffect(() => {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement && activeElement !== document.body) {
      openerRef.current = activeElement;
    }
    setIsMounted(true);
    const delay = isMobile ? 50 : 30;
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => {
      clearTimeout(timer);
      setIsMounted(false);
    };
  }, [isMobile]);

<<<<<<< HEAD
  useEffect(() => {
    const handleFullscreenChange = () => {
      const container = artifactContainerRef.current;
      setIsFullscreen(container !== null && document.fullscreenElement === container);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
=======
  /* Undocked, the pane lives in the popup's document: its fullscreen element
   * and its change events belong to that document, not the host's. The
   * container only exists once mounted, hence the dependency. */
  useEffect(() => {
    const ownerDocument = artifactContainerRef.current?.ownerDocument ?? document;
    setFullscreenEnabled(ownerDocument.fullscreenEnabled);
    const handleFullscreenChange = () => {
      const container = artifactContainerRef.current;
      setIsFullscreen(container !== null && ownerDocument.fullscreenElement === container);
    };

    ownerDocument.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => ownerDocument.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isMounted]);
>>>>>>> upstream/main

  useEffect(() => {
    if (!isMobile) {
      setBlurAmount(0);
      return;
    }

    const minHeightForBlur = 50;
    const maxHeightForBlur = 100;

    if (height <= minHeightForBlur) {
      setBlurAmount(0);
    } else if (height >= maxHeightForBlur) {
      setBlurAmount(MAX_BLUR_AMOUNT);
    } else {
      const progress = (height - minHeightForBlur) / (maxHeightForBlur - minHeightForBlur);
      setBlurAmount(Math.round(progress * MAX_BLUR_AMOUNT));
    }
  }, [height, isMobile]);

  const {
    activeTab,
    setActiveTab,
    currentIndex,
    currentArtifact,
    orderedArtifactIds,
    setCurrentArtifactId,
  } = useArtifacts();

  const restoreArtifactTriggerFocus = useCallback(() => {
    const opener = openerRef.current;
    const artifactId = currentArtifact?.id;
    requestAnimationFrame(() => {
      if (opener?.isConnected) {
        opener.focus();
        return;
      }

      const trigger = Array.from(
        document.querySelectorAll<HTMLElement>('[data-artifact-trigger]'),
      ).find((element) => element.dataset.artifactTrigger === artifactId);
      trigger?.focus();
    });
  }, [currentArtifact?.id]);

  const handleMermaidExportReady = useCallback(
    (data: ProcessedMermaidSvg | null) => {
      if (currentArtifact?.id == null) {
        return;
      }
      setMermaidExportState({ artifactId: currentArtifact.id, data });
    },
    [currentArtifact?.id],
  );

  const mermaidExportData =
    mermaidExportState != null && mermaidExportState.artifactId === currentArtifact?.id
      ? mermaidExportState.data
      : null;
  const isMermaidArtifact = currentArtifact?.type === TOOL_ARTIFACT_TYPES.MERMAID;

  const closeArtifacts = useCallback(() => {
    if (isMobile) {
      setIsClosing(true);
      setIsVisible(false);
      const finishClose = () => {
        resetCurrentArtifactId();
        setArtifactsVisible(false);
        setIsClosing(false);
        setHeight(90);
        restoreArtifactTriggerFocus();
      };
      if (prefersReducedMotion) {
        finishClose();
      } else {
        setTimeout(finishClose, 250);
      }
      return;
    }

    resetCurrentArtifactId();
    setArtifactsVisible(false);
    restoreArtifactTriggerFocus();
  }, [
    isMobile,
    prefersReducedMotion,
    resetCurrentArtifactId,
    restoreArtifactTriggerFocus,
    setArtifactsVisible,
  ]);

<<<<<<< HEAD
=======
  const toggleUndock = useCallback(() => {
    if (isUndocked) {
      /* This button goes away with its window; the docked pane picks focus up. */
      setPaneFocusRequest(true);
      setDetached(null);
      return;
    }
    /* Opened straight from the click: popup permission follows user activation,
     * and an effect would spend it. The container is prepared here too, so the
     * pane can render into it on the very commit this state change causes —
     * a commit with the pane unmounted would reset the artifact registry. */
    const opened = openUndockedWindow(window);
    if (opened == null) {
      showToast({ status: 'error', message: localize('com_ui_undock_artifacts_blocked') });
      return;
    }
    /* The same handoff the other way: the control the user pressed goes away
     * with the docked toolbar, so focus follows the pane into the window it
     * just opened instead of being left on that window's empty document. */
    setPaneFocusRequest(true);
    setDetached({ window: opened, root: prepareUndockedDocument(document, opened.document) });
  }, [isUndocked, localize, setDetached, setPaneFocusRequest, showToast]);

  /* Moving the pane replaces one toolbar with the other: move focus to the
   * control that took the place of the one the user just pressed. The control
   * only exists once the pane has mounted, hence the dependency. */
  useEffect(() => {
    if (!paneFocusRequest || !isMounted) {
      return;
    }
    const control = undockButtonRef.current;
    if (control == null) {
      return;
    }
    control.focus();
    setPaneFocusRequest(false);
  }, [paneFocusRequest, isMounted, setPaneFocusRequest]);

>>>>>>> upstream/main
  useFocusTrap(panelRef, isMobile && isVisible && !isClosing, closeArtifacts);

  /* Office artifacts have no source view, and source-code artifacts have
   * no useful rendered preview. Filter each down to the only meaningful
   * tab and label that tab with the file name instead of generic
   * "Code" / "Preview" choices. */
  const isPreviewOnly = isPreviewOnlyArtifact(currentArtifact?.type);
  const isCodeOnly = isCodeOnlyArtifact(currentArtifact?.type);
  let constrainedTab: 'preview' | 'code' | null = null;
  if (isPreviewOnly) {
    constrainedTab = 'preview';
  } else if (isCodeOnly) {
    constrainedTab = 'code';
  }
  const displayedTab = constrainedTab ?? activeTab;
  const tabOptions = useMemo(() => {
    if (constrainedTab == null) {
      return allTabOptions;
    }
    const filename = displayFilename(currentArtifact?.title);
    const tab = allTabOptions.find((opt) => opt.value === constrainedTab);
    if (!tab) {
      return allTabOptions;
    }
    return [filename ? { ...tab, label: filename } : tab];
  }, [allTabOptions, constrainedTab, currentArtifact?.title]);
  /* The panel keeps one `activeTab`, but a trigger row promises what
   * opening *that* artifact does. Writing a constrained tab back into the
   * shared state leaked it to the next artifact — after a `.py` (code-only)
   * every preview-capable row opened on Code while announcing a rendered
   * preview — so the tab is reset per artifact instead, and a manual choice
<<<<<<< HEAD
   * survives only while that artifact stays open. */
  const openedArtifactRef = useRef<string | null>(null);
  useEffect(() => {
    const openedId = currentArtifact?.id ?? null;
    if (openedId === openedArtifactRef.current) {
      return;
    }
    openedArtifactRef.current = openedId;
    if (openedId != null && constrainedTab == null && activeTab !== 'preview') {
      setActiveTab('preview');
    }
  }, [activeTab, constrainedTab, currentArtifact?.id, setActiveTab]);

  const handleCopyArtifact = useCallback(() => {
=======
   * survives only while that artifact stays open. The marker is pane state
   * for the same reason the tab is: changing host remounts the pane, and an
   * instance ref would start empty and reset the tab of the artifact already
   * on screen. */
  const [openedArtifactId, setOpenedArtifactId] = useAtom(artifactsOpenedArtifactId);
  useEffect(() => {
    const openedId = currentArtifact?.id ?? null;
    if (openedId === openedArtifactId) {
      return;
    }
    setOpenedArtifactId(openedId);
    if (openedId != null && constrainedTab == null && activeTab !== 'preview') {
      setActiveTab('preview');
    }
  }, [
    activeTab,
    constrainedTab,
    currentArtifact?.id,
    openedArtifactId,
    setActiveTab,
    setOpenedArtifactId,
  ]);

  const handleCopyArtifact = useCallback(async () => {
>>>>>>> upstream/main
    const content = currentArtifact?.content ?? '';
    if (!content) {
      return;
    }
<<<<<<< HEAD
    copy(content, { format: 'text/plain' });
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  }, [currentArtifact?.content]);
=======
    /* Both clipboard paths have to act on the document the user is looking at:
     * `copy-to-clipboard` drives `execCommand` on the host document, which is
     * in the background while the undocked window has focus, and an unfocused
     * document copies nothing. Success is claimed only once a write lands. */
    const paneDocument = isUndocked ? panelRef.current?.ownerDocument : undefined;
    let copied = false;
    const clipboard = paneDocument?.defaultView?.navigator.clipboard;
    if (clipboard != null) {
      try {
        await clipboard.writeText(content);
        copied = true;
      } catch (error) {
        logger.error('Failed to copy the artifact through the clipboard API:', error);
      }
    }
    if (!copied && paneDocument != null) {
      /* No Clipboard API — a non-secure deployment — so fall back to the
       * selection dance, run in the pane's document rather than the host's. */
      copied = copyWithinDocument(paneDocument, content);
    }
    if (!copied && paneDocument == null) {
      copied = copy(content, { format: 'text/plain' });
    }

    if (!copied) {
      showToast({ status: 'error', message: localize('com_ui_copy_failed') });
      return;
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  }, [currentArtifact?.content, isUndocked, localize, showToast]);
>>>>>>> upstream/main

  const handleDragStart = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartHeight.current = height;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!isDragging) {
      return;
    }

    const deltaY = dragStartY.current - e.clientY;
    const viewportHeight = window.innerHeight;
    const deltaPercentage = (deltaY / viewportHeight) * 100;
    const newHeight = Math.max(10, Math.min(100, dragStartHeight.current + deltaPercentage));

    setHeight(newHeight);
  };

  const handleDragEnd = (e: React.PointerEvent) => {
    if (!isDragging) {
      return;
    }

    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    // Snap to positions based on final height
    if (height < 30) {
      closeArtifacts();
    } else if (height > 95) {
      setHeight(100);
    } else if (height < 60) {
      setHeight(50);
    } else {
      setHeight(90);
    }
  };

  const handleDragKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let nextHeight = height;
    if (e.key === 'ArrowUp') {
      nextHeight = Math.min(100, height + 10);
    } else if (e.key === 'ArrowDown') {
      nextHeight = Math.max(10, height - 10);
    } else if (e.key === 'Home') {
      nextHeight = 10;
    } else if (e.key === 'End') {
      nextHeight = 100;
    } else {
      return;
    }

    e.preventDefault();
    setHeight(nextHeight);
  };

  if (!currentArtifact || !isMounted) {
    return null;
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    const client = previewRef.current?.getClient();
    if (client) {
      client.dispatch({ type: 'refresh' });
    }
    setTimeout(() => setIsRefreshing(false), 750);
  };

  const handleFullscreen = async () => {
    const container = artifactContainerRef.current;
    if (!container) {
      return;
    }

<<<<<<< HEAD
    try {
      if (document.fullscreenElement === container) {
        await document.exitFullscreen();
=======
    /* Undocked, the pane's fullscreen element and `exitFullscreen` belong to
     * the popup's document; the host's would never match, so the minimize
     * action would request fullscreen again instead of leaving it. */
    const ownerDocument = container.ownerDocument;
    try {
      if (ownerDocument.fullscreenElement === container) {
        await ownerDocument.exitFullscreen();
>>>>>>> upstream/main
        return;
      }
      await container.requestFullscreen();
    } catch (error) {
      logger.error('Failed to toggle artifact fullscreen mode:', error);
    }
  };

  const backdropOpacity =
    blurAmount > 0
      ? (Math.min(blurAmount, MAX_BLUR_AMOUNT) / MAX_BLUR_AMOUNT) * MAX_BACKDROP_OPACITY
      : 0;

  return (
    <Tabs.Root value={displayedTab} onValueChange={setActiveTab} asChild>
<<<<<<< HEAD
      <div ref={artifactContainerRef} className="flex h-full w-full flex-col bg-surface-primary">
=======
      <div ref={artifactContainerRef} className="bg-surface-primary flex h-full w-full flex-col">
>>>>>>> upstream/main
        {/* Mobile backdrop with dynamic blur */}
        {isMobile && (
          <div
            className={cn(
<<<<<<< HEAD
              'fixed inset-0 z-[99] bg-black will-change-[opacity,backdrop-filter] motion-reduce:transition-none',
=======
              'bg-surface-overlay fixed inset-0 z-[99] will-change-[opacity,backdrop-filter] motion-reduce:transition-none',
>>>>>>> upstream/main
              isVisible && !isClosing
                ? 'transition-all duration-300'
                : 'pointer-events-none opacity-0 backdrop-blur-none transition-opacity duration-150',
              blurAmount < 8 && isVisible && !isClosing ? 'pointer-events-none' : '',
            )}
            style={{
              opacity: isVisible && !isClosing ? backdropOpacity : 0,
              backdropFilter: isVisible && !isClosing ? `blur(${blurAmount}px)` : 'none',
              WebkitBackdropFilter: isVisible && !isClosing ? `blur(${blurAmount}px)` : 'none',
            }}
            onClick={blurAmount >= 8 ? closeArtifacts : undefined}
            aria-hidden="true"
          />
        )}
        <div
          ref={panelRef}
          id="artifact-viewer"
          role={isMobile ? 'dialog' : 'region'}
          aria-modal={isMobile || undefined}
          aria-label={currentArtifact.title ?? localize('com_ui_artifacts')}
          className={cn(
<<<<<<< HEAD
            'flex w-full flex-col bg-surface-primary text-xl text-text-primary motion-reduce:transition-none',
=======
            'bg-surface-primary text-text-primary flex w-full flex-col text-xl motion-reduce:transition-none',
>>>>>>> upstream/main
            isMobile
              ? cn(
                  'fixed z-[100] shadow-[0_-10px_60px_rgba(0,0,0,0.35)]',
                  isFullscreen ? 'inset-0 rounded-none' : 'inset-x-0 bottom-0 rounded-t-[20px]',
                  isVisible && !isClosing
                    ? 'translate-y-0 opacity-100'
<<<<<<< HEAD
                    : 'duration-250 translate-y-full opacity-0 transition-all',
=======
                    : 'translate-y-full opacity-0 transition-all',
>>>>>>> upstream/main
                  isDragging ? '' : 'transition-all duration-300',
                )
              : cn(
                  'h-full shadow-2xl',
                  isVisible && !isClosing
<<<<<<< HEAD
                    ? 'duration-350 translate-x-0 opacity-100 transition-all'
=======
                    ? 'translate-x-0 opacity-100 transition-all duration-150'
>>>>>>> upstream/main
                    : 'translate-x-5 opacity-0 transition-all duration-300',
                ),
          )}
          style={
            isMobile ? { height: isFullscreen ? '100%' : `${height}vh` } : { overflow: 'hidden' }
          }
        >
          {isMobile && !isFullscreen && (
            <div
              role="separator"
              tabIndex={0}
              aria-label={localize('com_ui_resize_artifact_panel')}
              aria-orientation="horizontal"
              aria-valuemin={10}
              aria-valuemax={100}
              aria-valuenow={Math.round(height)}
<<<<<<< HEAD
              className="flex flex-shrink-0 cursor-grab items-center justify-center bg-surface-primary-alt pb-1.5 pt-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-heavy active:cursor-grabbing"
=======
              className="bg-surface-primary-alt focus-visible:ring-focus-subtle flex shrink-0 cursor-grab items-center justify-center pt-2.5 pb-1.5 focus-visible:ring-2 focus-visible:outline-hidden focus-visible:ring-inset active:cursor-grabbing"
>>>>>>> upstream/main
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
              onKeyDown={handleDragKeyDown}
            >
<<<<<<< HEAD
              <div className="h-1 w-12 rounded-full bg-border-xheavy opacity-40 transition-all duration-200 active:opacity-60 high-contrast:opacity-100 motion-reduce:transition-none" />
=======
              <div className="bg-border-xheavy high-contrast:opacity-100 h-1 w-12 rounded-full opacity-40 transition-all duration-200 active:opacity-60 motion-reduce:transition-none" />
>>>>>>> upstream/main
            </div>
          )}

          {/* Header */}
          <div
            className={cn(
<<<<<<< HEAD
              'flex h-[52px] flex-shrink-0 items-center justify-between gap-2 border-b border-border-light bg-surface-primary-alt p-2 transition-all duration-300 motion-reduce:transition-none',
=======
              'border-border-light bg-surface-primary-alt flex h-[3.25rem] shrink-0 items-center justify-between gap-2 border-b p-2 transition-all duration-300 motion-reduce:transition-none',
>>>>>>> upstream/main
              isMobile ? 'justify-center' : 'overflow-hidden',
            )}
          >
            {!isMobile && (
              <div
                className={cn(
                  'flex items-center transition-all duration-500 motion-reduce:transition-none',
                  isVisible && !isClosing
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-2 opacity-0',
                )}
              >
                <Radio
                  options={tabOptions}
                  value={displayedTab}
                  onChange={setActiveTab}
                  disabled={isMutating && displayedTab !== 'code'}
                  buttonClassName="h-9 px-3 gap-1.5"
                />
              </div>
            )}

            <div
              className={cn(
                'flex items-center gap-2 transition-all duration-500 motion-reduce:transition-none',
                isMobile ? 'min-w-max' : '',
                isVisible && !isClosing ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0',
              )}
            >
              {/* Refresh drives the Sandpack preview client; the Mermaid
                  renderer has no such client and offers its own retry, so the
                  action would spin over an unchanged diagram. */}
              {displayedTab === 'preview' && !isMermaidArtifact && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  aria-label={localize('com_ui_refresh')}
                >
                  {isRefreshing ? (
<<<<<<< HEAD
                    <Spinner size={16} />
                  ) : (
                    <RefreshCw
                      size={16}
                      className="transition-transform duration-200 motion-reduce:transition-none"
=======
                    <Spinner className="m-auto size-4" />
                  ) : (
                    <RefreshCw
                      className="size-4 transition-transform duration-200 motion-reduce:transition-none"
>>>>>>> upstream/main
                      aria-hidden="true"
                    />
                  )}
                </Button>
              )}
<<<<<<< HEAD
              {(displayedTab === 'preview' || isFullscreen) && document.fullscreenEnabled && (
=======
              {(displayedTab === 'preview' || isFullscreen) && fullscreenEnabled && (
>>>>>>> upstream/main
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9"
                  onClick={handleFullscreen}
                  aria-label={localize(
                    isFullscreen ? 'com_ui_exit_full_screen' : 'com_ui_enter_full_screen',
                  )}
                >
                  {isFullscreen ? (
<<<<<<< HEAD
                    <Minimize2 size={16} aria-hidden="true" />
                  ) : (
                    <Maximize2 size={16} aria-hidden="true" />
=======
                    <Minimize2 className="size-4" aria-hidden="true" />
                  ) : (
                    <Maximize2 className="size-4" aria-hidden="true" />
>>>>>>> upstream/main
                  )}
                </Button>
              )}
              {displayedTab !== 'preview' && isMutating && (
<<<<<<< HEAD
                <RefreshCw size={16} className="animate-spin text-text-secondary" />
=======
                <RefreshCw className="text-text-secondary size-4 animate-spin" />
>>>>>>> upstream/main
              )}
              {orderedArtifactIds.length > 1 && (
                <ArtifactVersion
                  currentIndex={currentIndex}
                  totalVersions={orderedArtifactIds.length}
<<<<<<< HEAD
                  portalElement={isFullscreen ? fullscreenPortalRef.current : undefined}
=======
                  portalElement={overlayPortal}
>>>>>>> upstream/main
                  onVersionChange={(index) => {
                    const target = orderedArtifactIds[index];
                    if (target) {
                      setCurrentArtifactId(target);
                    }
                  }}
                />
              )}
              <CopyButton
                isCopied={isCopied}
                iconOnly
<<<<<<< HEAD
                portalElement={isFullscreen ? fullscreenPortalRef.current : undefined}
=======
                portalElement={overlayPortal}
>>>>>>> upstream/main
                onClick={handleCopyArtifact}
              />
              {/* Mermaid diagrams route every download through the export
                  menu — SVG, PNG and the source — so the generic button does
                  not sit beside it offering a fourth, unlabelled option. */}
              {isMermaidArtifact ? (
                <MermaidExport
                  artifact={currentArtifact}
                  exportData={mermaidExportData}
<<<<<<< HEAD
                  portalElement={isFullscreen ? fullscreenPortalRef.current : undefined}
=======
                  portalElement={overlayPortal}
>>>>>>> upstream/main
                />
              ) : (
                <DownloadArtifact artifact={currentArtifact} />
              )}
<<<<<<< HEAD
=======
              {/* A capability that turns off while the pane is out there must
                  not take away the only way back, so an undocked pane always
                  keeps the control that docks it. */}
              {!isMobile && (canUndock || isUndocked) && (
                <Button
                  ref={undockButtonRef}
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9"
                  onClick={toggleUndock}
                  aria-label={localize(
                    isUndocked ? 'com_ui_dock_artifacts' : 'com_ui_undock_artifacts',
                  )}
                >
                  {isUndocked ? (
                    <PanelRight className="size-4" aria-hidden="true" />
                  ) : (
                    <PictureInPicture2 className="size-4" aria-hidden="true" />
                  )}
                </Button>
              )}
>>>>>>> upstream/main
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9"
                onClick={closeArtifacts}
                aria-label={localize('com_ui_close')}
              >
<<<<<<< HEAD
                <X size={16} aria-hidden="true" />
=======
                <X className="size-4" aria-hidden="true" />
>>>>>>> upstream/main
              </Button>
            </div>
          </div>

<<<<<<< HEAD
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-surface-primary">
=======
          <div className="bg-surface-primary relative flex min-h-0 flex-1 flex-col overflow-hidden">
>>>>>>> upstream/main
            <div className="absolute inset-0 flex flex-col">
              <ArtifactTabs
                artifact={currentArtifact}
                previewRef={previewRef as React.MutableRefObject<SandpackPreviewRef>}
                isSharedConvo={isSharedConvo}
                onMermaidExportReady={handleMermaidExportReady}
              />
            </div>

            <div
              className={cn(
<<<<<<< HEAD
                'absolute inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out',
=======
                'bg-surface-media-overlay/70 text-text-on-media absolute inset-0 z-[60] flex items-center justify-center backdrop-blur-xs transition-opacity duration-300 ease-in-out',
>>>>>>> upstream/main
                isRefreshing ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
              )}
              aria-hidden={!isRefreshing}
              role="status"
            >
              <div
                className={cn(
                  'transition-transform duration-300 ease-in-out',
                  isRefreshing ? 'scale-100' : 'scale-95',
                )}
              >
<<<<<<< HEAD
                <Spinner size={24} />
=======
                <Spinner className="m-auto size-6" />
>>>>>>> upstream/main
              </div>
            </div>
          </div>

          {isMobile && (
<<<<<<< HEAD
            <div className="flex-shrink-0 border-t border-border-light bg-surface-primary-alt p-2">
=======
            <div className="border-border-light bg-surface-primary-alt shrink-0 border-t p-2">
>>>>>>> upstream/main
              <Radio
                fullWidth
                options={tabOptions}
                value={displayedTab}
                onChange={setActiveTab}
                disabled={isMutating && displayedTab !== 'code'}
              />
            </div>
          )}
        </div>
        <div
<<<<<<< HEAD
          ref={fullscreenPortalRef}
=======
          ref={setFullscreenPortal}
>>>>>>> upstream/main
          className="z-[101]"
          data-testid="artifact-fullscreen-portal"
        />
      </div>
    </Tabs.Root>
  );
}
