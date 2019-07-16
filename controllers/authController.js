const bcrypt = require('bcrypt');
const HttpStatus = require('http-status-codes');

const jwtHelper = require('../jwtHelper');
const User = require('../models/user');

exports.post = async (req, res) => {
	const usernameOrEmail = req.body.usernameOrEmail;
	const password = req.body.password;

	const userFound = await User.findOne({$or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]});
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
};
