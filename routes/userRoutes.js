const router = require('express').Router();

const checkToken = require('../jwtHelper').checkToken;
const UserController = require('../controllers/userController');

router.get('/', checkToken, UserController.get);

router.post('/', UserController.post);

module.exports = router;
