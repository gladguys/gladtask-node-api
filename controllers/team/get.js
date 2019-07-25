import { TeamService } from '../../services/teamService';
import { sendDefaultHttpSuccessResponse, sendDefaultHttpErrorResponse } from '../../httpUtils';

const teamService = new TeamService();

exports.get = async (req, res) => {
  try {
    const teams = await teamService.findAll();
    sendDefaultHttpSuccessResponse(res, teams);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};

exports.getTeamById = async (req, res) => {
  const teamId = req.params['teamId'];

  try {
    const team = await teamService.findById(teamId);
    sendDefaultHttpSuccessResponse(res, team);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};

exports.getUserTeams = async (req, res) => {
  const userId = req.params['userId'];

  try {
    const teamsOfUser = await teamService.findByQuery({ participants: userId });
    sendDefaultHttpSuccessResponse(res, teamsOfUser);
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};
