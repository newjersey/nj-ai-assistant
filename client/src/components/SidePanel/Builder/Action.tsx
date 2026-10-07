import { useState } from 'react';
import { GearIcon } from '@librechat/client';
import type { Action } from 'librechat-data-provider';
import { cn } from '~/utils';

export default function Action({ action, onClick }: { action: Action; onClick: () => void }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
<<<<<<< HEAD
      className="group flex w-full rounded-lg border border-border-medium text-sm hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-text-primary"
=======
      className="group border-border-medium focus:ring-text-primary flex w-full rounded-lg border text-sm hover:cursor-pointer focus:ring-2 focus:outline-hidden"
>>>>>>> upstream/main
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-label={`Action for ${action.metadata.domain}`}
    >
      <div
<<<<<<< HEAD
        className="h-9 grow overflow-hidden text-ellipsis whitespace-nowrap px-3 py-2"
=======
        className="h-9 grow overflow-hidden px-3 py-2 text-ellipsis whitespace-nowrap"
>>>>>>> upstream/main
        style={{ wordBreak: 'break-all' }}
      >
        {action.metadata.domain}
      </div>
      <div
        className={cn(
<<<<<<< HEAD
          'h-9 w-9 min-w-9 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-surface-tertiary focus:outline-none focus:ring-2 focus:ring-text-primary group-focus:flex',
=======
          'hover:bg-surface-tertiary focus:ring-text-primary h-9 w-9 min-w-9 items-center justify-center rounded-lg transition-colors duration-200 group-focus:flex focus:ring-2 focus:outline-hidden',
>>>>>>> upstream/main
          isHovering ? 'flex' : 'hidden',
        )}
        aria-label="Settings"
      >
        <GearIcon className="icon-sm" aria-hidden="true" />
      </div>
    </div>
  );
}
