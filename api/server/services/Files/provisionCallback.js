const { createProvisionFilesCallback: createCallback } = require('@librechat/api');
const { provisionToCodeEnv, provisionToVectorDB } = require('~/server/services/Files/provision');
const db = require('~/models');
<<<<<<< HEAD

/* Wiring only: binds this workspace's provisioning service and file model to the
 * ON_TOOL_EXECUTE callback implemented in packages/api. */
function createProvisionFilesCallback({ req, agentToolContexts, resolvePrimaryAgentId }) {
=======
const { getFileStorage } = require('~/server/services/Files/operations');

/* Wiring only: binds this workspace's provisioning service and file model to the
 * ON_TOOL_EXECUTE callback implemented in packages/api. */
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
    fileStorage: getFileStorage(),
>>>>>>> upstream/main
    provisionToCodeEnv,
    provisionToVectorDB,
    updateFile: db.updateFile,
    updateCodeEnvRef: db.updateFileCodeEnvRef,
    addEmbeddedEntity: db.addFileEmbeddedEntity,
  });
}

module.exports = { createProvisionFilesCallback };
