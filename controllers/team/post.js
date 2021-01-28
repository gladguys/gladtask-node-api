import { Team } from "../../models/team";
import { TeamService } from "../../services/teamService";
import { getUserIdFromToken } from "../../utils/jwtUtils";
import {
  sendDefaultHttpErrorResponse,
  sendDefaultHttpCreatedResponse,
} from "../../utils/httpUtils";
import { UserService } from "../../services/userService";

const teamService = new TeamService();
const userService = new UserService();

exports.post = async (req, res) => {
  const creatorUserId = getUserIdFromToken(req.headers["authorization"]);
  const team = new Team(req.body);

  try {
    const teamSaved = await teamService.saveTeam(team, creatorUserId);
    sendDefaultHttpCreatedResponse(res, teamSaved);
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};

exports.addUserToTeam = async (req, res) => {
  try {
    const teamId = req.body.teamId;
    const receiverUserId = req.body.receiverUserId;

    const teamToAddUser = await teamService.findById(teamId);
    if (!teamToAddUser) throw new Error("team not found");

    const userToAdd = await userService.findById(receiverUserId);
    if (!userToAdd) throw new Error("user not found");

    teamToAddUser.participants.push(userToAdd);
    userService.save(teamToAddUser);

    sendDefaultHttpCreatedResponse(res, teamToAddUser);
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};
