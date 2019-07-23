import { CREATED } from 'http-status-codes';

import { TaskChange } from '../../models/taskChange';

export const saveTaskChange = async (req, res) => {
  const taskId = req.params['taskId'];
  const taskChange = new TaskChange(req.body);
  taskChange.taskId = taskId;
  const taskChangeSaved = await taskChange.save();
  res.status(CREATED).json(taskChangeSaved);
};
