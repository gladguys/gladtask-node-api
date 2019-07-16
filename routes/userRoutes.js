const router = require('express').Router();

const checkToken = require('../jwtHelper').checkToken;
const UserController = require('../controllers/userController');

router.get('/', checkToken, UserController.get);
router.get('/username/:username', UserController.getUserByUsername);
router.get('/email/:email', UserController.getUserByEmail);

router.post('/', UserController.post);

module.exports = router;
