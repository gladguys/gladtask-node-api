const bcrypt = require('bcrypt');
const HttpStatus = require('http-status-codes');

const config = require('../config');
const User = require('../models/user');

// eslint-disable-next-line no-unused-vars
exports.get = (req, res, next) => {
	User.find({}, (err, users) => res.status(HttpStatus.OK).json({ users }));
};

// eslint-disable-next-line no-unused-vars
exports.post = (req, res, next) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		name: req.body.name
	});
	bcrypt.hash(req.body.password, config.bcrypt_saltRounds, (err, hash) => {
		user.password = hash;

		user.save((err, userSaved) =>
			res.status(HttpStatus.CREATED).send({ user: userSaved })
		);
	});
};
