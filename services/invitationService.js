import { Invitation } from '../models/invitation';
import { BaseService } from './baseService';

export class InvitationService extends BaseService {

	constructor() {
		super(Invitation);
	}

	async saveInvitation(invitation) {
		return await invitation.save();
	}
}