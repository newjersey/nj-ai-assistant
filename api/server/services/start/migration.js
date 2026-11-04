const mongoose = require('mongoose');
<<<<<<< HEAD
const { logger } = require('@librechat/data-schemas');
const {
  logAgentMigrationWarning,
  logPromptMigrationWarning,
=======
const { runAsSystem, warnOnMissingSearchTokens } = require('@librechat/data-schemas');
const {
  checkStartupMigrations,
>>>>>>> upstream/main
  checkAgentPermissionsMigration,
  checkPromptPermissionsMigration,
} = require('@librechat/api');
const { findRoleByIdentifier } = require('~/models');

/**
 * Check if permissions migrations are needed for shared resources
 * This runs at the end to ensure all systems are initialized
 */
<<<<<<< HEAD
async function checkMigrations() {
  try {
    const agentMigrationResult = await checkAgentPermissionsMigration({
      mongoose,
      methods: {
        findRoleByIdentifier,
      },
      AgentModel: mongoose.models.Agent,
    });
    logAgentMigrationWarning(agentMigrationResult);
  } catch (error) {
    logger.error('Failed to check agent permissions migration:', error);
  }
  try {
    const promptMigrationResult = await checkPromptPermissionsMigration({
      mongoose,
      methods: {
        findRoleByIdentifier,
      },
      PromptGroupModel: mongoose.models.PromptGroup,
    });
    logPromptMigrationWarning(promptMigrationResult);
  } catch (error) {
    logger.error('Failed to check prompt permissions migration:', error);
  }
}

module.exports = {
  checkMigrations,
=======
const checkMigrations = () =>
  checkStartupMigrations({
    probeSearchTokens: () => warnOnMissingSearchTokens(mongoose.connection),
    checkAgentPermissions: () =>
      checkAgentPermissionsMigration({
        mongoose,
        methods: { findRoleByIdentifier },
        AgentModel: mongoose.models.Agent,
      }),
    checkPromptPermissions: () =>
      checkPromptPermissionsMigration({
        mongoose,
        methods: { findRoleByIdentifier },
        PromptGroupModel: mongoose.models.PromptGroup,
      }),
  });

module.exports = {
  checkMigrations: () => runAsSystem(checkMigrations),
>>>>>>> upstream/main
};
