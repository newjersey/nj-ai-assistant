<<<<<<< HEAD
import { atomFamily } from 'recoil';
=======
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
>>>>>>> upstream/main

/**
 * True while the backend reported the stateful code sandbox is cold-booting
 * for this tool call (`on_sandbox_starting` SSE event). Keyed by
 * `tool_call_id`; `ExecuteCode`/`BashCall` swap their in-progress label to a
 * "starting sandbox" message while set. Cleared when the tool call's run
 * step completes.
 */
<<<<<<< HEAD
export const sandboxStartingByToolCallId = atomFamily<boolean, string>({
  key: 'sandboxStartingByToolCallId',
  default: false,
});
=======
export const sandboxStartingByToolCallId = atomFamily((_toolCallId: string) => atom(false));
>>>>>>> upstream/main
