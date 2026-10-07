export enum QueryKeys {
  messages = 'messages',
<<<<<<< HEAD
=======
  /* Full content of one tool-call part, fetched when its preview is not enough */
  toolCallPart = 'toolCallPart',
  ownerMessageTexts = 'ownerMessageTexts',
>>>>>>> upstream/main
  sharedMessages = 'sharedMessages',
  sharedStartupConfig = 'sharedStartupConfig',
  sharedLinks = 'sharedLinks',
  allConversations = 'allConversations',
  archivedConversations = 'archivedConversations',
  pinnedConversations = 'pinnedConversations',
  searchConversations = 'searchConversations',
  conversation = 'conversation',
  searchEnabled = 'searchEnabled',
  langfuseConnection = 'langfuseConnection',
  langfuseSessionLink = 'langfuseSessionLink',
  conversationTraceAvailability = 'conversationTraceAvailability',
  conversationTraceRecords = 'conversationTraceRecords',
  conversationTraceRecord = 'conversationTraceRecord',
  user = 'user',
<<<<<<< HEAD
=======
  passkeys = 'passkeys',
>>>>>>> upstream/main
  name = 'name', // user key name
  models = 'models',
  balance = 'balance',
  endpoints = 'endpoints',
  tokenConfig = 'tokenConfig',
  presets = 'presets',
  searchResults = 'searchResults',
  tokenCount = 'tokenCount',
  availablePlugins = 'availablePlugins',
  startupConfig = 'startupConfig',
  insights = 'insights',
  insightsAccess = 'insightsAccess',
  assistants = 'assistants',
  assistant = 'assistant',
  agents = 'agents',
  agent = 'agent',
  files = 'files',
  fileConfig = 'fileConfig',
  tools = 'tools',
  toolAuth = 'toolAuth',
  toolCalls = 'toolCalls',
  mcpTools = 'mcpTools',
  mcpConnectionStatus = 'mcpConnectionStatus',
  mcpAuthValues = 'mcpAuthValues',
<<<<<<< HEAD
=======
  mcpAppResourceHtml = 'mcpAppResourceHtml',
>>>>>>> upstream/main
  agentTools = 'agentTools',
  actions = 'actions',
  assistantDocs = 'assistantDocs',
  agentDocs = 'agentDocs',
  fileDownload = 'fileDownload',
  filePreview = 'filePreview',
  voices = 'voices',
  customConfigSpeech = 'customConfigSpeech',
  prompts = 'prompts',
  prompt = 'prompt',
  promptGroups = 'promptGroups',
  allPromptGroups = 'allPromptGroups',
  promptGroup = 'promptGroup',
  projects = 'projects',
  project = 'project',
<<<<<<< HEAD
=======
  projectFiles = 'projectFiles',
  projectAvailableFiles = 'projectAvailableFiles',
>>>>>>> upstream/main
  projectConversations = 'projectConversations',
  categories = 'categories',
  randomPrompts = 'randomPrompts',
  agentCategories = 'agentCategories',
  marketplaceAgents = 'marketplaceAgents',
  roles = 'roles',
  rolesList = 'rolesList',
  conversationTags = 'conversationTags',
  health = 'health',
  userTerms = 'userTerms',
  banner = 'banner',
  /* Memories */
  memories = 'memories',
  principalSearch = 'principalSearch',
  accessRoles = 'accessRoles',
  resourcePermissions = 'resourcePermissions',
  effectivePermissions = 'effectivePermissions',
  graphToken = 'graphToken',
  /* MCP Servers */
  mcpServers = 'mcpServers',
  mcpServer = 'mcpServer',
  /* Active Jobs */
  activeJobs = 'activeJobs',
<<<<<<< HEAD
=======
  /** A running chat's sidebar row, for chats no loaded conversation list holds. */
  runningConversation = 'runningConversation',
>>>>>>> upstream/main
  /* Agent API Keys */
  agentApiKeys = 'agentApiKeys',
  /* Skills */
  skills = 'skills',
  skill = 'skill',
  skillFiles = 'skillFiles',
  skillFileContent = 'skillFileContent',
  /* Skill tree (phase 2 — filesystem-style node view) */
  skillTree = 'skillTree',
  skillNodeContent = 'skillNodeContent',
  /* Tool favorites (starred marketplace items) */
  toolFavorites = 'toolFavorites',
  /* Per-user skill active/inactive overrides */
  skillStates = 'skillStates',
  /* General user favorites */
  favorites = 'favorites',
  /* Scheduled chats */
  schedules = 'schedules',
<<<<<<< HEAD
  schedule = 'schedule',
  parentSubagents = 'parentSubagents',
  subagentThread = 'subagentThread',
=======
  scheduleMCPConsent = 'scheduleMCPConsent',
  schedule = 'schedule',
  parentSubagents = 'parentSubagents',
  subagentThread = 'subagentThread',
  backgroundTasks = 'backgroundTasks',
  conversationPullRequest = 'conversationPullRequest',
>>>>>>> upstream/main
  codeEnvironments = 'codeEnvironments',
  agentQueuedTurns = 'agentQueuedTurns',
  /* Combined Pinned-section display order (favorites + pinned chats) */
  pinnedOrder = 'pinnedOrder',
}

// Dynamic query keys that require parameters
export const DynamicQueryKeys = {
  agentFiles: (agentId: string) => ['agentFiles', agentId] as const,
<<<<<<< HEAD
=======
  projectFiles: (projectId: string) => [QueryKeys.projectFiles, projectId] as const,
  projectAvailableFiles: (projectId: string) =>
    [QueryKeys.projectAvailableFiles, projectId] as const,
>>>>>>> upstream/main
  codeEnvironmentStatus: (id: string) => [QueryKeys.codeEnvironments, id, 'status'] as const,
} as const;

export enum MutationKeys {
<<<<<<< HEAD
  subagentControl = 'subagentControl',
=======
  resetToolApprovalGrants = 'resetToolApprovalGrants',
  subagentControl = 'subagentControl',
  cancelBackgroundTasks = 'cancelBackgroundTasks',
>>>>>>> upstream/main
  enqueueAgentQueuedTurn = 'enqueueAgentQueuedTurn',
  cancelAgentQueuedTurn = 'cancelAgentQueuedTurn',
  /** Whole-array favorites write, keyed so every hook instance's write is
   *  visible to the others through the query client. */
  updateFavorites = 'updateFavorites',
  /** Pinned-section display order write, keyed for the same reason. */
  updatePinnedOrder = 'updatePinnedOrder',
  updateLangfuseConnection = 'updateLangfuseConnection',
  testLangfuseConnection = 'testLangfuseConnection',
  createAgentApiKey = 'createAgentApiKey',
  deleteAgentApiKey = 'deleteAgentApiKey',
  fileUpload = 'fileUpload',
  fileDelete = 'fileDelete',
<<<<<<< HEAD
  fileUpdate = 'fileUpdate',
=======
>>>>>>> upstream/main
  fileUsage = 'fileUsage',
  updatePreset = 'updatePreset',
  deletePreset = 'deletePreset',
  loginUser = 'loginUser',
  logoutUser = 'logoutUser',
  refreshToken = 'refreshToken',
  avatarUpload = 'avatarUpload',
  speechToText = 'speechToText',
  textToSpeech = 'textToSpeech',
  assistantAvatarUpload = 'assistantAvatarUpload',
  agentAvatarUpload = 'agentAvatarUpload',
  updateAction = 'updateAction',
  updateAgentAction = 'updateAgentAction',
  deleteAction = 'deleteAction',
  deleteAgentAction = 'deleteAgentAction',
  revertAgentVersion = 'revertAgentVersion',
  deleteUser = 'deleteUser',
  updateUserPreferences = 'updateUserPreferences',
  updateRole = 'updateRole',
  enableTwoFactor = 'enableTwoFactor',
  verifyTwoFactor = 'verifyTwoFactor',
<<<<<<< HEAD
=======
  registerPasskey = 'registerPasskey',
  renamePasskey = 'renamePasskey',
  deletePasskey = 'deletePasskey',
  passkeyLogin = 'passkeyLogin',
>>>>>>> upstream/main
  updateMemoryPreferences = 'updateMemoryPreferences',
  createProject = 'createProject',
  updateProject = 'updateProject',
  deleteProject = 'deleteProject',
  assignConversationToProject = 'assignConversationToProject',
<<<<<<< HEAD
=======
  addProjectFile = 'addProjectFile',
  removeProjectFile = 'removeProjectFile',
>>>>>>> upstream/main
  /* Skill mutations from the original UI PR — tree/node operations are
   * phase 2 and currently stubbed in the data-service layer. */
  createSkillNode = 'createSkillNode',
  updateSkillNode = 'updateSkillNode',
  deleteSkillNode = 'deleteSkillNode',
  updateSkillNodeContent = 'updateSkillNodeContent',
<<<<<<< HEAD
=======
  /** Artifact code save, keyed so the editor pane can see a save started by
   *  another instance of itself — the pane is remounted when it changes hosts. */
  editArtifact = 'editArtifact',
>>>>>>> upstream/main
  convoPin = 'convoPin',
  archiveAllConversations = 'archiveAllConversations',
  createSchedule = 'createSchedule',
  updateSchedule = 'updateSchedule',
  deleteSchedule = 'deleteSchedule',
  runSchedule = 'runSchedule',
<<<<<<< HEAD
=======
  confirmScheduleMCPConsent = 'confirmScheduleMCPConsent',
  revokeScheduleMCPConsent = 'revokeScheduleMCPConsent',
>>>>>>> upstream/main
  pairCodeEnvironment = 'pairCodeEnvironment',
  updateCodeEnvironmentSettings = 'updateCodeEnvironmentSettings',
  deleteCodeEnvironment = 'deleteCodeEnvironment',
  moveConversationCodeEnvironment = 'moveConversationCodeEnvironment',
<<<<<<< HEAD
=======
  convoSeen = 'convoSeen',
  convoUnread = 'convoUnread',
>>>>>>> upstream/main
}
