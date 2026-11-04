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
<<<<<<< HEAD
const { requireRumProxyAuth } = require('./requireJwtAuth');
const configMiddleware = require('./config/app');
=======
const { requireRumProxyAuth, requireTermsAcceptance } = require('./requireJwtAuth');
const configMiddleware = require('./config/app');
const { strictConfigMiddleware, loadStreamKeepaliveMs } = require('./config/app');
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
<<<<<<< HEAD
const roles = require('./roles');
=======
>>>>>>> upstream/main

module.exports = {
  ...abortMiddleware,
  ...validate,
  ...limiters,
<<<<<<< HEAD
  ...roles,
=======
>>>>>>> upstream/main
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
<<<<<<< HEAD
  setTwoFactorTempUser,
=======
  requireTermsAcceptance,
  setTwoFactorTempUser,
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
  loadStreamKeepaliveMs,
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
