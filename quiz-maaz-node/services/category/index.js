import Redis from 'ioredis';
import Routes from './routes';

const redis = new Redis();

const routes = Routes(redis, '/categories');

export default routes;
