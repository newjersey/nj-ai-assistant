import { useState, memo } from 'react';
import { useDefaultLayout } from 'react-resizable-panels';
<<<<<<< HEAD
import { ResizablePanel, ResizablePanelGroup, useMediaQuery } from '@librechat/client';
=======
import { ResizablePanel, ResizablePanelGroup } from '@librechat/client';
import { ARTIFACTS_SHEET_MAX_WIDTH } from '~/utils/breakpoints';
import useScaledMaxWidth from '~/hooks/useScaledMaxWidth';
import useDirection from '~/hooks/Nav/useDirection';
>>>>>>> upstream/main
import ArtifactsPanel from './ArtifactsPanel';

const PANEL_IDS_SINGLE = ['messages-view'];
/** Keep the persisted id stable so existing artifact panel widths carry over. */
const PANEL_IDS_SPLIT = ['messages-view', 'artifacts-panel'];
<<<<<<< HEAD
=======
const PANEL_IDS_SPLIT_RTL = ['artifacts-panel', 'messages-view'];
>>>>>>> upstream/main

interface SidePanelProps {
  panel?: React.ReactNode;
  children: React.ReactNode;
}

const SidePanelGroup = memo(({ panel, children }: SidePanelProps) => {
  const [shouldRenderPanel, setShouldRenderPanel] = useState(panel != null);
<<<<<<< HEAD
  const isSmallScreen = useMediaQuery('(max-width: 767px)');

  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: 'side-panel-layout',
    panelIds: panel != null ? PANEL_IDS_SPLIT : PANEL_IDS_SINGLE,
=======
  const isSmallScreen = useScaledMaxWidth(ARTIFACTS_SHEET_MAX_WIDTH);
  /**
   * react-resizable-panels reads drag deltas and arrow keys physically (a
   * rightward drag always grows the first panel), so under RTL the group stays
   * LTR and the panels are rendered in reverse: the artifacts panel lands on
   * the inline-end side and every drag still moves the separator with the
   * pointer. Each panel restores the document direction for its content. The
   * library keys the saved layout by panel order, so RTL keeps its own widths.
   */
  const direction = useDirection();
  const reversed = direction === 'rtl';
  const splitIds = reversed ? PANEL_IDS_SPLIT_RTL : PANEL_IDS_SPLIT;

  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: 'side-panel-layout',
    panelIds: panel != null ? splitIds : PANEL_IDS_SINGLE,
>>>>>>> upstream/main
    storage: localStorage,
  });

  const minSizeMain = panel != null ? '15' : '30';

<<<<<<< HEAD
  return (
    <>
      <ResizablePanelGroup
        orientation="horizontal"
        defaultLayout={defaultLayout}
        onLayoutChanged={onLayoutChanged}
        className="relative flex-1 bg-presentation"
      >
        <ResizablePanel defaultSize="50" minSize={minSizeMain} id="messages-view">
          {children}
        </ResizablePanel>

        {!isSmallScreen && (
          <ArtifactsPanel
            panel={panel}
            minSizeMain={minSizeMain}
            shouldRender={shouldRenderPanel}
            onRenderChange={setShouldRenderPanel}
          />
        )}
      </ResizablePanelGroup>
=======
  const panels = [
    <ResizablePanel
      key="messages"
      defaultSize="50"
      minSize={minSizeMain}
      id="messages-view"
      dir={direction}
    >
      {children}
    </ResizablePanel>,
    !isSmallScreen && (
      <ArtifactsPanel
        key="artifacts"
        panel={panel}
        minSizeMain={minSizeMain}
        shouldRender={shouldRenderPanel}
        onRenderChange={setShouldRenderPanel}
        reversed={reversed}
      />
    ),
  ];

  return (
    <>
      {/* The surface behind the panels is this group's host, not the group
          primitive: the resizer owns its own chrome, and the caller owns the
          backdrop the panels sit on. */}
      <div className="relative min-w-0 flex-1">
        <ResizablePanelGroup
          orientation="horizontal"
          defaultLayout={defaultLayout}
          onLayoutChanged={onLayoutChanged}
          dir="ltr"
        >
          {reversed ? panels.reverse() : panels}
        </ResizablePanelGroup>
      </div>
>>>>>>> upstream/main
      {panel != null && isSmallScreen && <div className="fixed inset-0 z-[100]">{panel}</div>}
    </>
  );
});

SidePanelGroup.displayName = 'SidePanelGroup';

export default SidePanelGroup;
