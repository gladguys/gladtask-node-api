import { CREATED } from 'http-status-codes';

import { getUserIdFromToken } from '../../jwtHelper';
import { Team } from '../../models/team';

exports.post = async (req, res) => {
  const creatorUserId = getUserIdFromToken(req.headers['authorization']);
  const team = new Team(req.body);
  team.manager = creatorUserId;
  team.participants = [creatorUserId];
  const teamSaved = await team.save();
  res.status(CREATED).send({ team: teamSaved });
};
