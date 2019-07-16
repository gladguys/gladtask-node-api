const router = require('express').Router();

const checkToken = require('../jwtHelper').checkToken;
const TeamController = require('../controllers/teamController');

router.get('/', checkToken, TeamController.get);
router.get('/user/:userId', checkToken, TeamController.getUserTeams);

router.post('/', checkToken, TeamController.post);

module.exports = router;
