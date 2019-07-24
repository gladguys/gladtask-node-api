import express from 'express';

import { checkToken } from "../jwtHelper";
import * as TeamController from '../controllers/team';
import userRoutes from "./userRoutes";

const teamRoutes = express.Router();

teamRoutes.get('/', checkToken, TeamController.GET.get);
teamRoutes.get('/:teamId', checkToken, TeamController.GET.getTeamById);
teamRoutes.get('/user/:userId', checkToken, TeamController.GET.getUserTeams);

teamRoutes.post('/', checkToken, TeamController.POST.post);

export default teamRoutes;
