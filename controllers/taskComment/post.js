import { CREATED } from 'http-status-codes';

import { TaskComment } from '../../models/taskComment';

exports.saveTaskComment = async (req, res) => {
  const taskId = req.params['taskId'];
  const taskComment = new TaskComment(req.body);
  taskComment.taskId = taskId;
  const commentSaved = await taskComment.save();
  res.status(CREATED).send(commentSaved);
};
