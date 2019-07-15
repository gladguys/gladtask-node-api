let router = require('express').Router();

const AuthController = require('../controllers/authController');

router.post('/', AuthController.post);

module.exports = router;
