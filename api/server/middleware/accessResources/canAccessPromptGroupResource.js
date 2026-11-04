const { ResourceType } = require('librechat-data-provider');
<<<<<<< HEAD
const { canAccessResource } = require('./canAccessResource');
const { getPromptGroup } = require('~/models');

/**
 * PromptGroup ID resolver function
 * Resolves promptGroup ID to MongoDB ObjectId
 *
 * @param {string} groupId - PromptGroup ID from route parameter
 * @returns {Promise<Object|null>} PromptGroup document with _id field, or null if not found
 */
const resolvePromptGroupId = async (groupId) => {
  return await getPromptGroup({ _id: groupId });
};

/**
 * PromptGroup-specific middleware factory that creates middleware to check promptGroup access permissions.
 * This middleware extends the generic canAccessResource to handle promptGroup ID resolution.
=======
const { createPromptAccessResolvers } = require('@librechat/api');
const { canAccessResource } = require('./canAccessResource');
const db = require('~/models');

const { resolvePromptGroup } = createPromptAccessResolvers(db);

/**
 * PromptGroup-specific middleware factory that creates middleware to check promptGroup access permissions.
 * On success, the loaded group is available as `req.resourceAccess.resourceInfo`.
>>>>>>> upstream/main
 *
 * @param {Object} options - Configuration options
 * @param {number} options.requiredPermission - The permission bit required (1=view, 2=edit, 4=delete, 8=share)
 * @param {string} [options.resourceIdParam='groupId'] - The name of the route parameter containing the promptGroup ID
 * @returns {Function} Express middleware function
<<<<<<< HEAD
 *
 * @example
 * // Basic usage for viewing promptGroups
 * router.get('/prompts/groups/:groupId',
 *   canAccessPromptGroupResource({ requiredPermission: 1 }),
 *   getPromptGroup
 * );
 *
 * @example
 * // Custom resource ID parameter and edit permission
 * router.patch('/prompts/groups/:id',
 *   canAccessPromptGroupResource({
 *     requiredPermission: 2,
 *     resourceIdParam: 'id'
 *   }),
 *   updatePromptGroup
 * );
=======
>>>>>>> upstream/main
 */
const canAccessPromptGroupResource = (options) => {
  const { requiredPermission, resourceIdParam = 'groupId' } = options;

  if (!requiredPermission || typeof requiredPermission !== 'number') {
    throw new Error(
      'canAccessPromptGroupResource: requiredPermission is required and must be a number',
    );
  }

  return canAccessResource({
    resourceType: ResourceType.PROMPTGROUP,
    requiredPermission,
    resourceIdParam,
<<<<<<< HEAD
    idResolver: resolvePromptGroupId,
=======
    idResolver: resolvePromptGroup,
>>>>>>> upstream/main
  });
};

module.exports = {
  canAccessPromptGroupResource,
};
