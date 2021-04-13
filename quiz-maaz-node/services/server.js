'use strict';
import fastify from 'fastify';
import AnswerService from './answers';

const server = fastify({logger: true});

[...AnswerService].forEach(([type, route, callback]) => server[type](route,callback));

const start = async () => {
  try {
    await server.listen(3000);
    console.log('Successfully started server');
  } catch (e) {
    console.log(e);
    server.log.error(e);
    process.exit(1);
  }
};

start();