import { UserService } from '../../services/userService';
import { TeamService } from '../../services/teamService';
import { sendDefaultHttpSuccessResponse, sendDefaultHttpErrorResponse } from '../../utils/httpUtils';

const userService = new UserService();
const teamService = new TeamService();

exports.get = async (req, res) => {
  try {
    const users = await userService.findAll();
    sendDefaultHttpSuccessResponse(res, users);
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params['userId'];

  try {
    const users = await userService.findById(userId);
    sendDefaultHttpSuccessResponse(res, users);
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};

exports.getUsersByTeam = async (req, res) => {
  const teamId = req.params['teamId'];

  try {
    const team = await teamService.findById(teamId);
    sendDefaultHttpSuccessResponse(res, team.participants);
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};

exports.getUserByUsername = async (req, res) => {
  const username = req.params['username'];

  try {
    const user = await userService.findOneByQuery({ username });
    console.log("passou");
    sendDefaultHttpSuccessResponse(res, user);
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};

exports.getUserByEmail = async (req, res) => {
  const email = req.params['email'];

  try {
    const user = await userService.findOneByQuery({ email });
    sendDefaultHttpSuccessResponse(res, user);
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};

exports.getUsersByFirstOrLastName = async (req, res) => {
  const term = req.params['term'];

  try {
    const usersFound = await userService.findByQuery({ $or: [
        { firstName: { $regex : term, $options : 'i' } },
        { lastName: { $regex : term, $options : 'i' } }
      ] });
    sendDefaultHttpSuccessResponse(res, usersFound);
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};
