import { useCallback } from 'react';
<<<<<<< HEAD
import { useRecoilCallback, useRecoilValue } from 'recoil';
import type { PendingSteer } from '~/store/families';
import { useCancelSteerMutation } from '~/data-provider';
import { appendAppliedSteerIds } from '~/utils';
import store from '~/store';

/**
 * `reclaimed` — the cancel beat the boundary; the words never entered the run.
 * `applied` — the steer already injected (or the run ended): the events own it.
 * `failed` — the POST failed, so the entry is restored and the server may still
 * inject it.
 */
export type SteerCancelOutcome = 'reclaimed' | 'applied' | 'failed';

/**
 * Asks the server to drop a steer before its injection boundary, touching no
 * chip state — the caller owns what happens to the words.
 *
 * A steer leaves the server queue only by injecting, so only `reclaimed` proves
 * the words never entered the run and are still the client's to re-home. Giving
 * an `applied` steer a second life (queueing it, editing it back into the
 * composer) would say the same thing twice; on `failed` the server may still
 * inject it, so its fate is unknown and it must be left alone.
=======
import { useSetAtom, useStore } from 'jotai';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import type { PendingSteer } from '~/hooks/Chat/queue';
import { useComposerRestoreHost } from '~/Providers/ComposerRestoreContext';
import { appendAppliedSteerIds, carriedSteerContext } from '~/utils';
import { pendingSteerCancelClientIdsFamily } from '~/store/steer';
import { queuedMessagesByConvoId } from '~/hooks/Chat/queue';
import useSteerConvert from '~/hooks/Chat/useSteerConvert';
import { useCancelSteerMutation } from '~/data-provider';
import store from '~/store';

export type SteerCancelOutcome = 'reclaimed' | 'applied' | 'failed';

/** Where a steer's words ended up once they stopped being a steer. */
export type SteerRehomeTarget = 'composer' | 'queue';

/**
 * Asks the server to drop a steer before its injection boundary. Only a
 * confirmed reclaim proves the words remain safe to move elsewhere.
>>>>>>> upstream/main
 */
export function useSteerReclaim(conversationId: string) {
  const cancelMutation = useCancelSteerMutation();
  const activeGenerationCreatedAt = useRecoilValue(
    store.activeGenerationCreatedAtByConvoId(conversationId),
  );
<<<<<<< HEAD
  /** A confirmed reclaim is a terminal settlement too. Tombstone both ids so
   * a final payload captured before the server discard cannot requeue it, and
   * remove a recovered queue copy if the opposite ordering already occurred. */
=======
  const setPendingCancelIds = useSetAtom(pendingSteerCancelClientIdsFamily(conversationId));
  const queueStore = useStore();
>>>>>>> upstream/main
  const settleReclaimed = useRecoilCallback(
    ({ set }) =>
      (steer: PendingSteer) => {
        const ids = [steer.steerId, ...(steer.clientSteerId ? [steer.clientSteerId] : [])];
        const settled = new Set(ids);
        set(store.appliedSteerIdsByConvoId(conversationId), (prev) =>
          appendAppliedSteerIds(prev, ids),
        );
        set(store.pendingSteersByConvoId(conversationId), (prev) =>
          prev.filter(
            (item) =>
              !settled.has(item.steerId) &&
              (item.clientSteerId == null || !settled.has(item.clientSteerId)),
          ),
        );
<<<<<<< HEAD
        set(store.queuedMessagesByConvoId(conversationId), (prev) =>
=======
        setPendingCancelIds((prev) => prev.filter((id) => !ids.includes(id)));
        queueStore.set(queuedMessagesByConvoId(conversationId), (prev) =>
>>>>>>> upstream/main
          prev.filter(
            (item) =>
              !settled.has(item.id) &&
              (item.recoverySteerId == null || !settled.has(item.recoverySteerId)) &&
              (item.recoveryClientSteerId == null || !settled.has(item.recoveryClientSteerId)),
          ),
        );
      },
<<<<<<< HEAD
    [conversationId],
=======
    [conversationId, setPendingCancelIds, queueStore],
>>>>>>> upstream/main
  );

  return useCallback(
    async (steer: PendingSteer): Promise<SteerCancelOutcome> => {
      try {
        const generationCreatedAt =
          steer.generationCreatedAt ?? activeGenerationCreatedAt ?? undefined;
        if (generationCreatedAt == null) {
          return 'failed';
        }
        const { removed } = await cancelMutation.mutateAsync({
          conversationId,
          steerId: steer.steerId,
          ...(steer.clientSteerId && { clientSteerId: steer.clientSteerId }),
          generationCreatedAt,
        });
        if (removed === true) {
          settleReclaimed(steer);
          return 'reclaimed';
        }
        return 'applied';
      } catch {
        return 'failed';
      }
    },
    [conversationId, cancelMutation, settleReclaimed, activeGenerationCreatedAt],
  );
}

<<<<<<< HEAD
/**
 * Cancels a steer still waiting on its injection boundary. The chip stays
 * visible until the request settles so capability/update events can still
 * patch its current server revision while cancel is in flight. Only a
 * confirmed reclaim removes it here. `removed:false` is ambiguous in the v1
 * protocol (already injected OR terminal conversion won), so the event path
 * must decide whether to remove or recover that entry without discarding its
 * client-only files/quotes/skills first.
 */
export default function useSteerCancel(conversationId: string) {
  const reclaim = useSteerReclaim(conversationId);

  const removeEntry = useRecoilCallback(
    ({ set }) =>
      (steerId: string) => {
        set(store.pendingSteersByConvoId(conversationId), (prev) =>
          prev.filter((item) => item.steerId !== steerId),
        );
      },
    [conversationId],
  );
=======
export function useSteerMoveToQueue(conversationId: string) {
  const reclaim = useSteerReclaim(conversationId);
  const convertSteersToQueued = useSteerConvert();
  const { rewakeDrain } = useComposerRestoreHost();

>>>>>>> upstream/main
  return useCallback(
    async (steer: PendingSteer): Promise<SteerCancelOutcome> => {
      const outcome = await reclaim(steer);
      if (outcome === 'reclaimed') {
<<<<<<< HEAD
        removeEntry(steer.steerId);
      }
      return outcome;
    },
    [reclaim, removeEntry],
=======
        convertSteersToQueued(conversationId, [steer], {
          generationProtocolVersion: steer.generationProtocolVersion,
          allowPreviouslyConvertedIds: [steer.steerId],
          bindRecoverySource: false,
        });
        /* The run may have finished while the cancel was in flight, spending
           the drain's one-shot signal on a queue this row was not in yet. */
        rewakeDrain(conversationId);
      }
      return outcome;
    },
    [conversationId, convertSteersToQueued, reclaim, rewakeDrain],
  );
}

/**
 * The one place a steer stops being a steer and becomes the user's words
 * again, whole: text, attachments, quoted excerpts, manual skill picks and the
 * reasoning override travel together or not at all.
 *
 * The composer is preferred, because every path that reaches here is the user
 * asking to take the message back rather than to send it later, but it is
 * allowed to refuse: it may hold a draft, be showing another chat, be paused
 * on a question that owns the box, or have unmounted while the reclaim was in
 * flight. A refusal converts the steer into an ordinary queued follow-up,
 * which carries the same context, so the words are never dropped on the floor.
 *
 * The chip goes either way. Once the words live somewhere else, a pending row
 * claiming the server still holds them is a lie.
 */
export interface SteerRehomeOptions {
  /** The server refused these words. Queued as a fallback they must wait for
   *  the user to send them, or the run-end drain would turn a refusal into an
   *  automatic new turn carrying the payload that was rejected. */
  rejectedByServer?: boolean;
}

export function useSteerRehome(conversationId: string) {
  const { restore, rewakeDrain } = useComposerRestoreHost();
  const convertSteersToQueued = useSteerConvert();
  const dropPendingSteer = useRecoilCallback(
    ({ set }) =>
      (steer: PendingSteer) => {
        const ids = new Set([steer.steerId, ...(steer.clientSteerId ? [steer.clientSteerId] : [])]);
        set(store.pendingSteersByConvoId(conversationId), (prev) =>
          prev.filter(
            (item) =>
              !ids.has(item.steerId) &&
              (item.clientSteerId == null || !ids.has(item.clientSteerId)),
          ),
        );
      },
    [conversationId],
  );

  return useCallback(
    (steer: PendingSteer, options?: SteerRehomeOptions): SteerRehomeTarget => {
      const taken = restore(steer.text, steer.files, carriedSteerContext(steer), conversationId);
      if (taken) {
        dropPendingSteer(steer);
        return 'composer';
      }
      /* `useSteerConvert` drops the chip itself as part of the conversion and
         carries the same context onto the queued row. */
      convertSteersToQueued(conversationId, [steer], {
        generationProtocolVersion: steer.generationProtocolVersion,
        allowPreviouslyConvertedIds: [steer.steerId],
        bindRecoverySource: false,
        ...(options?.rejectedByServer === true && { needsExplicitSend: true }),
      });
      if (options?.rejectedByServer !== true) {
        rewakeDrain(conversationId);
      }
      return 'queue';
    },
    [conversationId, convertSteersToQueued, dropPendingSteer, restore, rewakeDrain],
  );
}

export default function useSteerCancel(conversationId: string) {
  const reclaim = useSteerReclaim(conversationId);
  const rehome = useSteerRehome(conversationId);
  const setPendingCancelIds = useSetAtom(pendingSteerCancelClientIdsFamily(conversationId));
  const markOptimisticCancel = useRecoilCallback(
    ({ set }) =>
      (steer: PendingSteer) => {
        const clientId = steer.clientSteerId ?? steer.steerId;
        setPendingCancelIds((prev) => (prev.includes(clientId) ? prev : [...prev, clientId]));
        if (steer.status === 'sending') {
          set(store.pendingSteersByConvoId(conversationId), (prev) =>
            prev.filter((item) => item.steerId !== steer.steerId),
          );
        }
      },
    [conversationId, setPendingCancelIds],
  );
  const clearOptimisticCancel = useCallback(
    (steer: PendingSteer) => {
      const clientId = steer.clientSteerId ?? steer.steerId;
      setPendingCancelIds((prev) => prev.filter((id) => id !== clientId));
    },
    [setPendingCancelIds],
  );
  return useCallback(
    async (steer: PendingSteer): Promise<SteerCancelOutcome> => {
      if (steer.status === 'sending') {
        markOptimisticCancel(steer);
      }
      const outcome = await reclaim(steer);
      if (outcome === 'reclaimed') {
        rehome(steer);
        clearOptimisticCancel(steer);
      }
      return outcome;
    },
    [clearOptimisticCancel, markOptimisticCancel, reclaim, rehome],
>>>>>>> upstream/main
  );
}
