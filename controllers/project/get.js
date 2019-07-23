import { OK, NOT_FOUND, NO_CONTENT } from 'http-status-codes';

import { Project } from '../../models/project';

export const getById = async (req, res) => {
  const projectId = req.params['projectId'];
  const project = await Project.findById(projectId);

  if (project) {
    res.status(OK).json(project);
  } else {
    res.status(NOT_FOUND);
  }
};

export const getProjectsByUser = async (req, res) => {
  const userId = req.params['userId'];
  const userProjects = await Project.find({ participants: userId });
  res.status(OK).json(userProjects);
};

export const getProjectsByTeam = async (req, res) => {
  const teamId = req.params['teamId'];
  const teamProjects = await Project.find({ team: teamId });
  res.status(OK).json(teamProjects);
};

export const getProjectsByName = async (req, res) => {
  const term = req.params['term'];
  const projectsFound = await Project.find( { name : { $regex : term, $options : 'i' } } );
  res.status(projectsFound ? OK : NO_CONTENT).json(projectsFound);
};
