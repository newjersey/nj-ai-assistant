import { memo } from 'react';
import type { NavLink } from '~/common';
import SidePanelNav from '~/components/SidePanel/Nav';
import ExpandedPanel from './ExpandedPanel';
import { cn } from '~/utils';

function Sidebar({
  links,
  expanded,
  width,
  minWidth,
  maxWidth,
  onCollapse,
  onExpand,
  onLeaveInsights,
<<<<<<< HEAD
=======
  switchToHistory,
>>>>>>> upstream/main
  onResizeStart,
  onResizeKeyboard,
}: {
  links: NavLink[];
  expanded: boolean;
  width: number;
  minWidth: number;
  maxWidth: number;
  onCollapse: () => void;
  onExpand: () => void;
  onLeaveInsights: () => void;
<<<<<<< HEAD
=======
  switchToHistory: boolean;
>>>>>>> upstream/main
  onResizeStart: (e: React.MouseEvent) => void;
  onResizeKeyboard: (direction: 'shrink' | 'grow') => void;
}) {
  return (
    <>
      <div className="flex h-full w-full overflow-hidden">
        <ExpandedPanel
          links={links}
          expanded={expanded}
          onCollapse={onCollapse}
          onExpand={onExpand}
          onLeaveInsights={onLeaveInsights}
<<<<<<< HEAD
=======
          switchToHistory={switchToHistory}
>>>>>>> upstream/main
        />
        <nav
          className={cn(
            /** The resize separator to the right is transparent until hovered, so
<<<<<<< HEAD
             *  the panel has no resting right edge. That is deliberate in the
             *  standard themes, where `surface-primary-alt` carries the boundary
             *  on its own; in high contrast both sides are the same pure white or
             *  pure black, so the edge has to be drawn. */
            'min-h-0 flex-1 overflow-hidden bg-surface-primary-alt high-contrast:border-r high-contrast:border-border-light',
=======
             *  the edge is drawn here. The panel and the content beside it now sit
             *  on the same surface, so the fill no longer separates them on its
             *  own and the boundary has to be a line in every theme. */
            'border-border-light bg-surface-primary-alt min-h-0 flex-1 overflow-hidden border-r',
>>>>>>> upstream/main
            expanded ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
          style={{ transition: expanded ? 'opacity 200ms ease 80ms' : 'opacity 150ms ease' }}
          aria-hidden={!expanded}
        >
          <SidePanelNav links={links} />
        </nav>
      </div>
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
        aria-valuenow={Math.round(width)}
        aria-valuemin={Math.round(minWidth)}
        aria-valuemax={Math.round(maxWidth)}
        tabIndex={expanded ? 0 : -1}
        className={cn(
<<<<<<< HEAD
          'absolute right-0 top-0 z-10 h-full w-1 cursor-col-resize transition-colors hover:bg-border-medium active:bg-border-heavy',
=======
          'hover:bg-border-medium active:bg-border-heavy absolute top-0 right-0 z-10 h-full w-1 cursor-col-resize transition-colors',
>>>>>>> upstream/main
          expanded ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        style={{ transition: expanded ? 'opacity 200ms ease 80ms' : 'opacity 150ms ease' }}
        onMouseDown={onResizeStart}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            onResizeKeyboard('shrink');
          } else if (e.key === 'ArrowRight') {
            onResizeKeyboard('grow');
          }
        }}
      />
    </>
  );
}

export default memo(Sidebar);
