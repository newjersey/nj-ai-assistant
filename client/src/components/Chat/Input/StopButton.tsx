import { memo } from 'react';
<<<<<<< HEAD
import { composerSubmitClasses, TooltipAnchor } from '@librechat/client';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
=======
import { IconButton, TooltipAnchor } from '@librechat/client';
import { useLocalize } from '~/hooks';
>>>>>>> upstream/main

export default memo(function StopButton({
  stop,
  setShowStopButton,
<<<<<<< HEAD
}: {
  stop: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setShowStopButton: (value: boolean) => void;
=======
  canStop = true,
  hidden = false,
}: {
  stop: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setShowStopButton: (value: boolean) => void;
  /** False while the abort would be a no-op (the generation epoch is not
   *  installed yet). Hiding the button then would strand the user with a run
   *  they cannot stop, so stay visible and disabled instead. */
  canStop?: boolean;
  /** Kept mounted but out of the layout (and so out of the accessibility tree)
   *  while the during-run send button owns the slot. The stop shortcut looks
   *  for this control inside the focused form, so dropping it while the user
   *  types a steer is what made the shortcut reach into another pane or do
   *  nothing at all, which is exactly when a hard stop is wanted. */
  hidden?: boolean;
>>>>>>> upstream/main
}) {
  const localize = useLocalize();

  return (
    <TooltipAnchor
      description={localize('com_nav_stop_generating')}
      render={
<<<<<<< HEAD
        <button
          type="button"
          data-testid="stop-generation-button"
          // NJ: Blue square matching the NJ send button, no composerSubmitClasses()
          className={cn(
            'h-8 w-8 rounded-md bg-[#0076D6] text-text-primary outline-offset-4 transition-all duration-200 disabled:cursor-not-allowed disabled:text-text-secondary disabled:opacity-10',
            // NJ: The square stays 32px, so a transparent overlay carries the 44px thumb target
            "relative touch:before:absolute touch:before:-inset-1.5 touch:before:content-['']",
          )}
          aria-label={localize('com_nav_stop_generating')}
          onClick={(e) => {
=======
        <IconButton
          type="button"
          label={localize('com_nav_stop_generating')}
          variant="submit"
          size="theme"
          shape="composer"
          data-testid="stop-generation-button"
          hidden={hidden}
          disabled={!canStop}
          aria-label={localize('com_nav_stop_generating')}
          onClick={(e) => {
            if (!canStop) {
              return;
            }
>>>>>>> upstream/main
            setShowStopButton(false);
            stop(e);
          }}
        >
          <svg
<<<<<<< HEAD
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="icon-lg text-surface-primary"
          >
            <rect x="13" y="8" width="16" height="16" fill="currentColor" />
          </svg>
        </button>
=======
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
          >
            <rect x="7" y="7" width="10" height="10" rx="1.25" fill="currentColor"></rect>
          </svg>
        </IconButton>
>>>>>>> upstream/main
      }
    ></TooltipAnchor>
  );
});
