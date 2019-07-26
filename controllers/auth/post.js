import { AuthService } from '../../services/authService';
import {
  sendDefaultHttpErrorResponse,
  sendDefaultHttpSuccessResponse,
  sendDefaultHttpUnauthorizedResponse
} from '../../utils/httpUtils';

const authService = new AuthService();

export const post = async (req, res) => {
  const usernameOrEmail = req.body['usernameOrEmail'];
  const password = req.body['password'];

  try {
    const authentication = await authService.authenticate(usernameOrEmail, password);

    if (authentication.authenticated) {
      sendDefaultHttpSuccessResponse(res, authentication);
    } else {
      sendDefaultHttpUnauthorizedResponse(res, authentication);
    }
  } catch (error) {
    sendDefaultHttpErrorResponse(req, res, error);
  }
};
