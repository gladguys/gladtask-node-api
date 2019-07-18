const router = require('express').Router();

const checkToken = require('../jwtHelper').checkToken;
const ProjectController = require('../controllers/projectController');

router.get('/:projectId', checkToken, ProjectController.getById);
router.get('/user/:userId', checkToken, ProjectController.getProjectsByUser);
router.get('/team/:teamId', checkToken, ProjectController.getProjectsByTeam);

router.post('/', checkToken, ProjectController.post);

module.exports = router;
