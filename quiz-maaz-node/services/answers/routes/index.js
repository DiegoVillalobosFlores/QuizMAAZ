import API from '../api';

export default (redis, prefix) => {
  const answer = new API.Answer(redis);
  const answerSet = new API.AnswerSet(redis);

  return [
    [
      'post',
      `${prefix}/addAnswer`,
      async (request) => answer.set(request.body)
    ],
    [
      'get',
      `${prefix}/getAnswer`,
      async (request) => answer.get(request.query)
    ],
    [
      'post',
      `${prefix}/addAnswerToSet`,
      async (request) => answerSet.set(request.body)
    ]
  ];
};
