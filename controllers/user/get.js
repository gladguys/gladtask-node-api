import { OK, NOT_FOUND, NO_CONTENT } from 'http-status-codes';

import { User } from '../../models/user';
import { Team } from '../../models/team';

exports.get = async (req, res) => {
  const users = await User.find({});
  res.status(OK).json(users);
};

exports.getUserById = async (req, res) => {
  const userId = req.params['userId'];
  const user = await User.findById(userId);
  res.status(user ? OK : NOT_FOUND).json(user);
};

exports.getUsersByTeam = async (req, res) => {
  const teamId = req.params['teamId'];
  const team = await Team.findById(teamId);
  res.status(team.participants ? OK : NOT_FOUND).json(team.participants);
};

exports.getUserByUsername = async (req, res) => {
  const username = req.params['username'];
  const user = await User.findOne({ username });
  res.status(user ? OK : NOT_FOUND).json(user);
};

exports.getUserByEmail = async (req, res) => {
  const email = req.params['email'];
  const user = await User.findOne({ email });
  res.status(user ? OK : NOT_FOUND).json(user);
};

exports.getUsersByFirstOrLastName = async (req, res) => {
  const term = req.params['term'];
  const usersFound = await User.find( { $or: [
      { firstName: { $regex : term, $options : 'i' } },
      { lastName: { $regex : term, $options : 'i' } }
    ] } );
  res.status(usersFound ? OK : NO_CONTENT).json(usersFound);
};
