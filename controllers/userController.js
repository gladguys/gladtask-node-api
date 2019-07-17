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
	const user = await User.findOne({ _id: userId });
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
	const user = new User(req.body.user);
	user._id = mongoose.Types.ObjectId();
	const teamId = req.body.teamId;

	bcrypt.hash(req.body.user.password, config.bcrypt_saltRounds, async (err, hash) => {
		user.password = hash;
		const savedUser = await user.save();
		if (teamId) {
			//TODO Implement this
		} else {
			const team = new Team({ teamId });
			team.name = 'Meu time';
			team.manager = savedUser;
			team.participants = [savedUser];
			// eslint-disable-next-line no-unused-vars
			await team.save();
		}
		res.status(HttpStatus.CREATED).send({ user: savedUser });
	});
};
