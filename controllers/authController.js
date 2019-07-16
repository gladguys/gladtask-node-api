const bcrypt = require('bcrypt');
const HttpStatus = require('http-status-codes');

const jwtHelper = require('../jwtHelper');
const User = require('../models/user');

exports.post = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }, (err, userFound) => {
		if (userFound) {
			bcrypt.compare(password, userFound.password, (err, matchedPassword) => {
				if (matchedPassword) {
					userFound.password = null;
					res.status(HttpStatus.OK).json({
						user: userFound,
						token: jwtHelper.createToken(userFound.username)
					});
				} else {
					res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Either the username or password are not correct' });
				}
			});
		} else {
			res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Either the username or password are not correct' });
		}
	});
};
