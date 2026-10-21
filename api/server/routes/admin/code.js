const express = require('express');
<<<<<<< HEAD
const { createAdminCodeEnvironmentHandlers } = require('@librechat/api');
=======
const { createAdminCodeEnvironmentHandlers, isAuditFailClosed } = require('@librechat/api');
>>>>>>> upstream/main
const { SystemCapabilities } = require('@librechat/data-schemas');
const { requireCapability } = require('~/server/middleware/roles/capabilities');
const { getAppConfig } = require('~/server/services/Config');
const { requireJwtAuth } = require('~/server/middleware');
<<<<<<< HEAD
=======
const db = require('~/models');
>>>>>>> upstream/main

const router = express.Router();
const requireAdminAccess = requireCapability(SystemCapabilities.ACCESS_ADMIN);
const requireCodeEnvironmentManage = requireCapability(
  SystemCapabilities.MANAGE_CODE_ENVIRONMENTS,
  { platformOnly: true },
);
<<<<<<< HEAD
const handlers = createAdminCodeEnvironmentHandlers({ getAppConfig });
=======
const handlers = createAdminCodeEnvironmentHandlers({
  getAppConfig,
  recordAuditEntry: db.recordAuditEntry,
  auditFailClosed: isAuditFailClosed(),
});
>>>>>>> upstream/main

router.use(requireJwtAuth, requireAdminAccess, requireCodeEnvironmentManage);
router.post('/:environmentId/pairings', handlers.createPairing);
router.post('/:environmentId/revoke', handlers.revokeWorker);

module.exports = router;
