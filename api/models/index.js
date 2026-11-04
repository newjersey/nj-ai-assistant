const mongoose = require('mongoose');
const { createMethods } = require('@librechat/data-schemas');
<<<<<<< HEAD
const { matchModelName, findMatchingPattern, isDeploymentSkillId } = require('@librechat/api');
const getLogStores = require('~/cache/getLogStores');

=======
const {
  matchModelName,
  findMatchingPattern,
  isDeploymentSkillId,
  createMessageBudgetReader,
} = require('@librechat/api');
const getLogStores = require('~/cache/getLogStores');

const messageBudget = createMessageBudgetReader();

>>>>>>> upstream/main
const methods = createMethods(mongoose, {
  matchModelName,
  findMatchingPattern,
  isExternalSkillId: isDeploymentSkillId,
  getCache: getLogStores,
<<<<<<< HEAD
=======
  getMCPAppMessageBudget: messageBudget.getBudget,
>>>>>>> upstream/main
});

const seedDatabase = async () => {
  await methods.initializeRoles();
  await methods.seedDefaultRoles();
  await methods.ensureDefaultCategories();
  await methods.seedSystemGrants();
};

module.exports = {
  ...methods,
<<<<<<< HEAD
=======
  initializeMessageBudget: messageBudget.initialize,
>>>>>>> upstream/main
  seedDatabase,
};
