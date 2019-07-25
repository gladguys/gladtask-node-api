import { compare } from 'bcrypt';

import { User } from '../../models/user';
import { sendDefaultHttpSuccessResponse, sendDefaultHttpUnauthorizedResponse } from '../../httpUtils';
import { createToken } from '../../jwtHelper';

export const post = async (req, res) => {
  const usernameOrEmail = req.body['usernameOrEmail'];
  const password = req.body['password'];

  const userFound = await User.findOne({$or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]});
  if (userFound) {
    compare(password, userFound['password'], (err, matchedPassword) => {
      if (matchedPassword) {
        userFound['password'] = null;
        sendDefaultHttpSuccessResponse(res, {
          user: userFound,
          token: createToken(userFound['_id'], userFound['username'])
        });
      } else {
        sendDefaultHttpUnauthorizedResponse(res, 'Either the username or password are not correct');
      }
    });
  } else {
    sendDefaultHttpUnauthorizedResponse(res, 'Either the username or password are not correct');
  }
};
