import { Task } from "../../models/task";
import { TaskService } from '../../services/taskService';
import { getUserIdFromToken } from "../../utils/jwtUtils";
import { sendDefaultHttpCreatedResponse, sendDefaultHttpErrorResponse } from '../../utils/httpUtils';

const taskService = new TaskService();

export const post = async (req, res) => {
  const task = new Task(req.body);
  const creatorUserId = getUserIdFromToken(req.headers['authorization']);

  try {
    const savedTask = await taskService.saveTask(task, creatorUserId);
    sendDefaultHttpCreatedResponse(res, savedTask);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};
