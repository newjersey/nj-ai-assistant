<<<<<<< HEAD
import type { GraphEdge } from 'librechat-data-provider';
=======
import type {
  GraphEdge,
  AgentInstructionsPrompt,
  RestrictedAgentInstructionsPrompt,
} from 'librechat-data-provider';
>>>>>>> upstream/main

export type VersionRecord = Record<string, any>;

export type AgentState = {
  name: string | null;
  description: string | null;
  instructions: string | null;
<<<<<<< HEAD
=======
  /** Linked prompt group revision, or the restricted stub, backing `instructions`.
   * Two versions that differ only by this field must not compare as the same
   * state — see `isActiveVersion`. */
  instructionsPrompt?: AgentInstructionsPrompt | RestrictedAgentInstructionsPrompt | null;
>>>>>>> upstream/main
  artifacts?: string | null;
  capabilities?: string[];
  tools?: string[];
  edges?: GraphEdge[];
} | null;

export type VersionWithId = {
  id: number;
  originalIndex: number;
  version: VersionRecord;
  isActive: boolean;
};

export type VersionContext = {
  versions: VersionRecord[];
  versionIds: VersionWithId[];
  currentAgent: AgentState;
  selectedAgentId: string;
  activeVersion: VersionRecord | null;
};

export interface AgentWithVersions {
  name: string;
  description: string | null;
  instructions: string | null;
<<<<<<< HEAD
=======
  instructionsPrompt?: AgentInstructionsPrompt | RestrictedAgentInstructionsPrompt | null;
>>>>>>> upstream/main
  artifacts?: string | null;
  capabilities?: string[];
  tools?: string[];
  edges?: GraphEdge[];
  versions?: Array<VersionRecord>;
}
