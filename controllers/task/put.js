import { Task } from "../../models/task";
import { TaskService } from '../../services/taskService';
import { sendDefaultHttpCreatedResponse, sendDefaultHttpErrorResponse } from '../../httpUtils';

const taskService = new TaskService();

export const put = async (req, res) => {
  const task = new Task(req.body);

  try {
    await taskService.update(task);
    sendDefaultHttpCreatedResponse(res, { task: task });
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};

export const updateTaskStatus = async (req, res) => {
  const taskId = req.params['taskId'];
  const newStatus = req.params['newStatus'];

  try {
    const updatedTask = await taskService.updateTaskStatus(taskId, newStatus);
    sendDefaultHttpCreatedResponse(res, updatedTask);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};
