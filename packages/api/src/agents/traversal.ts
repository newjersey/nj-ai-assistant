export interface ReachableAgent<TAgent> {
  readonly subagentAgentConfigs?: readonly (TAgent | null | undefined)[];
  readonly lazySubagentConfigs?: readonly (TAgent | null | undefined)[];
  readonly subagentGraphMemberMetadata?: readonly (TAgent | null | undefined)[];
  readonly subagentGraphConfigs?: readonly {
    readonly memberConfigs?: readonly (TAgent | null | undefined)[];
  }[];
}

<<<<<<< HEAD
/**
 * Collects each agent object reachable from the supplied roots exactly once.
 * Object identity preserves distinct initialized snapshots while preventing
 * shared subagent nodes and cyclic graphs from repeating work.
 */
=======
/** Visits each object once in breadth-first order, stopping before a match's descendants. */
export function someReachableAgent<T extends ReachableAgent<T>>(
  roots: Iterable<T | null | undefined>,
  predicate: (agent: T) => boolean,
): boolean {
  let visited: Set<T> | undefined;
  let pending: Array<T | null | undefined> | undefined;
  const matches = (agent: T | null | undefined): boolean => {
    if (agent == null || visited?.has(agent)) {
      return false;
    }
    if (predicate(agent)) {
      return true;
    }
    (visited ??= new Set<T>()).add(agent);
    const eager = agent.subagentAgentConfigs;
    const lazy = agent.lazySubagentConfigs;
    const metadata = agent.subagentGraphMemberMetadata;
    if (eager?.length) {
      (pending ??= []).push(...eager);
    }
    if (lazy?.length) {
      (pending ??= []).push(...lazy);
    }
    if (metadata?.length) {
      (pending ??= []).push(...metadata);
    }
    for (const graph of agent.subagentGraphConfigs ?? []) {
      const members = graph.memberConfigs;
      if (members?.length) {
        (pending ??= []).push(...members);
      }
    }
    return false;
  };

  for (const root of roots) {
    if (matches(root)) {
      return true;
    }
  }
  for (let index = 0; pending && index < pending.length; index++) {
    if (matches(pending[index])) {
      return true;
    }
  }
  return false;
}

/** Collects distinct snapshots in breadth-first order, including shared and cyclic graphs. */
>>>>>>> upstream/main
export function collectReachableAgents<T extends ReachableAgent<T>>(
  roots: readonly (T | null | undefined)[],
): T[] {
  const agents: T[] = [];
<<<<<<< HEAD
  const visited = new Set<T>();
  const pending = [...roots];

  for (let index = 0; index < pending.length; index++) {
    const agent = pending[index];
    if (agent == null || visited.has(agent)) {
      continue;
    }
    visited.add(agent);
    agents.push(agent);
    pending.push(
      ...(agent.subagentAgentConfigs ?? []),
      ...(agent.lazySubagentConfigs ?? []),
      ...(agent.subagentGraphMemberMetadata ?? []),
    );
    for (const graph of agent.subagentGraphConfigs ?? []) {
      pending.push(...(graph.memberConfigs ?? []));
    }
  }

=======
  someReachableAgent(roots, (agent) => {
    agents.push(agent);
    return false;
  });
>>>>>>> upstream/main
  return agents;
}
