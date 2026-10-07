const {
  createBackgroundToolCompletionWakeupHandler,
<<<<<<< HEAD
  createBackgroundToolDeadClaimRecovery,
  createBackgroundToolResultHandler,
} = require('@librechat/api');
const {
  enqueueAgentTrigger,
  renewAgentTriggerProducerLease,
  retireAgentTrigger,
=======
  GenerationJobManager,
  createBackgroundToolDeadClaimRecovery,
  createPendingBackgroundCompletions,
  createBackgroundToolResultHandler,
  claimBackgroundToolResult: claimResult,
} = require('@librechat/api');
const {
  listPendingAgentBackgroundToolCompletions,
  getAgentBackgroundToolResultBatch,
  confirmAgentBackgroundToolResultBatch,
  listUndeliveredAgentTriggerTaskIds,
} = require('~/models');
const {
  enqueueAgentTrigger,
  persistAgentBackgroundToolResult,
  getAgentBackgroundToolResultClaim,
  getBackgroundCompletionReceiptBatching,
  releaseAgentBackgroundToolResultClaims,
  renewAgentTriggerProducerLease,
  retireAgentTrigger,
  expediteCompletionWakeups,
>>>>>>> upstream/main
} = require('../../Agents/triggers');

const preregisterBackgroundToolCompletion = createBackgroundToolCompletionWakeupHandler(
  enqueueAgentTrigger,
  retireAgentTrigger,
  renewAgentTriggerProducerLease,
<<<<<<< HEAD
);

=======
  (deliveryKey, sourceId, result) =>
    persistAgentBackgroundToolResult({ deliveryKey, sourceId, result }),
  (deliveryKey) => expediteCompletionWakeups({ deliveryKeys: [deliveryKey] }),
  getBackgroundCompletionReceiptBatching,
);

const pendingBackgroundToolCompletions = createPendingBackgroundCompletions({
  list: listPendingAgentBackgroundToolCompletions,
  listTaskIds: listUndeliveredAgentTriggerTaskIds,
  retire: retireAgentTrigger,
});

>>>>>>> upstream/main
function createBackgroundToolResultPersistence({ req, updateToolCallResult }) {
  return createBackgroundToolResultHandler({ req, updateToolCallResult });
}

<<<<<<< HEAD
=======
const claimBackgroundToolResult = (db, input) =>
  claimResult(db, getAgentBackgroundToolResultClaim, input);

>>>>>>> upstream/main
function createDeadBackgroundToolClaimRecovery(
  releaseBackgroundToolResultClaims,
  getGenerationJob,
  fenceGenerationClaim,
) {
  return createBackgroundToolDeadClaimRecovery(
    retireAgentTrigger,
    releaseBackgroundToolResultClaims,
    getGenerationJob,
    fenceGenerationClaim,
<<<<<<< HEAD
=======
    releaseAgentBackgroundToolResultClaims,
    { getAgentBackgroundToolResultBatch, confirmAgentBackgroundToolResultBatch },
    (...args) => GenerationJobManager.getGenerationAdmissionEvidence(...args),
>>>>>>> upstream/main
  );
}

module.exports = {
  preregisterBackgroundToolCompletion,
<<<<<<< HEAD
  createBackgroundToolResultPersistence,
=======
  pendingBackgroundToolCompletions,
  createBackgroundToolResultPersistence,
  claimBackgroundToolResult,
>>>>>>> upstream/main
  createDeadBackgroundToolClaimRecovery,
};
