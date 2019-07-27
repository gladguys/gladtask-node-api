import { TaskComment } from '../../models/taskComment';
import { TaskCommentService } from '../../services/taskCommentService';
import { sendDefaultHttpCreatedResponse, sendDefaultHttpErrorResponse } from '../../utils/httpUtils';

const taskCommentService = new TaskCommentService();

exports.saveTaskComment = async (req, res) => {
  const taskId = req.params['taskId'];
  const taskComment = new TaskComment(req.body);

  try {
    const taskCommentSaved = await taskCommentService.saveTaskComment(taskComment, taskId);
    sendDefaultHttpCreatedResponse(res, taskCommentSaved);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};
