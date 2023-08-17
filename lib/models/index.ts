import {User} from './user';
import {Auth} from './auth';

User.hasOne(Auth);
export {Auth, User};
