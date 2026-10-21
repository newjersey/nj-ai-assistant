<<<<<<< HEAD
import React from 'react';
import { useRecoilState } from 'recoil';
import { Button, InfoHoverCard, ESide } from '@librechat/client';
import { useLocalize } from '~/hooks';
import store from '~/store';

/**
 * Toggles what Enter does while a run is generating: steer (inject the
 * message into the live run at the next tool boundary) or queue (send it as a
 * normal follow-up once the run finishes). The composer's during-run menu can
 * still override per send.
 */
const DuringRunAction = () => {
  const [action, setAction] = useRecoilState(store.duringRunDefaultAction);
  const localize = useLocalize();

  const toggle = () => {
    setAction((prev) => (prev === 'steer' ? 'queue' : 'steer'));
  };

  const label =
    action === 'steer'
      ? localize('com_nav_during_run_action_steer')
      : localize('com_nav_during_run_action_queue');

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span id="during-run-action-label">{localize('com_nav_during_run_action')}</span>
        <InfoHoverCard side={ESide.Bottom} text={localize('com_nav_info_during_run_action')} />
      </div>
      <Button
        variant="outline"
        aria-labelledby="during-run-action-label"
        onClick={toggle}
        data-testid="duringRunAction"
      >
        {label}
      </Button>
    </div>
  );
};

export default DuringRunAction;
=======
import { useAtom } from 'jotai';
import { Dropdown, InfoHoverCard, ESide } from '@librechat/client';
import { duringRunActionAtom } from '~/store/duringRun';
import { useLocalize } from '~/hooks';

export default function DuringRunAction() {
  const [action, setAction] = useAtom(duringRunActionAtom);
  const localize = useLocalize();
  const labelId = 'during-run-action-label';

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center space-x-2">
        <span id={labelId}>{localize('com_nav_during_run_action')}</span>
        <InfoHoverCard side={ESide.Bottom} text={localize('com_nav_info_during_run_action')} />
      </div>
      <Dropdown
        value={action}
        options={[
          { value: 'steer', label: localize('com_ui_steer') },
          { value: 'interrupt', label: localize('com_ui_interrupt_steer') },
          { value: 'queue', label: localize('com_ui_queue') },
        ]}
        onChange={(value) => {
          if (value === 'steer' || value === 'interrupt' || value === 'queue') setAction(value);
        }}
        className="z-50"
        sizeClasses="z-50"
        testId="duringRunAction"
        aria-labelledby={labelId}
      />
    </div>
  );
}
>>>>>>> upstream/main
