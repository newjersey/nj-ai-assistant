import type { SubagentIdentity } from 'librechat-data-provider';

<<<<<<< HEAD
=======
/**
 * The saved agent behind a child, from live progress, then its persisted
 * identity. Types are aliases, not proof of a saved-agent identity.
 */
>>>>>>> upstream/main
export function resolveSubagentAgentId(
  progress: Partial<SubagentIdentity> | null | undefined,
  persisted: SubagentIdentity | undefined,
): string | undefined {
  if (progress?.subagentKind === 'graph') return undefined;
  if (progress?.subagentAgentId) return progress.subagentAgentId;
<<<<<<< HEAD
  return persisted?.subagentKind === 'agent' ? persisted.subagentAgentId : undefined;
=======
  if (persisted != null) {
    return persisted.subagentKind === 'agent' ? persisted.subagentAgentId : undefined;
  }
  return undefined;
>>>>>>> upstream/main
}
