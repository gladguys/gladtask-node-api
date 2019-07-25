import express from 'express';

import { checkToken } from '../utils/jwtUtils';
import * as EmailController from '../controllers/email';

const emailRoutes = express.Router();

emailRoutes.post('/inviteTeam/:email', checkToken, EmailController.POST.post);

export default emailRoutes;
