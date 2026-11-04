const { ResourceType } = require('librechat-data-provider');
<<<<<<< HEAD
const { canAccessResource } = require('./canAccessResource');
const { getPrompt } = require('~/models');

/**
 * Prompt to PromptGroup ID resolver function
 * Resolves prompt ID to its parent promptGroup ID
 *
 * @param {string} promptId - Prompt ID from route parameter
 * @returns {Promise<Object|null>} Object with promptGroup's _id field, or null if not found
 */
const resolvePromptToGroupId = async (promptId) => {
  const prompt = await getPrompt({ _id: promptId });
  if (!prompt || !prompt.groupId) {
    return null;
  }
  // Return an object with _id that matches the promptGroup ID
  return { _id: prompt.groupId };
};
=======
const { createPromptAccessResolvers } = require('@librechat/api');
const { canAccessResource } = require('./canAccessResource');
const db = require('~/models');

const { resolvePromptViaGroup } = createPromptAccessResolvers(db);
>>>>>>> upstream/main

/**
 * Middleware factory that checks promptGroup permissions when accessing individual prompts.
 * This allows permission management at the promptGroup level while still supporting
<<<<<<< HEAD
 * individual prompt access patterns.
=======
 * individual prompt access patterns. On success, the loaded revision is available as
 * `req.resourceAccess.resourceInfo.prompt`.
>>>>>>> upstream/main
 *
 * @param {Object} options - Configuration options
 * @param {number} options.requiredPermission - The permission bit required (1=view, 2=edit, 4=delete, 8=share)
 * @param {string} [options.resourceIdParam='promptId'] - The name of the route parameter containing the prompt ID
 * @returns {Function} Express middleware function
<<<<<<< HEAD
 *
 * @example
 * // Check promptGroup permissions when viewing a prompt
 * router.get('/prompts/:promptId',
 *   canAccessPromptViaGroup({ requiredPermission: 1 }),
 *   getPrompt
 * );
=======
>>>>>>> upstream/main
 */
const canAccessPromptViaGroup = (options) => {
  const { requiredPermission, resourceIdParam = 'promptId' } = options;

  if (!requiredPermission || typeof requiredPermission !== 'number') {
    throw new Error('canAccessPromptViaGroup: requiredPermission is required and must be a number');
  }

  return canAccessResource({
    resourceType: ResourceType.PROMPTGROUP,
    requiredPermission,
    resourceIdParam,
<<<<<<< HEAD
    idResolver: resolvePromptToGroupId,
=======
    idResolver: resolvePromptViaGroup,
>>>>>>> upstream/main
  });
};

module.exports = {
  canAccessPromptViaGroup,
};
