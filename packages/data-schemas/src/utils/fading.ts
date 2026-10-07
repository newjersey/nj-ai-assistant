import type { IAgentFadingTier, IAgentFadingTierEntry } from '~/types/convo';

<<<<<<< HEAD
/** Version of the persisted context-fading tier shape; must match `@librechat/agents`. */
export const AGENT_FADING_TIER_VERSION = 1;
=======
/** Current context-fading tier version; version 1 remains readable but is not seeded. */
export const AGENT_FADING_TIER_VERSION = 2;
>>>>>>> upstream/main

/** Whether a persisted value is a well-formed context-fading tier. */
export function isAgentFadingTier(value: unknown): value is IAgentFadingTier {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  const { v, budgetTokens, masked } = value as Partial<Record<keyof IAgentFadingTier, unknown>>;
  return (
<<<<<<< HEAD
    v === AGENT_FADING_TIER_VERSION &&
=======
    (v === 1 || v === AGENT_FADING_TIER_VERSION) &&
>>>>>>> upstream/main
    typeof budgetTokens === 'number' &&
    Number.isFinite(budgetTokens) &&
    budgetTokens > 0 &&
    typeof masked === 'boolean'
  );
}

<<<<<<< HEAD
=======
/** Whether a tier can seed the current SDK instead of being re-derived from history. */
export function isCurrentAgentFadingTier(value: unknown): value is IAgentFadingTier & { v: 2 } {
  return isAgentFadingTier(value) && value.v === AGENT_FADING_TIER_VERSION;
}

>>>>>>> upstream/main
/**
 * Whether a persisted value is a well-formed per-agent tier entry. Agent IDs
 * are server-generated and unbounded (an ephemeral agent's ID encodes its
 * endpoint, model and sender), so only emptiness is rejected.
 */
export function isAgentFadingTierEntry(value: unknown): value is IAgentFadingTierEntry {
  if (!isAgentFadingTier(value)) {
    return false;
  }
  const { agentId } = value as Partial<Record<'agentId', unknown>>;
  return typeof agentId === 'string' && agentId.length > 0;
}

/** Whether a persisted value is a list of per-agent tier entries with unique agent IDs. */
export function isAgentFadingTierEntries(value: unknown): value is IAgentFadingTierEntry[] {
  if (!Array.isArray(value)) {
    return false;
  }
  const seen = new Set<string>();
  for (const entry of value) {
    if (!isAgentFadingTierEntry(entry) || seen.has(entry.agentId)) {
      return false;
    }
    seen.add(entry.agentId);
  }
  return true;
}
