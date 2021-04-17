import Redis from 'ioredis';
import Routes from './routes';

const redis = new Redis();

export default Routes(redis, '/questions');
