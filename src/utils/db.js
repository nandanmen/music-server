import pgp from 'pg-promise';
import { connectionOptions } from '../../config';

const init = pgp();

export default init(connectionOptions);
