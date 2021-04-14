'use strict';
import fastify from 'fastify';
import CategoryService from './category';
import QuestionService from './question';
import TeamService from './team';

const server = fastify({logger: true});

[
  ...QuestionService,
  ...TeamService,
  ...CategoryService
].forEach(([type, route, callback]) => server[type](route,callback));

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
