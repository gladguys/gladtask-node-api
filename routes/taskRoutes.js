let router = require('express').Router();

const checkToken = require('../jwtHelper').checkToken;
const TaskController = require('../controllers/taskController');
const TaskCommentController = require('../controllers/taskCommentController');
const TimeSpentController = require('../controllers/timeSpentController');
const TaskChangeController = require('../controllers/taskChangeController');

router.get('/:taskId', checkToken, TaskController.getTaskById);
router.get('/user-target/:userId', checkToken, TaskController.getTasksByUser);
router.get('/project/:projectId', checkToken, TaskController.getTasksByProject);
router.get('/between/:days/:userId', checkToken, TaskController.getUserTasksDueWithinDays);
router.get('/similar/title/:title', checkToken, TaskController.getSimilarTasksByTitle);
router.get('/term/:term', checkToken, TaskController.getTasksByTitleOrDescription);
router.get('/last-edited/:userId', checkToken, TaskController.getLast4UserEditedTasks);

router.post('/', checkToken, TaskController.post);
router.post('/:taskId/save-comment', checkToken, TaskCommentController.saveTaskComment);
router.post('/:taskId/save-time-spent', checkToken, TimeSpentController.saveTimeSpent);
router.post('/:taskId/save-task-change', checkToken, TaskChangeController.saveTaskChange);

router.put('/', checkToken, TaskController.put);
router.put('/:taskId/update-status/:newStatus', checkToken, TaskController.updateTaskStatus);

module.exports = router;
