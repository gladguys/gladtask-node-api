const bcrypt = require('bcrypt');
const HttpStatus = require('http-status-codes');

const config = require('../config');
const User = require('../models/user');
const Team = require('../models/team');

exports.get = (req, res) => {
	User.find({}, (err, users) => res.status(HttpStatus.OK).json({ users }));
};

exports.post = (req, res) => {
	const user = new User(req.body.user);
	const teamId = req.body.teamId;

	bcrypt.hash(req.body.user.password, config.bcrypt_saltRounds, (err, hash) => {
		user.password = hash;
		user.save((err, userSaved) => {
			if (teamId) {
				//TODO Implement this
			} else {
				const team = new Team({ teamId });
				team.name = 'Meu time';
				team.manager = userSaved;
				team.participants = [userSaved];
				// eslint-disable-next-line no-unused-vars
				team.save((err, teamSaved) => {});
			}
			res.status(HttpStatus.CREATED).send({ user: userSaved });
		});
	});
};
