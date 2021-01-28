import express from 'express';

import { checkToken } from "../utils/jwtUtils";
import * as TeamController from '../controllers/team';
import userRoutes from "./userRoutes";

const teamRoutes = express.Router();

teamRoutes.get('/', checkToken, TeamController.GET.get);
teamRoutes.get('/:teamId', checkToken, TeamController.GET.getTeamById);
teamRoutes.get('/user/:userId', checkToken, TeamController.GET.getUserTeams);
teamRoutes.post('/add-user', checkToken, TeamController.POST.addUserToTeam);
teamRoutes.post('/', checkToken, TeamController.POST.post);

export default teamRoutes;
