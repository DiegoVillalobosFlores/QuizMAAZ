import fastify from 'fastify';
import CategoryService from './category';
import QuestionService from './question';
import TeamService from './team';
import QuizService from './quiz';

const server = fastify({ logger: true });

[
  ...QuestionService,
  ...TeamService,
  ...CategoryService,
  ...QuizService,
].forEach(([type, route, callback]) => server[type](route, callback));

const start = async () => {
  try {
    await server.listen(process.env.port || 3001);
  } catch (e) {
    server.log.error(e);
    process.exit(1);
  }
};

start();
