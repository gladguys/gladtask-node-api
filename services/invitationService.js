import { Invitation } from '../models/invitation';
import { BaseService } from './baseService';

export class InvitationService extends BaseService {

	constructor() {
		super(Invitation);
	}
}