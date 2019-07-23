import { CREATED } from 'http-status-codes';

import { TimeSpent } from '../../models/timeSpent';

exports.saveTimeSpent = async (req, res) => {
  const taskId = req.params['taskId'];
  const timeSpent = new TimeSpent(req.body);
  timeSpent.taskId = taskId;
  const timeSpentSaved = await timeSpent.save();
  res.status(CREATED).send(timeSpentSaved);
};
