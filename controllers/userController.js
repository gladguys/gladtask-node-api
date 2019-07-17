const bcrypt = require('bcrypt');
const HttpStatus = require('http-status-codes');
const mongoose = require('mongoose');

const config = require('../config');
const User = require('../models/user');
const Team = require('../models/team');

exports.get = async (req, res) => {
	const users = await User.find({});
	res.status(HttpStatus.OK).json(users);
};

exports.getUserById = async (req, res) => {
	const userId = req.params['userId'];
	const user = await User.findById(userId);
	res.status(user ? HttpStatus.OK : HttpStatus.NOT_FOUND).json(user);
};

exports.getUserByUsername = async (req, res) => {
	const username = req.params['username'];
	const user = await User.findOne({ username });
	res.status(user ? HttpStatus.OK : HttpStatus.NOT_FOUND).json(user);
};

exports.getUserByEmail = async (req, res) => {
	const email = req.params['email'];
	const user = await User.findOne({ email });
	res.status(user ? HttpStatus.OK : HttpStatus.NOT_FOUND).json(user);
};

exports.post = async (req, res) => {
	const userFromRequest = req.body['user'];
	const user = new User(userFromRequest);
	user._id = mongoose.Types.ObjectId();
	const teamId = req.body['teamId'];

	bcrypt.hash(userFromRequest['password'], config.bcrypt_saltRounds, async (err, hash) => {
		user.password = hash;
		const savedUser = await user.save();
		if (teamId) {
			const existingTeam = await Team.findById(teamId);
			existingTeam.participants.push(savedUser._id);
			await existingTeam.findOneAndUpdate({ _id: teamId }, { $set:{ participants: existingTeam.participants } } );
		} else {
			const team = new Team({ teamId });
			team.name = 'Meu time';
			team.manager = savedUser._id;
			team.participants = [savedUser._id];
			await team.save();
		}
		res.status(HttpStatus.CREATED).send({ user: savedUser });
	});
};
