import express from 'express';

import * as AuthController from '../controllers/auth';

const authRoutes = express.Router();

authRoutes.post('/', AuthController.POST.post);

export default authRoutes;
