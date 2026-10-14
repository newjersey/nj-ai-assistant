<<<<<<< HEAD
const validatePasswordReset = require('./validatePasswordReset');
const setTwoFactorTempUser = require('./setTwoFactorTempUser');
=======
const blockRetiredSetupToken = require('./blockRetiredSetupToken');
const validatePasswordReset = require('./validatePasswordReset');
const setTwoFactorTempUser = require('./setTwoFactorTempUser');
const { setTwoFactorAcknowledgementTempUser, setTwoFactorFinalizationTempUser } =
  setTwoFactorTempUser;
>>>>>>> upstream/main
const validateRegistration = require('./validateRegistration');
const buildEndpointOption = require('./buildEndpointOption');
const validateEmailLogin = require('./validateEmailLogin');
const validateMessageReq = require('./validateMessageReq');
const {
  canReadActiveJobConversation,
<<<<<<< HEAD
=======
  createMessageRequestValidation,
>>>>>>> upstream/main
  prepareMessageRequestValidation,
  sendValidationResponse,
} = require('./messageValidation');
const checkDomainAllowed = require('./checkDomainAllowed');
const { markOAuthNavigation } = require('./oauthNavigation');
const requireSameOrigin = require('./requireSameOrigin');
const requireLocalAuth = require('./requireLocalAuth');
const canDeleteAccount = require('./canDeleteAccount');
const accessResources = require('./accessResources');
const requireLdapAuth = require('./requireLdapAuth');
const abortMiddleware = require('./abortMiddleware');
const checkInviteUser = require('./checkInviteUser');
const requireJwtAuth = require('./requireJwtAuth');
const { requireRumProxyAuth } = require('./requireJwtAuth');
const configMiddleware = require('./config/app');
<<<<<<< HEAD
=======
const { strictConfigMiddleware } = require('./config/app');
>>>>>>> upstream/main
const validateModel = require('./validateModel');
const moderateText = require('./moderateText');
const logHeaders = require('./logHeaders');
const setHeaders = require('./setHeaders');
const validate = require('./validate');
const limiters = require('./limiters');
const uaParser = require('./uaParser');
const checkBan = require('./checkBan');
const noIndex = require('./noIndex');
const roles = require('./roles');

module.exports = {
  ...abortMiddleware,
  ...validate,
  ...limiters,
  ...roles,
  ...accessResources,
  noIndex,
  checkBan,
  uaParser,
  setHeaders,
  logHeaders,
  markOAuthNavigation,
  moderateText,
  validateModel,
  requireJwtAuth,
  requireRumProxyAuth,
  setTwoFactorTempUser,
<<<<<<< HEAD
=======
  setTwoFactorAcknowledgementTempUser,
  setTwoFactorFinalizationTempUser,
  blockRetiredSetupToken,
>>>>>>> upstream/main
  checkInviteUser,
  requireLdapAuth,
  requireLocalAuth,
  requireSameOrigin,
  canDeleteAccount,
  configMiddleware,
<<<<<<< HEAD
=======
  strictConfigMiddleware,
>>>>>>> upstream/main
  checkDomainAllowed,
  validateMessageReq,
  canReadActiveJobConversation,
  sendValidationResponse,
<<<<<<< HEAD
=======
  createMessageRequestValidation,
>>>>>>> upstream/main
  prepareMessageRequestValidation,
  buildEndpointOption,
  validateRegistration,
  validatePasswordReset,
  validateEmailLogin,
};
