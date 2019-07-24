import { CREATED } from 'http-status-codes';

import { Project } from '../../models/project';
import { getUserIdFromToken } from '../../jwtHelper';

export const post = async (req, res) => {
  const creatorUserId = getUserIdFromToken(req.headers['authorization']);
  const project = new Project(req.body);
  project.participants = [creatorUserId];
  const projectSaved = await project.save();
  res.status(CREATED).send({ project: projectSaved });
};
