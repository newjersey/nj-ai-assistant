<<<<<<< HEAD
=======
/** Account deletion converts the id for ObjectId-keyed stores, so it must be a valid one. */
const USER_ID = '65f1a2b3c4d5e6f708192a3b';
>>>>>>> upstream/main
const mockGetUserById = jest.fn();
const mockDeleteMessages = jest.fn();
const mockDeleteAllUserSessions = jest.fn();
const mockDeleteUserById = jest.fn();
const mockDeleteAllSharedLinks = jest.fn();
const mockDeleteAllSharedLinksWithCleanup = jest.fn();
const mockDeletePresets = jest.fn();
const mockDeleteUserKey = jest.fn();
const mockDeleteConvos = jest.fn();
const mockDeleteFiles = jest.fn();
const mockGetFiles = jest.fn();
const mockUpdateUserPlugins = jest.fn();
const mockUpdateUser = jest.fn();
const mockFindToken = jest.fn();
const mockVerifyOTPOrBackupCode = jest.fn();
<<<<<<< HEAD
const mockDeleteUserPluginAuth = jest.fn();
=======
const mockDeleteAllUserPluginAuths = jest.fn();
>>>>>>> upstream/main
const mockProcessDeleteRequest = jest.fn();
const mockDeleteToolCalls = jest.fn();
const mockDeleteUserAgents = jest.fn();
const mockDeleteUserPrompts = jest.fn();
const mockDeleteUserSkills = jest.fn();
const mockDeleteUserCodeEnvironments = jest.fn();
const mockInvalidateCodeEnvironmentConfigCache = jest.fn();
const mockGetCleanupBlockingJobIdsForUser = jest.fn();
const mockGetAgentJob = jest.fn();
const mockAbortJob = jest.fn();
const mockDrainAgentTriggerDeliveriesForUser = jest.fn();
const mockPrepareAgentTriggerUserPurge = jest.fn();
const mockCancelAgentTriggerUserPurge = jest.fn();
const mockPurgeAgentTriggerDeliveriesForUser = jest.fn();
const mockBeginAgentTriggerUserDeletion = jest.fn();
const mockCancelAgentTriggerUserDeletion = jest.fn();
const mockCancelAndDrainSubagentThreads = jest.fn();
const mockQuiesceUserSchedules = jest.fn();
const mockDeleteSchedulesByUser = jest.fn();
const mockRevokeUserCodeEnvironmentWorkers = jest.fn();
<<<<<<< HEAD
=======
const mockDeletePasskeysByUser = jest.fn();

jest.mock('../../../../packages/api/src/mcp/oauth/cleanup', () => ({
  cleanupDeletedMCPServerOAuthUsers: jest.fn(),
  prepareMCPServerOAuthDeletion: jest.fn(),
}));
>>>>>>> upstream/main

jest.mock('@librechat/data-schemas', () => ({
  logger: { error: jest.fn(), info: jest.fn() },
  webSearchKeys: [],
}));

jest.mock('librechat-data-provider', () => ({
  Tools: {},
  CacheKeys: {},
  Constants: { mcp_delimiter: '::', mcp_prefix: 'mcp_' },
  FileSources: {},
}));

jest.mock('@librechat/api', () => ({
<<<<<<< HEAD
=======
  clearSessionHintCookie: jest.fn(),
  createEmailChangeService: jest.fn(() => ({
    requestEmailChange: jest.fn(),
    confirmEmailChange: jest.fn(),
  })),
  createEmailChangeDeps: jest.fn(() => ({})),
>>>>>>> upstream/main
  MCPOAuthHandler: {},
  MCPTokenStorage: {},
  normalizeHttpError: jest.fn(),
  extractWebSearchEnvVars: jest.fn(),
  needsRefresh: jest.fn(),
  getNewS3URL: jest.fn(),
  deleteAllSharedLinksWithCleanup: (...args) => mockDeleteAllSharedLinksWithCleanup(...args),
<<<<<<< HEAD
=======
  eraseUserData: jest.requireActual('../../../../packages/api/src/user/erasure.ts').eraseUserData,
>>>>>>> upstream/main
  revokeUserCodeEnvironmentWorkers: (...args) => mockRevokeUserCodeEnvironmentWorkers(...args),
  GenerationJobManager: {
    getAccountCleanupJobIdsForUser: (...args) => mockGetCleanupBlockingJobIdsForUser(...args),
    getCleanupJob: (...args) => mockGetAgentJob(...args),
    abortJob: (...args) => mockAbortJob(...args),
  },
  getOwnedAgentCheckpointScope: jest.fn(() => undefined),
<<<<<<< HEAD
  isStopConfirmed: jest.fn(
    (result) => result?.success === true || result?.failureReason === 'already_settled',
  ),
  deleteOwnedAgentCheckpoints: jest.fn(),
  waitForGenerationPersistence: jest.requireActual(
    '../../../../packages/api/src/stream/persistence.ts',
  ).waitForGenerationPersistence,
=======
  deleteOwnedAgentCheckpoints: jest.fn(),
  stopUserGenerations: jest.requireActual('../../../../packages/api/src/user/generations.ts')
    .stopUserGenerations,
>>>>>>> upstream/main
  openCheckpointDeletion: jest.fn(async (userId, tenantId, _root, cfg) => ({
    remember: jest.fn(),
    cleanup: () =>
      jest
        .requireMock('@librechat/api')
        .deleteOwnedAgentCheckpoints(userId, tenantId, undefined, cfg),
    acknowledge: jest.fn(),
  })),
}));

jest.mock('~/models', () => ({
  deleteAllUserSessions: (...args) => mockDeleteAllUserSessions(...args),
<<<<<<< HEAD
  deleteAllSharedLinks: (...args) => mockDeleteAllSharedLinks(...args),
  updateUserPlugins: (...args) => mockUpdateUserPlugins(...args),
  deleteUserById: (...args) => mockDeleteUserById(...args),
=======
  deletePasskeysByUser: (...args) => mockDeletePasskeysByUser(...args),
  deleteAllSharedLinks: (...args) => mockDeleteAllSharedLinks(...args),
  updateUserPlugins: (...args) => mockUpdateUserPlugins(...args),
  deleteUserById: (...args) => mockDeleteUserById(...args),
  deleteAllUserPluginAuths: (...args) => mockDeleteAllUserPluginAuths(...args),
>>>>>>> upstream/main
  beginAgentTriggerUserDeletion: (...args) => mockBeginAgentTriggerUserDeletion(...args),
  cancelAgentTriggerUserDeletion: (...args) => mockCancelAgentTriggerUserDeletion(...args),
  deleteMessages: (...args) => mockDeleteMessages(...args),
  deletePresets: (...args) => mockDeletePresets(...args),
  deleteUserKey: (...args) => mockDeleteUserKey(...args),
  getUserById: (...args) => mockGetUserById(...args),
  deleteConvos: (...args) => mockDeleteConvos(...args),
  deleteFiles: (...args) => mockDeleteFiles(...args),
  updateUser: (...args) => mockUpdateUser(...args),
  findToken: (...args) => mockFindToken(...args),
  getFiles: (...args) => mockGetFiles(...args),
  deleteToolCalls: (...args) => mockDeleteToolCalls(...args),
  deleteUserAgents: (...args) => mockDeleteUserAgents(...args),
  deleteUserPrompts: (...args) => mockDeleteUserPrompts(...args),
  deleteUserSkills: (...args) => mockDeleteUserSkills(...args),
  deleteUserCodeEnvironments: (...args) => mockDeleteUserCodeEnvironments(...args),
  deleteTransactions: jest.fn(),
  deleteBalances: jest.fn(),
  deleteAllAgentApiKeys: jest.fn(),
  deleteAssistants: jest.fn(),
  deleteConversationTags: jest.fn(),
  deleteAllUserMemories: jest.fn(),
  deleteActions: jest.fn(),
  deleteTokens: jest.fn(),
  removeUserFromAllGroups: jest.fn(),
  deleteAclEntries: jest.fn(),
<<<<<<< HEAD
  deleteSchedulesByUser: (...args) => mockDeleteSchedulesByUser(...args),
  getSoleOwnedResourceIds: jest.fn().mockResolvedValue([]),
=======
  deleteUserChatProjects: jest.fn(),
  deleteUserToolFavorites: jest.fn(),
  deleteRefreshTokenBridges: jest.fn(),
  deleteAllAgentQueuedTurnsForUser: jest.fn(),
  deleteSchedulesByUser: (...args) => mockDeleteSchedulesByUser(...args),
  getSoleOwnedResourceIds: jest.fn().mockResolvedValue([]),
  findUserErasableMCPServers: jest.fn().mockResolvedValue([]),
  deleteMCPServersWithAcl: jest.fn(),
>>>>>>> upstream/main
}));

jest.mock('~/server/services/PluginService', () => ({
  updateUserPluginAuth: jest.fn(),
<<<<<<< HEAD
  deleteUserPluginAuth: (...args) => mockDeleteUserPluginAuth(...args),
=======
  deleteUserPluginAuth: jest.fn(),
>>>>>>> upstream/main
}));

jest.mock('~/server/services/twoFactorService', () => ({
  verifyOTPOrBackupCode: (...args) => mockVerifyOTPOrBackupCode(...args),
}));

jest.mock('~/server/services/AuthService', () => ({
  verifyEmail: jest.fn(),
  resendVerificationEmail: jest.fn(),
}));

jest.mock('~/config', () => ({
  getMCPManager: jest.fn(),
  getFlowStateManager: jest.fn(),
  getMCPServersRegistry: jest.fn(),
}));

jest.mock('~/server/services/Config/getCachedTools', () => ({
  invalidateCachedTools: jest.fn(),
}));

jest.mock('~/server/services/MCPAuthorizationFenceRetry', () => ({
  clearMCPAuthorizationFenceRetry: jest.fn(),
  persistMCPAuthorizationFenceRetry: jest.fn(),
}));

jest.mock('~/server/services/Files/process', () => ({
  processDeleteRequest: (...args) => mockProcessDeleteRequest(...args),
}));

jest.mock('~/server/services/Agents/triggers', () => ({
  drainAgentTriggerDeliveriesForUser: (...args) => mockDrainAgentTriggerDeliveriesForUser(...args),
  prepareAgentTriggerUserPurge: (...args) => mockPrepareAgentTriggerUserPurge(...args),
  cancelAgentTriggerUserPurge: (...args) => mockCancelAgentTriggerUserPurge(...args),
  purgeAgentTriggerDeliveriesForUser: (...args) => mockPurgeAgentTriggerDeliveriesForUser(...args),
}));

jest.mock('~/server/services/Endpoints/agents/subagentThreadStore', () => ({
  cancelAndDrainForOwner: (...args) => mockCancelAndDrainSubagentThreads(...args),
}));

jest.mock('~/server/services/Schedules', () => ({
  quiesceUserSchedules: (...args) => mockQuiesceUserSchedules(...args),
}));

jest.mock('~/server/services/Config', () => ({
  getAppConfig: jest.fn().mockResolvedValue({}),
  invalidateCodeEnvironmentConfigCache: (...args) =>
    mockInvalidateCodeEnvironmentConfigCache(...args),
}));

jest.mock('~/cache', () => ({
  getLogStores: jest.fn(),
}));

const { deleteUserController } = require('~/server/controllers/UserController');
<<<<<<< HEAD
const { deleteOwnedAgentCheckpoints } = require('@librechat/api');
=======
const { deleteOwnedAgentCheckpoints, clearSessionHintCookie } = require('@librechat/api');
>>>>>>> upstream/main

function createRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
}

function stubDeletionMocks() {
  mockDeleteMessages.mockResolvedValue();
  mockDeleteAllUserSessions.mockResolvedValue();
  mockDeleteUserKey.mockResolvedValue();
  mockDeletePresets.mockResolvedValue();
  mockDeleteConvos.mockResolvedValue();
<<<<<<< HEAD
  mockDeleteUserPluginAuth.mockResolvedValue();
=======
  mockDeleteAllUserPluginAuths.mockResolvedValue();
>>>>>>> upstream/main
  mockDeleteUserById.mockResolvedValue({ deletedCount: 1 });
  mockDeleteAllSharedLinks.mockResolvedValue();
  mockDeleteAllSharedLinksWithCleanup.mockResolvedValue({ deletedCount: 0 });
  mockGetFiles.mockResolvedValue([]);
<<<<<<< HEAD
  mockProcessDeleteRequest.mockResolvedValue({ deletedFileIds: [], failedFileIds: [] });
=======
  mockProcessDeleteRequest.mockImplementation(async ({ files }) => ({
    deletedFileIds: files.map((file) => file.file_id),
    failedFileIds: [],
  }));
>>>>>>> upstream/main
  mockDeleteFiles.mockResolvedValue();
  mockDeleteToolCalls.mockResolvedValue();
  mockDeleteUserAgents.mockResolvedValue();
  mockDeleteUserPrompts.mockResolvedValue();
  mockDeleteUserSkills.mockResolvedValue(0);
  mockInvalidateCodeEnvironmentConfigCache.mockResolvedValue(undefined);
  mockGetCleanupBlockingJobIdsForUser.mockResolvedValue([]);
  mockGetAgentJob.mockResolvedValue(null);
  mockAbortJob.mockResolvedValue({ success: true });
  mockDrainAgentTriggerDeliveriesForUser.mockResolvedValue();
  mockPrepareAgentTriggerUserPurge.mockResolvedValue();
  mockCancelAgentTriggerUserPurge.mockResolvedValue(true);
  mockPurgeAgentTriggerDeliveriesForUser.mockResolvedValue();
  mockBeginAgentTriggerUserDeletion.mockResolvedValue('acquired');
  mockCancelAgentTriggerUserDeletion.mockResolvedValue(true);
  mockCancelAndDrainSubagentThreads.mockResolvedValue();
  mockQuiesceUserSchedules.mockResolvedValue(true);
  mockDeleteSchedulesByUser.mockResolvedValue();
  mockRevokeUserCodeEnvironmentWorkers.mockResolvedValue(0);
<<<<<<< HEAD
=======
  mockDeletePasskeysByUser.mockResolvedValue();
>>>>>>> upstream/main
}

beforeEach(() => {
  jest.clearAllMocks();
  stubDeletionMocks();
});

<<<<<<< HEAD
describe('deleteUserController - 2FA enforcement', () => {
  it('proceeds with deletion when 2FA is not enabled', async () => {
    const req = { user: { id: 'user1', _id: 'user1', email: 'a@b.com' }, body: {} };
    const res = createRes();
    mockGetUserById.mockResolvedValue({ _id: 'user1', twoFactorEnabled: false });
=======
describe('deleteUserController - session hint', () => {
  it('retires the session hint once sessions are revoked, even when a later cleanup fails', async () => {
    const req = { user: { id: USER_ID, _id: USER_ID, email: 'a@b.com' }, body: {} };
    const res = createRes();
    mockGetUserById.mockResolvedValue({ _id: USER_ID, twoFactorEnabled: false });
    mockDeletePresets.mockRejectedValue(new Error('preset store unavailable'));

    await deleteUserController(req, res);

    expect(mockDeleteAllUserSessions).toHaveBeenCalledWith({ userId: USER_ID });
    expect(clearSessionHintCookie).toHaveBeenCalledWith(res);
    expect(mockDeleteAllUserSessions.mock.invocationCallOrder[0]).toBeLessThan(
      clearSessionHintCookie.mock.invocationCallOrder[0],
    );
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('deleteUserController - 2FA enforcement', () => {
  it('deletes stored files when the DELETE arrives without a body', async () => {
    const files = [{ file_id: 'file-1', filepath: '/uploads/a', source: 'local' }];
    const req = { user: { id: USER_ID, _id: USER_ID, email: 'a@b.com' } };
    const res = createRes();
    mockGetUserById.mockResolvedValue({ _id: USER_ID, twoFactorEnabled: false });
    mockGetFiles.mockResolvedValueOnce(files);

    await deleteUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const [{ req: fileRequest, files: deleted }] = mockProcessDeleteRequest.mock.calls[0];
    expect(deleted).toBe(files);
    expect(fileRequest.body).toEqual({});
    expect(fileRequest.user).toBe(req.user);
  });

  it.each(['reported', 'thrown'])('retains the account on %s failure', async (failure) => {
    const req = { user: { id: USER_ID, _id: USER_ID }, body: {} };
    const res = createRes();
    mockGetUserById.mockResolvedValue({ _id: USER_ID, twoFactorEnabled: false });
    mockGetFiles.mockResolvedValue([{ file_id: 'file-1', embedded: true }]);
    if (failure === 'reported') {
      mockProcessDeleteRequest.mockResolvedValueOnce({
        deletedFileIds: [],
        failedFileIds: ['file-1'],
      });
    } else {
      mockProcessDeleteRequest.mockRejectedValueOnce(new Error('provider down'));
    }
    await deleteUserController(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(mockDeleteFiles).not.toHaveBeenCalled();
    expect(mockDeleteUserKey).not.toHaveBeenCalled();
    expect(mockDeleteUserById).not.toHaveBeenCalled();
    expect(mockCancelAgentTriggerUserDeletion).toHaveBeenCalled();
  });

  it('proceeds with deletion when 2FA is not enabled', async () => {
    const req = { user: { id: USER_ID, _id: USER_ID, email: 'a@b.com' }, body: {} };
    const res = createRes();
    mockGetUserById.mockResolvedValue({ _id: USER_ID, twoFactorEnabled: false });
>>>>>>> upstream/main

    await deleteUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: 'User deleted' });
    expect(mockDeleteMessages).toHaveBeenCalled();
<<<<<<< HEAD
    expect(mockDeleteUserAgents).toHaveBeenCalledWith('user1');
    expect(mockDeleteUserPrompts).toHaveBeenCalledWith('user1');
    expect(mockDeleteUserSkills).toHaveBeenCalledWith('user1');
    expect(mockInvalidateCodeEnvironmentConfigCache).toHaveBeenCalledWith(undefined);
    expect(mockRevokeUserCodeEnvironmentWorkers).toHaveBeenCalledWith(
      expect.objectContaining({ userId: 'user1' }),
=======
    expect(mockDeleteUserAgents).toHaveBeenCalledWith(USER_ID);
    expect(mockDeleteUserPrompts).toHaveBeenCalledWith(USER_ID);
    expect(mockDeleteUserSkills).toHaveBeenCalledWith(USER_ID);
    expect(mockInvalidateCodeEnvironmentConfigCache).toHaveBeenCalledWith(undefined);
    expect(mockRevokeUserCodeEnvironmentWorkers).toHaveBeenCalledWith(
      expect.objectContaining({ userId: USER_ID }),
    );
    expect(mockDeletePasskeysByUser).toHaveBeenCalledWith(USER_ID);
    expect(mockDeleteAllUserPluginAuths).toHaveBeenCalledWith(USER_ID);
    expect(mockDeleteAllSharedLinksWithCleanup).toHaveBeenCalledWith(USER_ID, {
      awaitCleanup: true,
    });
    expect(mockProcessDeleteRequest).toHaveBeenCalledWith({
      req: expect.objectContaining({ user: req.user, body: {} }),
      files: [],
    });
    expect(mockProcessDeleteRequest.mock.invocationCallOrder[0]).toBeLessThan(
      mockDeleteFiles.mock.invocationCallOrder[0],
>>>>>>> upstream/main
    );
    expect(mockVerifyOTPOrBackupCode).not.toHaveBeenCalled();
    expect(mockBeginAgentTriggerUserDeletion.mock.invocationCallOrder[0]).toBeLessThan(
      mockPrepareAgentTriggerUserPurge.mock.invocationCallOrder[0],
    );
    expect(mockPrepareAgentTriggerUserPurge.mock.invocationCallOrder[0]).toBeLessThan(
      mockDrainAgentTriggerDeliveriesForUser.mock.invocationCallOrder[0],
    );
    expect(mockDrainAgentTriggerDeliveriesForUser.mock.invocationCallOrder[0]).toBeLessThan(
      mockDeleteMessages.mock.invocationCallOrder[0],
    );
    expect(mockDeleteMessages.mock.invocationCallOrder[0]).toBeLessThan(
      mockDeleteUserById.mock.invocationCallOrder[0],
    );
    expect(mockDeleteUserById.mock.invocationCallOrder[0]).toBeLessThan(
      mockRevokeUserCodeEnvironmentWorkers.mock.invocationCallOrder[0],
    );
    expect(mockRevokeUserCodeEnvironmentWorkers.mock.invocationCallOrder[0]).toBeLessThan(
      mockDeleteUserCodeEnvironments.mock.invocationCallOrder[0],
    );
    expect(mockCancelAgentTriggerUserDeletion).not.toHaveBeenCalled();
    expect(mockCancelAgentTriggerUserPurge).not.toHaveBeenCalled();
  });

<<<<<<< HEAD
  it('aborts active generation jobs before deleting account-owned records', async () => {
    const req = {
      user: { id: 'user1', _id: 'user1', email: 'a@b.com', tenantId: 'tenant-1' },
      body: {},
    };
    const res = createRes();
    mockGetUserById.mockResolvedValue({ _id: 'user1', twoFactorEnabled: false });
    mockGetCleanupBlockingJobIdsForUser.mockResolvedValueOnce(['stream-1']);
    mockGetAgentJob.mockResolvedValueOnce({
      metadata: { userId: 'user1', tenantId: 'tenant-1' },
=======
  it('logs the deleted account by id and tenant without the email address', async () => {
    const { logger } = require('@librechat/data-schemas');
    logger.info.mockClear();
    const req = {
      user: { id: USER_ID, _id: USER_ID, email: 'a@b.com', tenantId: 'tenant-1' },
      body: {},
    };
    mockGetUserById.mockResolvedValue({
      _id: USER_ID,
      email: 'a@b.com',
      tenantId: 'tenant-1',
      twoFactorEnabled: false,
    });

    await deleteUserController(req, createRes());

    const lines = logger.info.mock.calls.map(([line]) => String(line));
    expect(lines).toContain(`User deleted account. ID: ${USER_ID} Tenant: tenant-1`);
    expect(JSON.stringify(logger.info.mock.calls)).not.toContain('a@b.com');
  });

  it('aborts active generation jobs before deleting account-owned records', async () => {
    const req = {
      user: { id: USER_ID, _id: USER_ID, email: 'a@b.com', tenantId: 'tenant-1' },
      body: {},
    };
    const res = createRes();
    mockGetUserById.mockResolvedValue({ _id: USER_ID, twoFactorEnabled: false });
    mockGetCleanupBlockingJobIdsForUser.mockResolvedValueOnce(['stream-1']);
    mockGetAgentJob.mockResolvedValueOnce({
      metadata: { userId: USER_ID, tenantId: 'tenant-1' },
>>>>>>> upstream/main
      createdAt: 123,
    });
    mockAbortJob.mockResolvedValueOnce({ success: true });

    await deleteUserController(req, res);

<<<<<<< HEAD
    expect(mockGetCleanupBlockingJobIdsForUser).toHaveBeenCalledWith('user1', 'tenant-1');
=======
    expect(mockGetCleanupBlockingJobIdsForUser).toHaveBeenCalledWith(USER_ID, 'tenant-1');
>>>>>>> upstream/main
    expect(mockAbortJob).toHaveBeenCalledWith('stream-1', {
      expectedCreatedAt: 123,
      awaitProviderDrain: true,
    });
    expect(mockAbortJob.mock.invocationCallOrder[0]).toBeLessThan(
      mockDeleteMessages.mock.invocationCallOrder[0],
    );
  });

  it('deletes owner checkpoints before erasing the account after job records expire', async () => {
    const req = {
<<<<<<< HEAD
      user: { id: 'user1', _id: 'user1', email: 'a@b.com', tenantId: 'tenant-1' },
=======
      user: { id: USER_ID, _id: USER_ID, email: 'a@b.com', tenantId: 'tenant-1' },
>>>>>>> upstream/main
      body: {},
      config: { endpoints: { agents: { checkpointer: { ttl: 60 } } } },
    };
    const res = createRes();
<<<<<<< HEAD
    mockGetUserById.mockResolvedValue({ _id: 'user1', twoFactorEnabled: false });

    await deleteUserController(req, res);

    expect(deleteOwnedAgentCheckpoints).toHaveBeenCalledWith('user1', 'tenant-1', undefined, {
=======
    mockGetUserById.mockResolvedValue({ _id: USER_ID, twoFactorEnabled: false });

    await deleteUserController(req, res);

    expect(deleteOwnedAgentCheckpoints).toHaveBeenCalledWith(USER_ID, 'tenant-1', undefined, {
>>>>>>> upstream/main
      ttl: 60,
    });
    expect(deleteOwnedAgentCheckpoints.mock.invocationCallOrder[0]).toBeLessThan(
      mockDeleteUserById.mock.invocationCallOrder[0],
    );
  });

  it('preserves code environment records when revocation marking fails after deletion', async () => {
<<<<<<< HEAD
    const req = { user: { id: 'user1', _id: 'user1', email: 'a@b.com' }, body: {} };
    const res = createRes();
    mockGetUserById.mockResolvedValue({ _id: 'user1', twoFactorEnabled: false });
=======
    const req = { user: { id: USER_ID, _id: USER_ID, email: 'a@b.com' }, body: {} };
    const res = createRes();
    mockGetUserById.mockResolvedValue({ _id: USER_ID, twoFactorEnabled: false });
>>>>>>> upstream/main
    mockRevokeUserCodeEnvironmentWorkers.mockRejectedValueOnce(new Error('worker unavailable'));

    await deleteUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockBeginAgentTriggerUserDeletion).toHaveBeenCalledTimes(1);
    expect(mockDeleteMessages).toHaveBeenCalled();
<<<<<<< HEAD
    expect(mockDeleteUserById).toHaveBeenCalledWith('user1');
=======
    expect(mockDeleteUserById).toHaveBeenCalledWith(USER_ID);
>>>>>>> upstream/main
    expect(mockDeleteUserCodeEnvironments).not.toHaveBeenCalled();
    expect(mockCancelAgentTriggerUserPurge).not.toHaveBeenCalled();
    expect(mockCancelAgentTriggerUserDeletion).not.toHaveBeenCalled();
  });

  it('proceeds with deletion when user has no 2FA record', async () => {
<<<<<<< HEAD
    const req = { user: { id: 'user1', _id: 'user1', email: 'a@b.com' }, body: {} };
=======
    const req = { user: { id: USER_ID, _id: USER_ID, email: 'a@b.com' }, body: {} };
>>>>>>> upstream/main
    const res = createRes();
    mockGetUserById.mockResolvedValue(null);
    mockBeginAgentTriggerUserDeletion.mockResolvedValueOnce('missing');

    await deleteUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: 'User deleted' });
  });

  it('returns error when 2FA is enabled and verification fails with 400', async () => {
<<<<<<< HEAD
    const req = { user: { id: 'user1', _id: 'user1' }, body: {} };
    const res = createRes();
    mockGetUserById.mockResolvedValue({
      _id: 'user1',
=======
    const req = { user: { id: USER_ID, _id: USER_ID }, body: {} };
    const res = createRes();
    mockGetUserById.mockResolvedValue({
      _id: USER_ID,
>>>>>>> upstream/main
      twoFactorEnabled: true,
      totpSecret: 'enc-secret',
    });
    mockVerifyOTPOrBackupCode.mockResolvedValue({ verified: false, status: 400 });

    await deleteUserController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockDeleteMessages).not.toHaveBeenCalled();
  });

  it('returns 401 when 2FA is enabled and invalid TOTP token provided', async () => {
    const existingUser = {
<<<<<<< HEAD
      _id: 'user1',
      twoFactorEnabled: true,
      totpSecret: 'enc-secret',
    };
    const req = { user: { id: 'user1', _id: 'user1' }, body: { token: 'wrong' } };
=======
      _id: USER_ID,
      twoFactorEnabled: true,
      totpSecret: 'enc-secret',
    };
    const req = { user: { id: USER_ID, _id: USER_ID }, body: { token: 'wrong' } };
>>>>>>> upstream/main
    const res = createRes();
    mockGetUserById.mockResolvedValue(existingUser);
    mockVerifyOTPOrBackupCode.mockResolvedValue({
      verified: false,
      status: 401,
      message: 'Invalid token or backup code',
    });

    await deleteUserController(req, res);

    expect(mockVerifyOTPOrBackupCode).toHaveBeenCalledWith({
      user: existingUser,
      token: 'wrong',
      backupCode: undefined,
    });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token or backup code' });
    expect(mockDeleteMessages).not.toHaveBeenCalled();
  });

  it('returns 401 when 2FA is enabled and invalid backup code provided', async () => {
    const existingUser = {
<<<<<<< HEAD
      _id: 'user1',
=======
      _id: USER_ID,
>>>>>>> upstream/main
      twoFactorEnabled: true,
      totpSecret: 'enc-secret',
      backupCodes: [],
    };
<<<<<<< HEAD
    const req = { user: { id: 'user1', _id: 'user1' }, body: { backupCode: 'bad-code' } };
=======
    const req = { user: { id: USER_ID, _id: USER_ID }, body: { backupCode: 'bad-code' } };
>>>>>>> upstream/main
    const res = createRes();
    mockGetUserById.mockResolvedValue(existingUser);
    mockVerifyOTPOrBackupCode.mockResolvedValue({
      verified: false,
      status: 401,
      message: 'Invalid token or backup code',
    });

    await deleteUserController(req, res);

    expect(mockVerifyOTPOrBackupCode).toHaveBeenCalledWith({
      user: existingUser,
      token: undefined,
      backupCode: 'bad-code',
    });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(mockDeleteMessages).not.toHaveBeenCalled();
  });

  it('deletes account when valid TOTP token provided with 2FA enabled', async () => {
    const existingUser = {
<<<<<<< HEAD
      _id: 'user1',
=======
      _id: USER_ID,
>>>>>>> upstream/main
      twoFactorEnabled: true,
      totpSecret: 'enc-secret',
    };
    const req = {
<<<<<<< HEAD
      user: { id: 'user1', _id: 'user1', email: 'a@b.com' },
=======
      user: { id: USER_ID, _id: USER_ID, email: 'a@b.com' },
>>>>>>> upstream/main
      body: { token: '123456' },
    };
    const res = createRes();
    mockGetUserById.mockResolvedValue(existingUser);
    mockVerifyOTPOrBackupCode.mockResolvedValue({ verified: true });

    await deleteUserController(req, res);

    expect(mockVerifyOTPOrBackupCode).toHaveBeenCalledWith({
      user: existingUser,
      token: '123456',
      backupCode: undefined,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: 'User deleted' });
    expect(mockDeleteMessages).toHaveBeenCalled();
  });

  it('deletes account when valid backup code provided with 2FA enabled', async () => {
    const existingUser = {
<<<<<<< HEAD
      _id: 'user1',
=======
      _id: USER_ID,
>>>>>>> upstream/main
      twoFactorEnabled: true,
      totpSecret: 'enc-secret',
      backupCodes: [{ codeHash: 'h1', used: false }],
    };
    const req = {
<<<<<<< HEAD
      user: { id: 'user1', _id: 'user1', email: 'a@b.com' },
=======
      user: { id: USER_ID, _id: USER_ID, email: 'a@b.com' },
>>>>>>> upstream/main
      body: { backupCode: 'valid-code' },
    };
    const res = createRes();
    mockGetUserById.mockResolvedValue(existingUser);
    mockVerifyOTPOrBackupCode.mockResolvedValue({ verified: true });

    await deleteUserController(req, res);

    expect(mockVerifyOTPOrBackupCode).toHaveBeenCalledWith({
      user: existingUser,
      token: undefined,
      backupCode: 'valid-code',
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: 'User deleted' });
    expect(mockDeleteMessages).toHaveBeenCalled();
  });
});
