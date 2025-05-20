import { Observable} from 'rxjs';
import { IQuery } from '@interfaces/query/query.interface';
import { User } from '@core/services/user/entity/user.entity';

export interface IUserQuery<U extends User> extends IQuery<U>{

	exist(dni: U['dni']): Promise<boolean>;

}