import Api from '../api';

export default (redis, prefix) => {
  const quiz = new Api.Quiz(redis);

  return [
    [
      'post',
      `${prefix}/addQuiz`,
      (request) => quiz.set(request.body),
    ],
    [
      'get',
      `${prefix}/getQuiz`,
      (request) => quiz.get(request.query),
    ],
  ];
};
