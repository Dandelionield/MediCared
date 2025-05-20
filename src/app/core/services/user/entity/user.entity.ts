import { Entity } from '@models/entity.model';
import { Timestamp } from '@angular/fire/firestore';

export interface User extends Entity{

	dni: string,//Document Number Indentification
	name: string,
	surname: string,
	admin: boolean,
	birthdate: Timestamp

}