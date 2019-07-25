import express from 'express';

import { checkToken } from "../utils/jwtUtils";
import * as ProjectController from '../controllers/project';

const projectRoutes = express.Router();

projectRoutes.get('/:projectId', checkToken, ProjectController.GET.getById);
projectRoutes.get('/user/:userId', checkToken, ProjectController.GET.getProjectsByUser);
projectRoutes.get('/team/:teamId', checkToken, ProjectController.GET.getProjectsByTeam);
projectRoutes.get('/term/:term', checkToken, ProjectController.GET.getProjectsByName);

projectRoutes.post('/', checkToken, ProjectController.POST.post);

export default projectRoutes;
