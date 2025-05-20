import { Entity } from '@models/entity.model';
import { User } from '@core/services/user/entity/user.entity';
import { Timestamp } from '@angular/fire/firestore';

export interface Appointment extends Entity{

	appointed: 0 | 1 | 2 | 3 | 4,
	begins: Timestamp,
	pacient: User['id'],
	state: boolean

}