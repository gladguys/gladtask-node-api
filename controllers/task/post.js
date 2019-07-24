import { CREATED } from "http-status-codes";

import { getUserIdFromToken } from "../../jwtHelper";
import { Task } from "../../models/task";

export const post = async (req, res) => {
  const creatorUserId = getUserIdFromToken(req.headers['authorization']);
  const task = new Task(req.body);
  task.creatorUser = creatorUserId;
  const taskSaved = await task.save();
  res.status(CREATED).send({ task: taskSaved });
};
