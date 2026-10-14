<<<<<<< HEAD
import React, { forwardRef, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useWatch } from 'react-hook-form';
import { Zap, Clock, OctagonPause, ZapOff } from 'lucide-react';
=======
import React, { forwardRef, useMemo, useRef } from 'react';
import { useWatch } from 'react-hook-form';
import { Zap, Clock, ZapOff } from 'lucide-react';
>>>>>>> upstream/main
import { composerSubmitClasses, SendActions, SendIcon } from '@librechat/client';
import type { SendAction } from '@librechat/client';
import type { Control } from 'react-hook-form';
import type { ComposerKeyContext, KeyChordSource } from '~/utils/shortcuts';
import type { SteeringControls } from '~/hooks/Chat/useSteering';
import { isMacPlatform, resolveComposerKeyDown } from '~/utils/shortcuts';
import useComposerBindings from '~/hooks/Input/useComposerBindings';
import { useLocalize } from '~/hooks';
<<<<<<< HEAD
import store from '~/store';
=======
>>>>>>> upstream/main

/** The rows, the popover and the chord chips are shared with every other chat
 *  surface that can submit more than one way — see `SendActions`. */
type ActionRow = SendAction;

<<<<<<< HEAD
type DuringRunSendButtonProps = {
  control: Control<{ text: string }>;
  steering: SteeringControls;
=======
const ACTION_LABELS = {
  steer: 'com_ui_steer_send',
  interrupt: 'com_ui_interrupt_steer',
  queue: 'com_ui_queue_send',
} as const;

type DuringRunSendButtonProps = {
  control: Control<{ text: string }>;
  steering: SteeringControls;
  isNewConversation: boolean;
>>>>>>> upstream/main
  getText: () => string;
  onConsumed: () => void;
  /** External hold (e.g. uploads in flight), mirroring the normal send button. */
  disabled?: boolean;
<<<<<<< HEAD
};

/**
 * The send button while a run is generating: it takes over the send/stop slot
 * (and `submitButtonRef`, so Enter's synthetic click routes here) whenever the
 * composer holds text — submitting steers or queues per the effective action.
 * Hovering it reveals the full action list with its shortcuts: steer, queue
 * (⌘/Ctrl+Enter routes to the non-default action), interrupt & steer
 * (⌘/Ctrl+Shift+Enter — stops writing now but keeps what is written), and
 * interrupt & send (⌥/Alt+Enter — discards the answer and starts over).
 * Clearing the composer restores the Stop button.
 */
const DuringRunSendButton = React.memo(
  forwardRef((props: DuringRunSendButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const localize = useLocalize();
    const steerInterruptsByDefault = useRecoilValue(store.steerInterruptsByDefault);
    const enterToSend = useRecoilValue(store.enterToSend);
    const { shortcutsEnabled, submitOverride, yieldedChords } = useComposerBindings();
    const { steering } = props;
=======
  /** Host-owned: whether Enter sends, so the rows advertise what the key handler does. */
  enterToSend: boolean;
};

/** The active mode owns submission; the menu overrides it for one message. */
const DuringRunSendButton = React.memo(
  forwardRef((props: DuringRunSendButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const localize = useLocalize();
    const { shortcutsEnabled, submitOverride, yieldedChords } = useComposerBindings();
    const { steering, enterToSend } = props;
    const disabledRef = useRef(props.disabled);
    disabledRef.current = props.disabled;
>>>>>>> upstream/main
    const data = useWatch({ control: props.control });
    const content = data?.text?.trim();
    const primary = steering.effectiveAction;
    const modEnter = isMacPlatform ? '⌘⏎' : 'Ctrl ⏎';
    const altEnter = isMacPlatform ? '⌥⏎' : 'Alt ⏎';
    const modShiftEnter = isMacPlatform ? '⌘⇧⏎' : 'Ctrl ⇧ ⏎';

    /**
     * What each canonical chord actually does right now, asked of the same
     * decision table the composer executes. A hint only appears on a row its
     * chord still triggers: a chord rebound to a global shortcut (or claimed
     * by a rebound submit) is dropped rather than advertised on a row it no
     * longer reaches, and with Enter-to-send off, plain Enter inserts a
     * newline during a run, so ⌘/Ctrl+Enter carries the default action.
     */
    const verdicts = useMemo(() => {
      const ctx: ComposerKeyContext = {
        isComposing: false,
        isSubmitting: true,
        allowSubmitWhileGenerating: true,
        hasDuringRunModifier: true,
        shortcutsEnabled,
        enterToSend,
        submitOverride,
        yieldedChords,
      };
      const chord = (init: Partial<KeyChordSource>) =>
        resolveComposerKeyDown(
          { key: 'Enter', altKey: false, ctrlKey: false, metaKey: false, shiftKey: false, ...init },
          ctx,
        );
      const mod = isMacPlatform ? { metaKey: true } : { ctrlKey: true };
      return {
        plainEnter: chord({}),
        modEnter: chord(mod),
        modShiftEnter: chord({ ...mod, shiftKey: true }),
        altEnter: chord({ altKey: true }),
      };
    }, [enterToSend, shortcutsEnabled, submitOverride, yieldedChords]);

<<<<<<< HEAD
    /**
     * With the preference on, plain Enter routes through `submitDuringRun`,
     * which preempts. The hint has to follow it: leaving ⏎ on the ordinary
     * Steer row would advertise a key that does something else, and that row
     * deliberately stays non-preempting when CLICKED. No key reaches it in
     * this mode, so it shows none.
     */
    const enterInterrupts = primary === 'steer' && steerInterruptsByDefault;
=======
>>>>>>> upstream/main
    /** The chord that submits the default action, if any still does. */
    let submitHint: string | undefined;
    if (verdicts.plainEnter === 'submit') {
      submitHint = '⏎';
    } else if (verdicts.modEnter === 'submit') {
      submitHint = modEnter;
    }
    const alternateHint = verdicts.modEnter === 'other' ? modEnter : undefined;
    let interruptSteerKbd: string | undefined;
<<<<<<< HEAD
    if (enterInterrupts && submitHint != null) {
=======
    if (primary === 'interrupt' && submitHint != null) {
>>>>>>> upstream/main
      interruptSteerKbd = submitHint;
    } else if (verdicts.modShiftEnter === 'preempt') {
      interruptSteerKbd = modShiftEnter;
    }

    const runAction = (action: (text: string) => boolean | void) => {
<<<<<<< HEAD
=======
      if (disabledRef.current) {
        return;
      }
>>>>>>> upstream/main
      const text = props.getText().trim();
      if (text.length === 0) {
        return;
      }
      if (action(text) !== false) {
        props.onConsumed();
      }
    };

<<<<<<< HEAD
    let steerKbd: string | undefined = alternateHint;
    if (primary === 'steer') {
      steerKbd = enterInterrupts ? undefined : submitHint;
=======
    let steerKbd: string | undefined = primary === 'queue' ? alternateHint : undefined;
    if (primary === 'steer') {
      steerKbd = submitHint;
>>>>>>> upstream/main
    }

    const steerRow: ActionRow = {
      key: 'steer',
      label: localize('com_ui_steer'),
      kbd: steerKbd,
<<<<<<< HEAD
      icon: <Zap className="h-4 w-4 text-status-warning" aria-hidden="true" />,
      // Gate on availability, not the default action — the row exists to
      // override a queue-preferring default with an explicit steer.
      disabled: !steering.canSteer,
=======
      icon: <Zap className="text-status-warning h-4 w-4" aria-hidden="true" />,
      // A staged reasoning choice is a queued full turn, not a live steer.
      disabled: props.disabled || !steering.canSteer || steering.pendingReasoningOverride != null,
>>>>>>> upstream/main
      onClick: () => runAction((text) => steering.steerFromComposer(text)),
    };
    const queueRow: ActionRow = {
      key: 'queue',
      label: localize('com_ui_queue'),
      kbd: primary === 'queue' ? submitHint : alternateHint,
<<<<<<< HEAD
      icon: <Clock className="h-4 w-4 text-status-info" aria-hidden="true" />,
      onClick: () => runAction((text) => steering.queueFromComposer(text)),
    };
    /** Keeps the half-written answer, unlike interrupt & send below it. */
=======
      icon: <Clock className="text-status-info h-4 w-4" aria-hidden="true" />,
      disabled: props.disabled,
      onClick: () => runAction((text) => steering.queueFromComposer(text)),
    };
    /** Interrupt never becomes a stop-and-send fallback. */
>>>>>>> upstream/main
    const interruptSteerRow: ActionRow = {
      key: 'interrupt-steer',
      label: localize('com_ui_interrupt_steer'),
      kbd: interruptSteerKbd,
<<<<<<< HEAD
      icon: <ZapOff className="h-4 w-4 text-status-warning" aria-hidden="true" />,
      // Matches the standalone button's gate, and deliberately NOT
      // `!canSteer` like the steer row above: `canSteer` is also false before
      // a conversation exists, where `interruptSteer` falls back to interrupt
      // & send and this row must stay live for the whole first turn.
      disabled: steering.pausedOnApproval || !steering.canControlGeneration,
      onClick: () => runAction((text) => steering.interruptSteer(text)),
    };
    const interruptRow: ActionRow = {
      key: 'interrupt',
      label: localize('com_ui_interrupt_send'),
      kbd: verdicts.altEnter === 'interrupt' ? altEnter : undefined,
      icon: <OctagonPause className="h-4 w-4 text-status-error" aria-hidden="true" />,
      disabled: !steering.canControlGeneration,
      onClick: () => runAction((text) => steering.interruptAndSend(text)),
    };
    const rows = primary === 'steer' ? [steerRow, queueRow] : [queueRow, steerRow];
    rows.push(interruptSteerRow, interruptRow);

    const label =
      primary === 'steer' ? localize('com_ui_steer_send') : localize('com_ui_queue_send');
=======
      icon: <ZapOff className="text-status-warning h-4 w-4" aria-hidden="true" />,
      disabled:
        props.disabled ||
        steering.pausedOnApproval ||
        !steering.canSteer ||
        steering.pendingReasoningOverride != null,
      onClick: () => runAction((text) => steering.interruptSteer(text)),
    };
    if (interruptSteerKbd == null && verdicts.altEnter === 'interrupt') {
      interruptSteerRow.kbd = altEnter;
    }
    const rows = [steerRow, interruptSteerRow, queueRow];
    const label = localize(ACTION_LABELS[primary]);
>>>>>>> upstream/main

    return (
      <SendActions
        actions={rows}
        label={localize('com_ui_during_run_actions')}
        anchor={
          <button
            ref={ref}
            aria-label={label}
<<<<<<< HEAD
            id="during-run-send-button"
=======
>>>>>>> upstream/main
            disabled={!content || props.disabled === true}
            className={composerSubmitClasses()}
            data-testid="during-run-send-button"
            data-during-run-action={primary}
            type="submit"
          >
            <span data-state="closed">
<<<<<<< HEAD
              <SendIcon size={24} />
=======
              <SendIcon className="size-6" />
>>>>>>> upstream/main
            </span>
          </button>
        }
      />
    );
  }),
);

export default DuringRunSendButton;
