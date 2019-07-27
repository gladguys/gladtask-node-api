import express from 'express';

import { checkToken } from "../utils/jwtUtils";

import * as TaskController from '../controllers/task';
import * as TaskCommentController from '../controllers/taskComment';
import * as TimeSpentController from '../controllers/timeSpent';
import * as TaskChangeController from '../controllers/taskChange';

const taskRoutes = express.Router();

taskRoutes.get('/:taskId', checkToken, TaskController.GET.getTaskById);
taskRoutes.get('/user-target/:userId', checkToken, TaskController.GET.getTasksByUser);
taskRoutes.get('/project/:projectId', checkToken, TaskController.GET.getTasksByProject);
taskRoutes.get('/between/:days/:userId', checkToken, TaskController.GET.getUserTasksDueWithinDays);
taskRoutes.get('/similar/title/:title', checkToken, TaskController.GET.getSimilarTasksByTitle);
taskRoutes.get('/term/:term', checkToken, TaskController.GET.getTasksByTitleOrDescription);
taskRoutes.get('/last-edited/:userId', checkToken, TaskController.GET.getLast4UserEditedTasks);

taskRoutes.post('/', checkToken, TaskController.POST.post);
taskRoutes.post('/:taskId/save-comment', checkToken, TaskCommentController.POST.saveTaskComment);
taskRoutes.post('/:taskId/save-time-spent', checkToken, TimeSpentController.POST.saveTimeSpent);
taskRoutes.post('/:taskId/save-task-change', checkToken, TaskChangeController.POST.saveTaskChange);

taskRoutes.put('/', checkToken, TaskController.PUT.put);
taskRoutes.put('/:taskId/update-status/:newStatus', checkToken, TaskController.PUT.updateTaskStatus);

export default taskRoutes;
