import { Team } from '../../models/team';
import { TeamService } from '../../services/teamService';
import { getUserIdFromToken } from '../../jwtHelper';
import { sendDefaultHttpErrorResponse, sendDefaultHttpCreatedResponse } from '../../httpUtils';

const teamService = new TeamService();

exports.post = async (req, res) => {
  const creatorUserId = getUserIdFromToken(req.headers['authorization']);
  const team = new Team(req.body);

  try {
    const teamSaved = await teamService.saveTeam(team, creatorUserId);
    sendDefaultHttpCreatedResponse(res, teamSaved);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};
