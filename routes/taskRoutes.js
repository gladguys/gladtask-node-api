let router = require('express').Router();

const checkToken = require('../jwtHelper').checkToken;
const TaskController = require('../controllers/taskController');

router.get('/:taskId', checkToken, TaskController.getTaskById);
router.get('/user-target/:userId', checkToken, TaskController.getTasksByUser);
router.get('/project/:projectId', checkToken, TaskController.getTasksByProject);
router.get('/between/:days/:userId', checkToken, TaskController.getUserTasksDueWithinDays);
router.get('/similar/title/:title', checkToken, TaskController.getSimilarTasksByTitle);
router.get('/last-edited/:userId', checkToken, TaskController.getLast4UserEditedTasks);

router.post('/', checkToken, TaskController.post);
router.post('/:taskId/save-comment', checkToken, TaskController.saveTaskComment);

router.put('/:taskId/update-status/:newStatus', checkToken, TaskController.updateTaskStatus);

module.exports = router;
