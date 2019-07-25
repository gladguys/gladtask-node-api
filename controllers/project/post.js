import { Project } from '../../models/project';
import { ProjectService } from '../../services/projectService';
import { sendDefaultHttpCreatedResponse, sendDefaultHttpErrorResponse } from '../../httpUtils';
import { getUserIdFromToken } from '../../jwtHelper';

const projectService = new ProjectService();

export const post = async (req, res) => {
  const creatorUserId = getUserIdFromToken(req.headers['authorization']);
  const project = new Project(req.body);

  try {
    const projectSaved = projectService.saveProject(project, creatorUserId);
    sendDefaultHttpCreatedResponse(res, { project: projectSaved });
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};
