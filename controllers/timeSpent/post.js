import { TimeSpent } from '../../models/timeSpent';
import { TimeSpentService } from '../../services/timeSpentService';
import { sendDefaultHttpCreatedResponse, sendDefaultHttpErrorResponse } from '../../utils/httpUtils';

const timeSpentService = new TimeSpentService();

exports.saveTimeSpent = async (req, res) => {
  const taskId = req.params['taskId'];
  const timeSpent = new TimeSpent(req.body);

  try {
    const timeSpentSaved = await timeSpentService.saveTimeSpent(timeSpent, taskId);
    sendDefaultHttpCreatedResponse(res, timeSpentSaved);
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};
