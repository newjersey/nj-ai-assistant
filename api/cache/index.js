const getLogStores = require('./getLogStores');
const logViolation = require('./logViolation');
<<<<<<< HEAD

module.exports = { getLogStores, logViolation };
=======
const { distributedLock } = require('./distributedLock');

module.exports = { getLogStores, logViolation, distributedLock };
>>>>>>> upstream/main
