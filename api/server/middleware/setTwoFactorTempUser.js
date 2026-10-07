<<<<<<< HEAD
const jwt = require('jsonwebtoken');

const setTwoFactorTempUser = (req, _res, next) => {
  if (req.user?.id || req.user?._id) {
    return next();
  }

  const { tempToken } = req.body ?? {};
  if (!tempToken) {
    return next();
  }

  try {
    const payload = jwt.verify(tempToken, process.env.JWT_SECRET);
    if (payload?.userId) {
      req.user = { id: payload.userId };
    }
  } catch {
    return next();
  }

  return next();
};

module.exports = setTwoFactorTempUser;
=======
const { createTwoFactorTempUser } = require('@librechat/api');

const setTwoFactorTempUser = createTwoFactorTempUser('tempToken', process.env);
module.exports = setTwoFactorTempUser;
module.exports.setTwoFactorAcknowledgementTempUser = createTwoFactorTempUser(
  'acknowledgementToken',
  process.env,
);
module.exports.setTwoFactorFinalizationTempUser = createTwoFactorTempUser(
  'finalizationToken',
  process.env,
);
>>>>>>> upstream/main
