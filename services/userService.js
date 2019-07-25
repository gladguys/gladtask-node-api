import { User } from '../models/user';
import { BaseService } from './baseService';

export class UserService extends BaseService {

	constructor() {
		super(User);
	}
}