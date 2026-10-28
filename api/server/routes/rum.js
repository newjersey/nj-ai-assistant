const express = require('express');
<<<<<<< HEAD
const { getRumProxyBodyLimit, isRumProxyEnabled, proxyRumRequest } = require('@librechat/api');
const { requireRumProxyAuth } = require('~/server/middleware');
=======
const {
  limiterCache,
  proxyRumRequest,
  requireRumProxyEnabled,
  getRumProxyBodyLimit,
  requireRumLogsEnabled,
  handleJsonParseError,
  createRumProxyLimiter,
  loadRumConfig,
} = require('@librechat/api');
const { requireRumProxyAuth } = require('~/server/middleware');
const { getAppConfig } = require('~/server/services/Config/app');
>>>>>>> upstream/main

const router = express.Router();
const rawOtlpBody = express.raw({
  limit: getRumProxyBodyLimit(),
  type: ['application/x-protobuf', 'application/octet-stream'],
});

<<<<<<< HEAD
function requireRumProxyEnabled(_req, res, next) {
  if (!isRumProxyEnabled()) {
    return res.status(404).json({ message: 'RUM proxy is not configured' });
  }

  return next();
}

router.post(
  '/v1/traces',
  requireRumProxyEnabled,
  requireRumProxyAuth,
  rawOtlpBody,
  proxyRumRequest,
);
router.post('/v1/logs', requireRumProxyEnabled, requireRumProxyAuth, rawOtlpBody, proxyRumRequest);
=======
const rumProxyLimiter = createRumProxyLimiter({ store: limiterCache('rum_proxy_user_limiter') });
const proxyTelemetry = (req, res) => proxyRumRequest(req, res, process.env.RUM_PROXY_AUTHORIZATION);
const telemetryPipeline = [
  requireRumProxyAuth,
  rumProxyLimiter,
  loadRumConfig(getAppConfig),
  requireRumProxyEnabled,
];
const proxyPipeline = [
  express.json({ limit: getRumProxyBodyLimit() }),
  rawOtlpBody,
  handleJsonParseError,
  proxyTelemetry,
];

router.post('/v1/traces', ...telemetryPipeline, ...proxyPipeline);
router.post('/v1/logs', ...telemetryPipeline, requireRumLogsEnabled, ...proxyPipeline);
>>>>>>> upstream/main

module.exports = router;
