const { createSkillsHandlers } = require('@librechat/api');
const { isValidObjectIdString } = require('@librechat/data-schemas');
const { PermissionBits } = require('librechat-data-provider');
<<<<<<< HEAD
const { createSkill, updateSkill, deleteSkill, deleteSkillFile } = require('~/models');
=======
const { createSkill, updateSkill, deleteSkillFile } = require('~/models');
>>>>>>> upstream/main
const {
  findAccessibleResources,
  findPubliclyAccessibleResources,
  hasPublicPermission,
  grantPermission,
} = require('~/server/services/PermissionService');
const {
  getSkillDbMethods,
  withDeploymentSkillIds,
  getSkillStrategyFunctions,
} = require('~/server/services/Endpoints/agents/skillDeps');
<<<<<<< HEAD
=======
const { deleteSkillById, deleteSkillForLegacy } = require('./deletion');
>>>>>>> upstream/main

function getSkillsHandlers() {
  const skillDbMethods = getSkillDbMethods();
  return createSkillsHandlers({
    createSkill,
    getSkillById: skillDbMethods.getSkillById,
    listSkillsByAccess: skillDbMethods.listSkillsByAccess,
    updateSkill,
<<<<<<< HEAD
    deleteSkill,
=======
    deleteSkill: deleteSkillForLegacy,
    deleteSkillById,
>>>>>>> upstream/main
    listSkillFiles: skillDbMethods.listSkillFiles,
    deleteSkillFile,
    getSkillFileByPath: skillDbMethods.getSkillFileByPath,
    updateSkillFileContent: skillDbMethods.updateSkillFileContent,
    getStrategyFunctions: getSkillStrategyFunctions,
    findAccessibleResources: async (params) =>
      params.resourceType === 'skill' && params.requiredPermissions === PermissionBits.VIEW
        ? withDeploymentSkillIds(await findAccessibleResources(params))
        : findAccessibleResources(params),
    findPubliclyAccessibleResources: async (params) =>
      params.resourceType === 'skill' && params.requiredPermissions === PermissionBits.VIEW
        ? withDeploymentSkillIds(await findPubliclyAccessibleResources(params))
        : findPubliclyAccessibleResources(params),
    hasPublicPermission: async (params) =>
      params.resourceType === 'skill' && params.requiredPermissions === PermissionBits.VIEW
        ? withDeploymentSkillIds([]).some((id) => id.toString() === params.resourceId.toString()) ||
          hasPublicPermission(params)
        : hasPublicPermission(params),
    grantPermission,
    isValidObjectIdString,
  });
}
module.exports = { getSkillsHandlers };
