const express = require('express');
<<<<<<< HEAD
const { createAdminGrantsHandlers, getCachedPrincipals } = require('@librechat/api');
const { SystemCapabilities } = require('@librechat/data-schemas');
const { requireCapability } = require('~/server/middleware/roles/capabilities');
=======
const {
  createAdminGrantsHandlers,
  getCachedPrincipals,
  isAuditFailClosed,
} = require('@librechat/api');
const { SystemCapabilities } = require('@librechat/data-schemas');
const { requireCapability } = require('~/server/middleware/roles/capabilities');
const configMiddleware = require('~/server/middleware/config/app');
>>>>>>> upstream/main
const { requireJwtAuth } = require('~/server/middleware');
const db = require('~/models');

const router = express.Router();

const requireAdminAccess = requireCapability(SystemCapabilities.ACCESS_ADMIN);

const handlers = createAdminGrantsHandlers({
  listGrants: db.listGrants,
  countGrants: db.countGrants,
  getCapabilitiesForPrincipal: db.getCapabilitiesForPrincipal,
  getCapabilitiesForPrincipals: db.getCapabilitiesForPrincipals,
  grantCapability: db.grantCapability,
  revokeCapability: db.revokeCapability,
  getUserPrincipals: db.getUserPrincipals,
  hasCapabilityForPrincipals: db.hasCapabilityForPrincipals,
  getHeldCapabilities: db.getHeldCapabilities,
  getCachedPrincipals,
<<<<<<< HEAD
  checkRoleExists: async (name) => (await db.getRoleByName(name)) != null,
  recordAuditEntry: db.recordAuditEntry,
  /** Opt-in: fail the grant request if its audit entry can't be persisted. */
  auditFailClosed: process.env.AUDIT_LOG_FAIL_CLOSED === 'true',
=======
  checkRoleExists: async (name) => (await db.getPartitionRole(name)) != null,
  recordAuditEntry: db.recordAuditEntry,
  auditFailClosed: isAuditFailClosed(),
  lease: {
    acquireResourceLock: db.acquireResourceLock,
    renewResourceLock: db.renewResourceLock,
    releaseResourceLock: db.releaseResourceLock,
  },
>>>>>>> upstream/main
});

router.use(requireJwtAuth, requireAdminAccess);

router.get('/', handlers.listGrants);
router.get('/effective', handlers.getEffectiveCapabilities);
router.get('/:principalType/:principalId', handlers.getPrincipalGrants);
<<<<<<< HEAD
router.post('/', handlers.assignGrant);
/** Callers should encodeURIComponent the capability for client compatibility (e.g. manage%3Aconfigs%3Aendpoints). */
router.delete('/:principalType/:principalId/:capability', handlers.revokeGrant);
=======
/** Only the mutations read `permissions.lease*` from the loaded config. */
router.post('/', configMiddleware, handlers.assignGrant);
/** Callers should encodeURIComponent the capability for client compatibility (e.g. manage%3Aconfigs%3Aendpoints). */
router.delete('/:principalType/:principalId/:capability', configMiddleware, handlers.revokeGrant);
>>>>>>> upstream/main

module.exports = router;
