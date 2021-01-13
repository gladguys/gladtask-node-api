import { Project } from '../../models/project';
import { ProjectService } from '../../services/projectService';
import { sendDefaultHttpCreatedResponse, sendDefaultHttpErrorResponse } from '../../utils/httpUtils';
import { getUserIdFromToken } from '../../utils/jwtUtils';

const projectService = new ProjectService();

export const post = async (req, res) => {
  const creatorUserId = getUserIdFromToken(req.headers['authorization']);
  const project = new Project(req.body);

  try {
    const projectSaved = await projectService.saveProject(project, creatorUserId);
    sendDefaultHttpCreatedResponse(res, projectSaved );
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};
