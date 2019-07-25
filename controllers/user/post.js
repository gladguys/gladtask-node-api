import * as mongoose from 'mongoose';
import { hash } from 'bcrypt';
import { CREATED } from 'http-status-codes';

import { User } from '../../models/user';
import { Team } from '../../models/team';
import { config } from "../../config";

exports.post = async (req, res) => {
  const userFromRequest = req.body['user'];
  const user = new User(userFromRequest);
  user._id = mongoose.Types.ObjectId();
  const teamId = req.body['teamId'];

  hash(userFromRequest['password'], config.bcrypt_saltRounds, async (err, hash) => {
    user.password = hash;
    const savedUser = await user.save();
    if (teamId) {
      const existingTeam = await Team.findById(teamId);
      existingTeam.participants.push(savedUser._id);
      await existingTeam.findOneAndUpdate({ _id: teamId }, { $set:{ participants: existingTeam.participants } });
    } else {
      const team = new Team({ teamId });
      team.name = 'Meu time';
      team.manager = savedUser._id;
      team.participants = [savedUser._id];
      await team.save();
    }
    res.status(CREATED).send({ user: savedUser });
  });
};
