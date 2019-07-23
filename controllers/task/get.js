import * as moment from "moment";
import { OK, NO_CONTENT } from "http-status-codes";

import { Task } from "../../models/task";
import { TaskComment } from "../../models/taskComment";
import { TimeSpent } from "../../models/timeSpent";
import { TaskChange } from "../../models/taskChange";

export const getTaskById = async (req, res) => {
  const taskId = req.params['taskId'];
  const taskFound = await Task.findById(taskId);
  taskFound.taskComments = await TaskComment.find({ taskId: taskId });
  taskFound.timeSpentValues = await TimeSpent.find({ taskId: taskId });
  taskFound.taskChanges = await TaskChange.find({ taskId: taskId });
  res.status(OK).json(taskFound);
};

export const getTasksByUser = async (req, res) => {
  const userId = req.params['userId'];
  const tasksFound = await Task.find({ targetUser: userId });
  res.status(OK).json(tasksFound);
};

export const getTasksByProject = async (req, res) => {
  const projectId = req.params['projectId'];
  const tasksFound = await Task.find({ project: projectId });
  res.status(OK).json(tasksFound);
};

export const getUserTasksDueWithinDays = async (req, res) => {
  const days = req.params['days'];
  const userId = req.params['userId'];

  const date = new Date();
  const today = moment(date).toISOString();
  const futureDate = moment(date).add(days, 'days').toISOString();

  const tasksFound = await Task.find({
    targetUser: userId,
    dueDate : { $gte: today, $lt:  futureDate }
  });
  res.status(OK).json(tasksFound);
};

export const getSimilarTasksByTitle = async (req, res) => {
  const title = req.params['title'];
  const tasksFound = await Task.find( { title : { $regex : title, $options : 'i' } } );
  res.status(OK).json(tasksFound);
};

export const getTasksByTitleOrDescription = async (req, res) => {
  const term = req.params['term'];
  const tasksFound = await Task.find( { $or: [
      { title: { $regex : term, $options : 'i' } },
      { description: { $regex : term, $options : 'i' } }
    ] } );
  res.status(tasksFound ? OK : NO_CONTENT).json(tasksFound);
};

export const getLast4UserEditedTasks = async (req, res) => {
  const userId = req.params['userId'];
  const tasksFound = await Task.find({ targetUser: userId })
    .sort({ 'lastEdited': -1 })
    .limit(4);
  res.status(OK).json(tasksFound);
};
