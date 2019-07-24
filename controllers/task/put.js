import { OK } from "http-status-codes";

import { Task } from "../../models/task";

export const put = async (req, res) => {
  const task = new Task(req.body);
  await Task.replaceOne({ _id: task._id }, task, { upsert: true });
  res.status(OK).send({ task: task });
};

export const updateTaskStatus = async (req, res) => {
  const taskId = req.params['taskId'];
  const newStatus = req.params['newStatus'];
  const savedTask = await Task.updateOne({ _id: taskId }, { $set:{ status: newStatus, lastEdited: new Date() } } );
  res.status(OK).send(savedTask);
};
