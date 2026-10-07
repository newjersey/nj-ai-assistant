const express = require('express');
const { createUserPreferencesHandler } = require('@librechat/api');
const {
  updateUserPluginsController,
  resendVerificationController,
  getTermsStatusController,
  acceptTermsController,
  verifyEmailController,
<<<<<<< HEAD
=======
  requestEmailChangeController,
  confirmEmailChangeController,
>>>>>>> upstream/main
  deleteUserController,
  getUserController,
} = require('~/server/controllers/UserController');
const {
  verifyEmailLimiter,
<<<<<<< HEAD
  verifyEmailSubmissionLimiter,
  configMiddleware,
=======
  emailChangeLimiter,
  emailChangeSubmissionLimiter,
  emailChangeSubmissionIpLimiter,
  verifyEmailSubmissionLimiter,
  configMiddleware,
  strictConfigMiddleware,
>>>>>>> upstream/main
  canDeleteAccount,
  requireJwtAuth,
} = require('~/server/middleware');

const settings = require('./settings');
const { updateUserStatefulCodeEnvironment } = require('~/models');

const router = express.Router();

const updateUserPreferences = createUserPreferencesHandler({
  updateStatefulCodeEnvironment: updateUserStatefulCodeEnvironment,
});

router.use('/settings', settings);
router.get('/', requireJwtAuth, getUserController);
router.patch('/preferences', requireJwtAuth, configMiddleware, updateUserPreferences);
router.get('/terms', requireJwtAuth, getTermsStatusController);
router.post('/terms/accept', requireJwtAuth, acceptTermsController);
router.post('/plugins', requireJwtAuth, updateUserPluginsController);
router.delete('/delete', requireJwtAuth, canDeleteAccount, configMiddleware, deleteUserController);
<<<<<<< HEAD
=======
router.post(
  '/email/change',
  requireJwtAuth,
  emailChangeLimiter,
  strictConfigMiddleware,
  requestEmailChangeController,
);
router.post(
  '/email/verify',
  emailChangeSubmissionIpLimiter,
  emailChangeSubmissionLimiter,
  confirmEmailChangeController,
);
>>>>>>> upstream/main
router.post('/verify', verifyEmailSubmissionLimiter, verifyEmailController);
router.post('/verify/resend', verifyEmailLimiter, resendVerificationController);

module.exports = router;
