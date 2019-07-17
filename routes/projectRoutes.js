const router = require('express').Router();

const checkToken = require('../jwtHelper').checkToken;
const ProjectController = require('../controllers/projectController');

router.get('/', checkToken, ProjectController.get);
router.get('/user/:userId', checkToken, ProjectController.getProjectsByUser);

router.post('/', checkToken, ProjectController.post);

module.exports = router;
