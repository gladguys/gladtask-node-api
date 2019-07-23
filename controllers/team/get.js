import { OK, NOT_FOUND } from 'http-status-codes';

import { Team } from '../../models/team';

exports.get = async (req, res) => {
  const teams = await Team.find({});
  res.status(OK).json(teams);
};

exports.getTeamById = async (req, res) => {
  const teamId = req.params['teamId'];
  const team = await Team.findById(teamId);
  res.status(team ? OK : NOT_FOUND).json(team);
};

exports.getUserTeams = async (req, res) => {
  const userId = req.params['userId'];
  const teamsOfUser = await Team.find({ participants: userId });
  res.status(OK).json(teamsOfUser);
};
