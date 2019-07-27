import { ProjectService } from '../../services/projectService';
import { sendDefaultHttpSuccessResponse, sendDefaultHttpErrorResponse } from '../../utils/httpUtils';

const projectService = new ProjectService();

export const getById = async (req, res) => {
  const projectId = req.params['projectId'];

  try {
    const project = await projectService.findById(projectId);
    sendDefaultHttpSuccessResponse(res, project);
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};

export const getProjectsByUser = async (req, res) => {
  const userId = req.params['userId'];

  try {
    const userProjects = await projectService.findByQuery({ participants: userId });
    sendDefaultHttpSuccessResponse(res, userProjects);
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};

export const getProjectsByTeam = async (req, res) => {
  const teamId = req.params['teamId'];

  try {
    const teamProjects = await projectService.findByQuery({ team: teamId });
    sendDefaultHttpSuccessResponse(res, teamProjects);
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};

export const getProjectsByName = async (req, res) => {
  const term = req.params['term'];

  try {
    const projectsFound = await projectService.findByQuery({ name : { $regex : term, $options : 'i' } });
    sendDefaultHttpSuccessResponse(res, projectsFound);
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};
