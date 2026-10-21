const mongoose = require('mongoose');
<<<<<<< HEAD
const { logger } = require('@librechat/data-schemas');
=======
const { logger, warnOnMissingSearchTokens } = require('@librechat/data-schemas');
>>>>>>> upstream/main
const {
  logAgentMigrationWarning,
  logPromptMigrationWarning,
  checkAgentPermissionsMigration,
  checkPromptPermissionsMigration,
} = require('@librechat/api');
const { findRoleByIdentifier } = require('~/models');

/**
 * Check if permissions migrations are needed for shared resources
 * This runs at the end to ensure all systems are initialized
 */
async function checkMigrations() {
<<<<<<< HEAD
=======
  /** Started first so it overlaps the permission checks; it logs its own failures. */
  const searchTokens = warnOnMissingSearchTokens(mongoose.connection);
>>>>>>> upstream/main
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
<<<<<<< HEAD
=======
  await searchTokens;
>>>>>>> upstream/main
}

module.exports = {
  checkMigrations,
};
