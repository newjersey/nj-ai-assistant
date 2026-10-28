import { useEffect, memo } from 'react';
import { usePanelRef } from 'react-resizable-panels';
import { ResizableHandleAlt, ResizablePanel } from '@librechat/client';
<<<<<<< HEAD
=======
import useDirection from '~/hooks/Nav/useDirection';
>>>>>>> upstream/main

interface ArtifactsPanelProps {
  panel: React.ReactNode | null;
  minSizeMain: string;
  shouldRender: boolean;
  onRenderChange: (shouldRender: boolean) => void;
<<<<<<< HEAD
=======
  /** Rendered before the messages panel (RTL), so the handle follows the panel. */
  reversed?: boolean;
>>>>>>> upstream/main
}

const ArtifactsPanel = memo(function ArtifactsPanel({
  panel,
  minSizeMain,
  shouldRender,
  onRenderChange,
<<<<<<< HEAD
}: ArtifactsPanelProps) {
  const artifactsPanelRef = usePanelRef();
=======
  reversed = false,
}: ArtifactsPanelProps) {
  const artifactsPanelRef = usePanelRef();
  const direction = useDirection();
>>>>>>> upstream/main

  useEffect(() => {
    if (panel != null) {
      onRenderChange(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          artifactsPanelRef.current?.expand();
        });
      });
    } else if (shouldRender) {
      onRenderChange(false);
    }
  }, [panel, shouldRender, onRenderChange, artifactsPanelRef]);

  if (!shouldRender) {
    return null;
  }

<<<<<<< HEAD
  return (
    <>
      {panel != null && (
        <ResizableHandleAlt withHandle className="bg-border-medium text-text-primary" />
      )}
=======
  const handle = panel != null && <ResizableHandleAlt withHandle className="text-text-primary" />;

  return (
    <>
      {!reversed && handle}
>>>>>>> upstream/main
      <ResizablePanel
        defaultSize="50"
        maxSize="70"
        collapsedSize="0"
        collapsible={true}
        minSize={minSizeMain}
        panelRef={artifactsPanelRef}
        id="artifacts-panel"
<<<<<<< HEAD
      >
        <div className="h-full min-w-[400px] overflow-hidden">{panel}</div>
      </ResizablePanel>
=======
        dir={direction}
      >
        <div className="h-full min-w-[min(25rem,100%)] overflow-hidden">{panel}</div>
      </ResizablePanel>
      {reversed && handle}
>>>>>>> upstream/main
    </>
  );
});

ArtifactsPanel.displayName = 'ArtifactsPanel';

export default ArtifactsPanel;
