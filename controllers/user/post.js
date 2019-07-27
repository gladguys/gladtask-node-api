import { UserService } from '../../services/userService';
import { sendDefaultHttpCreatedResponse, sendDefaultHttpErrorResponse } from '../../utils/httpUtils';

const userService = new UserService();

exports.post = async (req, res) => {
  const userFromRequest = req.body['user'];
  const teamId = req.body['teamId'];

  try {
    const savedUser = await userService.saveUser(userFromRequest, teamId);
    sendDefaultHttpCreatedResponse(res, { user: savedUser });
  } catch (error) {
    sendDefaultHttpErrorResponse(res, error);
  }
};
