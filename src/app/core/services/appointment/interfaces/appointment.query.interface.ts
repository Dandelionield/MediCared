import { Observable} from 'rxjs';
import { IQuery } from '@interfaces/query/query.interface';
import { User } from '@core/services/user/entity/user.entity';
import { Appointment } from '@core/services/appointment/entity/appointment.entity';

export interface IAppointmentQuery<A extends Appointment> extends IQuery<A>{

	findAllByUser(user_id: User['id']): Observable<Array<Appointment>>;

}