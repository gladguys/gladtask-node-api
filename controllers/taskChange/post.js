import { TaskChange } from '../../models/taskChange';
import { TaskChangeService } from '../../services/taskChangeService';
import { sendDefaultHttpCreatedResponse, sendDefaultHttpErrorResponse } from '../../utils/httpUtils';

const taskChangeService = new TaskChangeService();

export const saveTaskChange = async (req, res) => {
  const taskId = req.params['taskId'];
  const taskChange = new TaskChange(req.body);

  try {
    const taskChangeSaved = await taskChangeService.saveTaskChange(taskChange, taskId);
    sendDefaultHttpCreatedResponse(res, taskChangeSaved);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};
