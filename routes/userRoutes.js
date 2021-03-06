import express from 'express';

import { checkToken } from "../utils/jwtUtils";
import * as UserController from '../controllers/user';

const userRoutes = express.Router();

userRoutes.get('/', checkToken, UserController.GET.get);
userRoutes.get('/:userId', checkToken, UserController.GET.getUserById);
userRoutes.get('/team/:teamId', checkToken, UserController.GET.getUsersByTeam);
userRoutes.get('/username/:username', UserController.GET.getUserByUsername);
userRoutes.get('/email/:email', UserController.GET.getUserByEmail);
userRoutes.get('/term/:term', checkToken, UserController.GET.getUsersByFirstOrLastName);
userRoutes.get('/any/:term', checkToken, UserController.GET.getUsersByAnyTerm);

userRoutes.post('/', UserController.POST.post);

export default userRoutes;
