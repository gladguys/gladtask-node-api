import { UserService } from './userService';
import { compareSync } from 'bcrypt';
import { createToken } from '../utils/jwtUtils';

const userService = new UserService();

export class AuthService {

	async authenticate(usernameOrEmail, password) {
		const userFound =
			await userService.findOneByQuery({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }] });

		if (userFound) {
			const matchedPassword = compareSync(password, userFound['password']);
			if (matchedPassword) {
				return {
					authenticated: true,
					user: userFound,
					token: createToken(userFound['_id'], userFound['username'])
				};
			} else {
				return {
					authenticated: false,
					message: 'Either the username or password are not correct'
				};
			}
		} else {
			return {
				authenticated: false,
				message: 'Either the username or password are not correct'
			};
		}
	}
}
