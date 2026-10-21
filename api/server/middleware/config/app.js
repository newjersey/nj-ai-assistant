const { logger } = require('@librechat/data-schemas');
<<<<<<< HEAD
const { getAppConfigOptionsFromUser } = require('@librechat/api');
=======
const {
  getSafeErrorMetadata,
  resolveStrictAppConfig,
  getAppConfigOptionsFromUser,
  createStreamKeepaliveLoader,
} = require('@librechat/api');
>>>>>>> upstream/main
const { getAppConfig } = require('~/server/services/Config');

const configMiddleware = async (req, res, next) => {
  try {
    req.config = await getAppConfig(getAppConfigOptionsFromUser(req.user));

    next();
  } catch (error) {
    logger.error('Config middleware error:', {
<<<<<<< HEAD
      error: error.message,
=======
      error: getSafeErrorMetadata(error),
>>>>>>> upstream/main
      userRole: req.user?.role,
      path: req.path,
    });

    try {
      req.config = await getAppConfig({ tenantId: req.user?.tenantId });
      next();
    } catch (fallbackError) {
<<<<<<< HEAD
      logger.error('Fallback config middleware error:', fallbackError);
=======
      logger.error('Fallback config middleware error:', getSafeErrorMetadata(fallbackError));
>>>>>>> upstream/main
      next(fallbackError);
    }
  }
};

<<<<<<< HEAD
module.exports = configMiddleware;
=======
/** The same resolution, without the fallback; `resolveStrictAppConfig` owns that choice. */
const strictConfigMiddleware = async (req, res, next) => {
  try {
    req.config = await resolveStrictAppConfig(getAppConfig, req.user);
    next();
  } catch (error) {
    logger.error('Strict config middleware error:', {
      error: getSafeErrorMetadata(error),
      userRole: req.user?.role,
      path: req.path,
    });
    next(error);
  }
};

module.exports = configMiddleware;
module.exports.strictConfigMiddleware = strictConfigMiddleware;
module.exports.loadStreamKeepaliveMs = createStreamKeepaliveLoader(getAppConfig);
>>>>>>> upstream/main
