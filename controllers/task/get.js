import { TaskService } from '../../services/taskService';
import { sendDefaultHttpErrorResponse, sendDefaultHttpSuccessResponse } from '../../utils/httpUtils';

const taskService = new TaskService();

export const getTaskById = async (req, res) => {
  const taskId = req.params['taskId'];

  try {
    const taskFound = await taskService.getTaskById(taskId);
    sendDefaultHttpSuccessResponse(res, taskFound);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};

export const getTasksByUser = async (req, res) => {
  const userId = req.params['userId'];

  try {
    const taskFound = await taskService.findByQuery({ targetUser: userId });
    sendDefaultHttpSuccessResponse(res, taskFound);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};

export const getTasksByProject = async (req, res) => {
  const projectId = req.params['projectId'];

  try {
    const taskFound = await taskService.findByQuery({ project: projectId });
    sendDefaultHttpSuccessResponse(res, taskFound);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};

export const getUserTasksDueWithinDays = async (req, res) => {
  const userId = req.params['userId'];
  const days = req.params['days'];

  try {
    const tasksFound = await taskService.getUserTasksDueWithinDays(userId, days);
    sendDefaultHttpSuccessResponse(res, tasksFound);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};

export const getSimilarTasksByTitle = async (req, res) => {
  const title = req.params['title'];

  try {
    const tasksFound = await taskService.findByQuery({ title : { $regex : title, $options : 'i' } });
    sendDefaultHttpSuccessResponse(res, tasksFound);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};

export const getTasksByTitleOrDescription = async (req, res) => {
  const term = req.params['term'];

  try {
    const tasksFound = await taskService.findByQuery({ $or: [
        { title: { $regex : term, $options : 'i' } },
        { description: { $regex : term, $options : 'i' } }
      ] });
    sendDefaultHttpSuccessResponse(res, tasksFound);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};

export const getLast4UserEditedTasks = async (req, res) => {
  const userId = req.params['userId'];

  try {
    const tasksFound = await taskService.getLast4UserEditedTasks(userId);
    sendDefaultHttpSuccessResponse(res, tasksFound);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};
