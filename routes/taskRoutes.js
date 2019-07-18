let router = require('express').Router();

const checkToken = require('../jwtHelper').checkToken;
const TaskController = require('../controllers/taskController');

router.get('/:taskId', checkToken, TaskController.getTaskById);
router.get('/between/:days/:userId', checkToken, TaskController.getUserTasksDueWithinDays);
router.get('/last-edited/:userId', checkToken, TaskController.getLast4UserEditedTasks);

module.exports = router;
