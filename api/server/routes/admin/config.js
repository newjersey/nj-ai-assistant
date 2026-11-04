const express = require('express');
<<<<<<< HEAD
const { createAdminConfigHandlers } = require('@librechat/api');
=======
const {
  rejectUnsafeConfigKeys,
  createAdminConfigHandlers,
  allowBeforeTermsAcceptance,
  createAdminConfigReadHandlers,
  createAdminConfigCatalogHandlers,
} = require('@librechat/api');
>>>>>>> upstream/main
const { SystemCapabilities } = require('@librechat/data-schemas');
const {
  hasCapability,
  requireCapability,
  hasConfigCapability,
  hasAnyConfigReadAccess,
  getReadableConfigSections,
} = require('~/server/middleware/roles/capabilities');
<<<<<<< HEAD
const { getAppConfig, invalidateConfigCaches } = require('~/server/services/Config');
=======
const {
  getAppConfig,
  getCachedTools,
  overrideCacheTtl,
  loadConfigModels,
  loadDefaultModels,
  rederiveEndpoints,
  getEndpointsConfig,
  reloadConfigCaches,
  resolveConfigLayers,
  invalidateConfigCaches,
} = require('~/server/services/Config');
const { availableTools, toolkits } = require('~/app/clients/tools');
>>>>>>> upstream/main
const { requireJwtAuth } = require('~/server/middleware');
const db = require('~/models');

const router = express.Router();

const requireAdminAccess = requireCapability(SystemCapabilities.ACCESS_ADMIN);

const handlers = createAdminConfigHandlers({
  listAllConfigs: db.listAllConfigs,
  findConfigByPrincipal: db.findConfigByPrincipal,
<<<<<<< HEAD
  upsertConfig: db.upsertConfig,
  patchConfigFields: db.patchConfigFields,
  tombstoneConfigField: db.tombstoneConfigField,
  unsetConfigField: db.unsetConfigField,
  deleteConfig: db.deleteConfig,
  toggleConfigActive: db.toggleConfigActive,
=======
  writeConfigDocument: db.writeConfigDocument,
  unsetConfigField: db.unsetConfigField,
  deleteConfig: db.deleteConfig,
  toggleConfigActiveTracked: db.toggleConfigActiveTracked,
  setConfigPriority: db.setConfigPriority,
  principalExists: db.principalExists,
>>>>>>> upstream/main
  hasAnyConfigReadAccess,
  getReadableConfigSections,
  hasConfigCapability,
  hasCapability,
  getAppConfig,
  invalidateConfigCaches,
<<<<<<< HEAD
});

router.use(requireJwtAuth, requireAdminAccess);

router.get('/', handlers.listConfigs);
router.get('/base', handlers.getBaseConfig);
=======
  reloadConfigCaches,
  recordAuditEntry: db.recordAuditEntry,
  auditFailClosed: process.env.AUDIT_LOG_FAIL_CLOSED === 'true',
  overrideCacheTtlMs: overrideCacheTtl,
  overrideEnvAllowlist: process.env.CONFIG_OVERRIDE_ENV_ALLOWLIST,
  rederiveEndpoints,
});

const readHandlers = createAdminConfigReadHandlers({
  findConfigByPrincipal: db.findConfigByPrincipal,
  hasAnyConfigReadAccess,
  getReadableConfigSections,
  hasCapability,
  resolveConfigLayers,
  principalExists: db.principalExists,
  findPrincipalUser: db.findPrincipalUser,
  getUserPrincipals: db.getUserPrincipals,
  getApplicableConfigs: db.getApplicableConfigs,
});

const catalogHandlers = createAdminConfigCatalogHandlers({
  hasAnyConfigReadAccess,
  getReadableConfigSections,
  hasConfigCapability,
  getAppConfig,
  getEndpointsConfig,
  loadDefaultModels,
  loadConfigModels,
  getCachedTools,
  toolManifest: availableTools,
  toolkits,
  principalExists: db.principalExists,
  findConfigByPrincipal: db.findConfigByPrincipal,
  listAllConfigs: db.listAllConfigs,
  overrideEnvAllowlist: process.env.CONFIG_OVERRIDE_ENV_ALLOWLIST,
});

/** Config reads and writes stay open to an admin who has not accepted the terms. */
router.use(allowBeforeTermsAcceptance, requireJwtAuth, requireAdminAccess, rejectUnsafeConfigKeys);

router.get('/', handlers.listConfigs);
router.get('/meta', handlers.getConfigMeta);
router.get('/base', handlers.getBaseConfig);
router.get('/catalog', catalogHandlers.getConfigCatalog);
router.get('/env-status', catalogHandlers.getEnvStatus);
router.get('/effective', readHandlers.getEffectiveConfig);
router.get('/resolved/:principalType/:principalId', readHandlers.getResolvedConfig);
router.post('/reload', handlers.reloadConfig);
>>>>>>> upstream/main
router.get('/:principalType/:principalId', handlers.getConfig);
router.put('/:principalType/:principalId', handlers.upsertConfigOverrides);
router.patch('/:principalType/:principalId/fields', handlers.patchConfigField);
router.post('/:principalType/:principalId/fields/tombstone', handlers.tombstoneConfigField);
router.delete('/:principalType/:principalId/fields', handlers.deleteConfigField);
<<<<<<< HEAD
router.delete('/:principalType/:principalId', handlers.deleteConfigOverrides);
router.patch('/:principalType/:principalId/active', handlers.toggleConfig);
=======
router.post('/:principalType/:principalId/changes', handlers.applyConfigChanges);
router.delete('/:principalType/:principalId', handlers.deleteConfigOverrides);
router.patch('/:principalType/:principalId/active', handlers.toggleConfig);
router.patch('/:principalType/:principalId/priority', handlers.updateConfigPriority);
>>>>>>> upstream/main

module.exports = router;
