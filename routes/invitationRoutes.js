import express from 'express';

import { checkToken } from '../utils/jwtUtils';
import * as InvitationController from '../controllers/invitation';

const invitationRoutes = express.Router();

invitationRoutes.get('/', checkToken, InvitationController.GET.get);
invitationRoutes.post('/', checkToken, InvitationController.POST.post);
invitationRoutes.get('/user-receiver/:userId', checkToken, InvitationController.GET.getInvitationsByUser);
invitationRoutes.delete('/:invitationId', checkToken, InvitationController.DELETE.deleting);

export default invitationRoutes;
