<<<<<<< HEAD
import { isCodeEnvironmentMode, isCodeWorkspaceSelections } from 'librechat-data-provider';
=======
import {
  isCodeEnvironmentMode,
  isCodeWorkspaceSelections,
  canonicalizeCodeWorkspaceSelections,
} from 'librechat-data-provider';
>>>>>>> upstream/main
import type {
  CodeEnvironmentMode,
  CodeWorkspaceSelection,
  TConversation,
} from 'librechat-data-provider';
<<<<<<< HEAD
import { CodeWorkspaceSelectionError } from './capabilities';
=======
import type { AppConfig } from '@librechat/data-schemas';
import { CodeWorkspaceSelectionError } from './capabilities';
import { resolveCodeEnvironmentMoveVersion } from './config';
>>>>>>> upstream/main

export interface ConversationCodeEnvironmentDecision {
  mode: CodeEnvironmentMode;
  codeWorkspaces?: CodeWorkspaceSelection[];
}

export type StoredConversationDecision = Pick<
  TConversation,
  'conversationId' | 'codeEnvironmentMode' | 'codeWorkspaces'
<<<<<<< HEAD
>;

function canonicalSelections(selections: CodeWorkspaceSelection[]): CodeWorkspaceSelection[] {
  return [...selections].sort((left, right) => {
    if (left.environmentId < right.environmentId) return -1;
    if (left.environmentId > right.environmentId) return 1;
    if (left.workspaceId < right.workspaceId) return -1;
    if (left.workspaceId > right.workspaceId) return 1;
    return 0;
  });
=======
> & { codeEnvironmentRevision?: number };

function canonicalSelections(selections: CodeWorkspaceSelection[]): CodeWorkspaceSelection[] {
  return canonicalizeCodeWorkspaceSelections(selections);
>>>>>>> upstream/main
}

function sameSelections(left: CodeWorkspaceSelection[], right: CodeWorkspaceSelection[]): boolean {
  return JSON.stringify(canonicalSelections(left)) === JSON.stringify(canonicalSelections(right));
}

function validateDecision(mode: unknown, selections: unknown): ConversationCodeEnvironmentDecision {
  if (!isCodeEnvironmentMode(mode)) {
    throw new CodeWorkspaceSelectionError('invalid');
  }
  if (mode === 'without_attached') {
    if (
      selections !== undefined &&
      (!isCodeWorkspaceSelections(selections) || selections.length > 0)
    ) {
      throw new CodeWorkspaceSelectionError('invalid');
    }
    return { mode };
  }
  if (!isCodeWorkspaceSelections(selections) || selections.length === 0) {
    throw new CodeWorkspaceSelectionError('required');
  }
  return { mode, codeWorkspaces: canonicalSelections(selections) };
}

<<<<<<< HEAD
/** A stored conversation always carries a decision; legacy rows infer it from their selections. */
=======
/**
 * Whether the conversation already recorded a decision. A chat whose turns never involved a
 * code-capable agent stores neither field, so it has nothing to seal: switching one to a coding
 * agent still gets to decide. Sealing that state instead would report `without_attached` for a
 * choice its owner never made, and reject the selection they go on to make.
 */
function holdsDecision(conversation: StoredConversationDecision): boolean {
  return conversation.codeEnvironmentMode != null || (conversation.codeWorkspaces?.length ?? 0) > 0;
}

/** Reads the decision a conversation holds; legacy rows infer it from their selections. */
>>>>>>> upstream/main
function readPersistedDecision(
  conversation: StoredConversationDecision,
): ConversationCodeEnvironmentDecision {
  const mode =
    conversation.codeEnvironmentMode ??
    (conversation.codeWorkspaces?.length ? 'attached' : 'without_attached');
  return validateDecision(mode, conversation.codeWorkspaces);
}

/** Resolves one immutable conversation choice before attached tools are registered. */
export function resolveConversationCodeEnvironmentDecision({
  conversationId,
  requestedMode,
  requestedSelections,
  conversation,
}: {
  conversationId: string;
  requestedMode?: unknown;
  requestedSelections?: unknown;
  conversation?: StoredConversationDecision | null;
}): ConversationCodeEnvironmentDecision {
<<<<<<< HEAD
  if (conversation != null && conversation.conversationId === conversationId) {
=======
  if (
    conversation != null &&
    conversation.conversationId === conversationId &&
    holdsDecision(conversation)
  ) {
>>>>>>> upstream/main
    const persisted = readPersistedDecision(conversation);
    if (requestedMode !== undefined && requestedMode !== persisted.mode) {
      throw new CodeWorkspaceSelectionError('locked');
    }
    if (
      persisted.mode === 'attached' &&
      requestedSelections !== undefined &&
      (!isCodeWorkspaceSelections(requestedSelections) ||
        !sameSelections(requestedSelections, persisted.codeWorkspaces ?? []))
    ) {
      throw new CodeWorkspaceSelectionError('locked');
    }
    if (
      persisted.mode === 'without_attached' &&
      requestedSelections !== undefined &&
      (!isCodeWorkspaceSelections(requestedSelections) || requestedSelections.length > 0)
    ) {
      throw new CodeWorkspaceSelectionError('locked');
    }
    return persisted;
  }

  if (requestedMode !== undefined && !isCodeEnvironmentMode(requestedMode)) {
    throw new CodeWorkspaceSelectionError('invalid');
  }
  const mode =
    requestedMode ??
    (isCodeWorkspaceSelections(requestedSelections) && requestedSelections.length > 0
      ? 'attached'
      : 'without_attached');
  return validateDecision(mode, requestedSelections);
}

export interface ConversationCodeEnvironmentMove {
<<<<<<< HEAD
  codeWorkspaces: CodeWorkspaceSelection[];
}

/**
 * Validates an owner's explicit move of a sealed attached decision onto the environments its
 * agents now use. A move may drop environments the agents stopped using and add ones they now use,
 * but never changes the workspace of an environment the decision already covers and never upgrades
 * a conversation that continues without an attached environment. `from` must repeat the persisted selections, so a client acting
 * on a stale view of the conversation cannot replace a decision it has not seen.
=======
  mode: CodeEnvironmentMode;
  codeWorkspaces?: CodeWorkspaceSelection[];
}

/**
 * Validates an owner's explicit replacement of a sealed decision. Attach, detach, moves and
 * missing-workspace recovery replace the whole decision without changing history or copying files.
 * The caller must verify live registration of every target and, for same-environment replacements,
 * absence of the previous workspace. `from` repeats the stored selections so stale clients cannot
 * replace a decision they have not seen. Undecided chats record their first decision on submission.
>>>>>>> upstream/main
 */
export function resolveConversationCodeEnvironmentMove({
  conversation,
  from,
  to,
}: {
  conversation: StoredConversationDecision;
  from: unknown;
  to: unknown;
}): ConversationCodeEnvironmentMove {
<<<<<<< HEAD
  const persisted = readPersistedDecision(conversation);
  if (persisted.mode !== 'attached' || persisted.codeWorkspaces == null) {
    throw new CodeWorkspaceSelectionError('locked');
  }
  if (!isCodeWorkspaceSelections(from) || !sameSelections(from, persisted.codeWorkspaces)) {
    throw new CodeWorkspaceSelectionError('locked');
  }
  if (!isCodeWorkspaceSelections(to) || to.length === 0) {
    throw new CodeWorkspaceSelectionError('invalid');
  }
  const sealed = new Map(
    persisted.codeWorkspaces.map(({ environmentId, workspaceId }) => [environmentId, workspaceId]),
  );
  let adds = false;
  for (const selection of to) {
    const sealedWorkspaceId = sealed.get(selection.environmentId);
    if (sealedWorkspaceId == null) {
      adds = true;
    } else if (sealedWorkspaceId !== selection.workspaceId) {
      throw new CodeWorkspaceSelectionError('locked');
    }
  }
  if (!adds && to.length === sealed.size) {
    throw new CodeWorkspaceSelectionError('locked');
  }
  return { codeWorkspaces: canonicalSelections(to) };
=======
  if (!holdsDecision(conversation)) {
    throw new CodeWorkspaceSelectionError('locked');
  }
  const persisted = readPersistedDecision(conversation);
  const sealed = persisted.codeWorkspaces ?? [];
  if (!isCodeWorkspaceSelections(from) || !sameSelections(from, sealed)) {
    throw new CodeWorkspaceSelectionError('locked');
  }
  if (!isCodeWorkspaceSelections(to)) {
    throw new CodeWorkspaceSelectionError('invalid');
  }
  if (to.length === 0) {
    if (persisted.mode !== 'attached') {
      throw new CodeWorkspaceSelectionError('locked');
    }
    return { mode: 'without_attached' };
  }
  if (persisted.mode === 'without_attached') {
    return { mode: 'attached', codeWorkspaces: canonicalSelections(to) };
  }
  if (sameSelections(to, sealed)) {
    throw new CodeWorkspaceSelectionError('locked');
  }
  return { mode: 'attached', codeWorkspaces: canonicalSelections(to) };
>>>>>>> upstream/main
}

type PersistableDecisionFields = Pick<
  StoredConversationDecision,
  'codeEnvironmentMode' | 'codeWorkspaces'
>;

/**
 * Returns the decision fields a run may persist. A stored conversation keeps the decision it
 * already holds, because only its owner's explicit move replaces one: a run from any ingress that
 * settles after a move would otherwise write its run-start decision back over it. A legacy row
 * records the mode it inferred without touching the selections it already stores. A caller that
 * never resolved a decision falls back to the fields its request carried, under the same rule.
 */
export function resolvePersistableCodeEnvironmentDecision({
  conversationId,
  decision,
  conversation,
  requested,
}: {
  conversationId: string;
  decision?: ConversationCodeEnvironmentDecision | null;
  conversation?: StoredConversationDecision | null;
  requested?: PersistableDecisionFields | null;
}): PersistableDecisionFields {
  const candidate: PersistableDecisionFields =
    decision != null
      ? {
          codeEnvironmentMode: decision.mode,
          ...(decision.codeWorkspaces != null && { codeWorkspaces: decision.codeWorkspaces }),
        }
      : {
          ...(requested?.codeEnvironmentMode != null && {
            codeEnvironmentMode: requested.codeEnvironmentMode,
          }),
          ...(requested?.codeWorkspaces != null && { codeWorkspaces: requested.codeWorkspaces }),
        };
  if (conversation == null || conversation.conversationId !== conversationId) {
    return candidate;
  }
<<<<<<< HEAD
=======
  /* A saved chat that held no decision records the one this run establishes, selections included:
   * writing the mode alone would leave `attached` without the selections the next turn validates. */
  if (!holdsDecision(conversation)) {
    return candidate;
  }
>>>>>>> upstream/main
  if (conversation.codeEnvironmentMode != null || candidate.codeEnvironmentMode == null) {
    return {};
  }
  return { codeEnvironmentMode: candidate.codeEnvironmentMode };
}
<<<<<<< HEAD
=======

/** When moves are enabled, every ingress must publish its active job before calling this and
 * keep it active through the fenced read. Otherwise no transition can race the decision, so reuse
 * the owner-scoped conversation the ingress already loaded instead of writing an unused revision. */
export async function resolveAdmittedCodeEnvironmentDecision({
  appConfig,
  readDecision,
  ...request
}: Parameters<typeof resolveConversationCodeEnvironmentDecision>[0] & {
  appConfig: Pick<AppConfig, 'endpoints'> | undefined;
  readDecision: (conversationId: string) => Promise<StoredConversationDecision | null | undefined>;
}): Promise<{
  decision: ConversationCodeEnvironmentDecision;
  conversation: StoredConversationDecision | null | undefined;
}> {
  const conversation =
    resolveCodeEnvironmentMoveVersion(appConfig) != null
      ? await readDecision(request.conversationId)
      : request.conversation;
  return {
    decision: resolveConversationCodeEnvironmentDecision({ ...request, conversation }),
    // Keep owner-loaded metadata, but never the pre-admission environment fields. An absent
    // stored decision must remain absent; the submitted first choice is not persisted yet.
    conversation:
      conversation == null
        ? conversation
        : {
            ...request.conversation,
            ...conversation,
            codeEnvironmentMode: conversation.codeEnvironmentMode,
            codeWorkspaces: conversation.codeWorkspaces,
          },
  };
}
>>>>>>> upstream/main
