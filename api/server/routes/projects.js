const express = require('express');
const { createProjectHandlers } = require('@librechat/api');
<<<<<<< HEAD
const requireJwtAuth = require('~/server/middleware/requireJwtAuth');
=======
const { configMiddleware, requireJwtAuth } = require('~/server/middleware');
>>>>>>> upstream/main
const db = require('~/models');

const router = express.Router();
const handlers = createProjectHandlers({
  listChatProjects: db.listChatProjects,
  createChatProject: db.createChatProject,
  getChatProject: db.getChatProject,
  updateChatProject: db.updateChatProject,
  deleteChatProject: db.deleteChatProject,
  assignConversationToProject: db.assignConversationToProject,
<<<<<<< HEAD
});

router.use(requireJwtAuth);

router.get('/', handlers.listProjects);
router.post('/', handlers.createProject);
router.put('/conversations/:conversationId', handlers.assignConversationToProject);
router.get('/:projectId', handlers.getProject);
router.patch('/:projectId', handlers.updateProject);
=======
  addChatProjectFile: db.addChatProjectFile,
  removeChatProjectFile: db.removeChatProjectFile,
  getProjectFiles: db.getProjectFiles,
  getAvailableProjectFiles: db.getAvailableProjectFiles,
});
router.use(requireJwtAuth);
router.get('/', handlers.listProjects);
router.post('/', configMiddleware, handlers.createProject);
router.put('/conversations/:conversationId', handlers.assignConversationToProject);
router.get('/:projectId/files/available', handlers.listAvailableProjectFiles);
router.get('/:projectId/files', handlers.listProjectFiles);
router.post('/:projectId/files', configMiddleware, handlers.addProjectFile);
router.delete('/:projectId/files/:fileId', handlers.removeProjectFile);
router.get('/:projectId', handlers.getProject);
router.patch('/:projectId', configMiddleware, handlers.updateProject);
>>>>>>> upstream/main
router.delete('/:projectId', handlers.deleteProject);

module.exports = router;
