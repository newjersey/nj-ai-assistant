const { createProvisionFilesCallback: createCallback } = require('@librechat/api');
const { provisionToCodeEnv, provisionToVectorDB } = require('~/server/services/Files/provision');
const db = require('~/models');

/* Wiring only: binds this workspace's provisioning service and file model to the
 * ON_TOOL_EXECUTE callback implemented in packages/api. */
<<<<<<< HEAD
function createProvisionFilesCallback({ req, agentToolContexts, resolvePrimaryAgentId }) {
=======
function createProvisionFilesCallback({
  req,
  agentToolContexts,
  resolvePrimaryAgentId,
  resolveExecutionContext,
}) {
>>>>>>> upstream/main
  return createCallback({
    req,
    agentToolContexts,
    resolvePrimaryAgentId,
<<<<<<< HEAD
=======
    resolveExecutionContext,
>>>>>>> upstream/main
    provisionToCodeEnv,
    provisionToVectorDB,
    updateFile: db.updateFile,
    updateCodeEnvRef: db.updateFileCodeEnvRef,
    addEmbeddedEntity: db.addFileEmbeddedEntity,
  });
}

module.exports = { createProvisionFilesCallback };
