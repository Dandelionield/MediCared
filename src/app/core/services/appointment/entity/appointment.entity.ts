import { Entity } from '@models/entity.model';
import { User } from '@core/services/user/entity/user.entity';
import { Timestamp } from '@angular/fire/firestore';

export type appointedType = 0 | 1 | 2 | 3 | 4;

export const appointmentTypes: Array<string> = [

	'Consulta general',
	'Odontología',
	'Revisión de examenes',
	'Psicología',
	'Laboratorio'

];

export interface Appointment extends Entity{

	appointed: appointedType,
	begins: Timestamp,
	pacient: User['id'],
	state: boolean

}