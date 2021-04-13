import Api from '../api';

export default (redis, prefix) =>  {
  const question = new Api.Question(redis);
  const questionAnswers = new Api.QuestionAnswersSet(redis);

  return [
    [
      'post',
      `${prefix}/addQuestion`,
      (request) => question.set(request.body)
    ],
    [
      'get',
      `${prefix}/getQuestion`,
      (request) => question.get(request.query)
    ],
    [
      'post',
      `${prefix}/addAnswerToSet`,
      async (request) => questionAnswers.set(request.body)
    ],
    [
      'get',
      `${prefix}/getAnswerSet`,
      async (request) => questionAnswers.get(request.query)
    ]
  ];
};
