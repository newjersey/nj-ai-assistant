const { CacheKeys } = require('librechat-data-provider');
const { MCPOAuthHandler, MCPTokenStorage, cleanupMCPServerOAuth } = require('@librechat/api');
const { getFlowStateManager, getMCPServersRegistry } = require('~/config');
const { getLogStores } = require('~/cache');
const db = require('~/models');

<<<<<<< HEAD
=======
/** Revocation must still reach a server the owner's profile hides. */
const INCLUDE_HIDDEN = { includeHidden: true };

>>>>>>> upstream/main
const maybeUninstallOAuthMCP = async (userId, pluginKey, appConfig, serverConfigOverride) => {
  const registry = getMCPServersRegistry();
  return cleanupMCPServerOAuth({
    userId,
    pluginKey,
    appConfig,
    serverConfigOverride,
    dependencies: {
      flowManager: getFlowStateManager(getLogStores(CacheKeys.FLOWS)),
      oauthHandler: MCPOAuthHandler,
      tokenStorage: MCPTokenStorage,
      findToken: db.findToken,
      deleteTokens: db.deleteTokens,
<<<<<<< HEAD
      getServerConfig: (serverName, ownerId) => registry.getServerConfig(serverName, ownerId),
      isRegisteredOAuthServer: async (serverName, ownerId) =>
        (await registry.getOAuthServers(ownerId)).has(serverName),
=======
      getServerConfig: (serverName, ownerId) =>
        registry.getServerConfig(serverName, ownerId, undefined, undefined, INCLUDE_HIDDEN),
      isRegisteredOAuthServer: async (serverName, ownerId) =>
        (await registry.getOAuthServers(ownerId, INCLUDE_HIDDEN)).has(serverName),
>>>>>>> upstream/main
    },
  });
};

module.exports = { maybeUninstallOAuthMCP };
