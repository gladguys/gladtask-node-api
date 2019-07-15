const router = require('express').Router();

const UserController = require('../controllers/userController');

router.get('/', UserController.get);
router.post('/', UserController.post);

module.exports = router;
