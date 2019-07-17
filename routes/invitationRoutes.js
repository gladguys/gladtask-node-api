const router = require('express').Router();

const checkToken = require('../jwtHelper').checkToken;
const InvitationController = require('../controllers/invitationController');

router.get('/', checkToken, InvitationController.get);
router.get('/user-receiver/:userId', checkToken, InvitationController.getInvitationsByUser);

module.exports = router;
