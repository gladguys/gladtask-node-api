import { OK, UNAUTHORIZED } from 'http-status-codes';
import { compare } from 'bcrypt';

import { createToken } from '../../jwtHelper';
import { User } from '../../models/user';

export const post = async (req, res) => {
  const usernameOrEmail = req.body['usernameOrEmail'];
  const password = req.body['password'];

  const userFound = await User.findOne({$or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]});
  if (userFound) {
    compare(password, userFound['password'], (err, matchedPassword) => {
      if (matchedPassword) {
        userFound['password'] = null;
        res.status(OK).json({
          user: userFound,
          token: createToken(userFound['_id'], userFound['username'])
        });
      } else {
        res.status(UNAUTHORIZED).json({ message: 'Either the username or password are not correct' });
      }
    });
  } else {
    res.status(UNAUTHORIZED).json({ message: 'Either the username or password are not correct' });
  }
};
