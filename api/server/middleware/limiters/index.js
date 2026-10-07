const createTTSLimiters = require('./ttsLimiters');
const createSTTLimiters = require('./sttLimiters');

const loginLimiter = require('./loginLimiter');
<<<<<<< HEAD
=======
const passkeyLimiter = require('./passkeyLimiter');
>>>>>>> upstream/main
const importLimiters = require('./importLimiters');
const uploadLimiters = require('./uploadLimiters');
const forkLimiters = require('./forkLimiters');
const shareLimiters = require('./shareLimiters');
const registerLimiter = require('./registerLimiter');
const toolCallLimiter = require('./toolCallLimiter');
const messageLimiters = require('./messageLimiters');
const promptUsageLimiter = require('./promptUsageLimiter');
const verifyEmailLimiter = require('./verifyEmailLimiter');
<<<<<<< HEAD
const resetPasswordLimiter = require('./resetPasswordLimiter');
const twoFactorTempLimiter = require('./twoFactorTempLimiter');
const verifyEmailSubmissionLimiter = require('./verifyEmailSubmissionLimiter');
const resetPasswordSubmissionLimiter = require('./resetPasswordSubmissionLimiter');

=======
const emailChangeLimiter = require('./emailChangeLimiter');
const emailChangeSubmissionLimiter = require('./emailChangeSubmissionLimiter');
const emailChangeSubmissionIpLimiter = require('./emailChangeSubmissionIpLimiter');
const resetPasswordLimiter = require('./resetPasswordLimiter');
const twoFactorTempLimiter = require('./twoFactorTempLimiter');
const passkeyStepUpLimiter = require('./passkeyStepUpLimiter');
const verifyEmailSubmissionLimiter = require('./verifyEmailSubmissionLimiter');
const resetPasswordSubmissionLimiter = require('./resetPasswordSubmissionLimiter');

const { twoFactorSetupLimiter } = twoFactorTempLimiter;

>>>>>>> upstream/main
module.exports = {
  ...uploadLimiters,
  ...importLimiters,
  ...messageLimiters,
  ...forkLimiters,
  ...shareLimiters,
  ...promptUsageLimiter,
  loginLimiter,
<<<<<<< HEAD
=======
  passkeyLimiter,
  passkeyStepUpLimiter,
>>>>>>> upstream/main
  registerLimiter,
  toolCallLimiter,
  createTTSLimiters,
  createSTTLimiters,
  verifyEmailLimiter,
<<<<<<< HEAD
=======
  emailChangeLimiter,
  emailChangeSubmissionLimiter,
  emailChangeSubmissionIpLimiter,
>>>>>>> upstream/main
  resetPasswordLimiter,
  verifyEmailSubmissionLimiter,
  resetPasswordSubmissionLimiter,
  twoFactorTempLimiter,
<<<<<<< HEAD
=======
  twoFactorSetupLimiter,
>>>>>>> upstream/main
};
