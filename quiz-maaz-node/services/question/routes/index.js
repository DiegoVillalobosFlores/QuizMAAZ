import Api from '../api';

export default (redis, prefix) =>  {
  const question = new Api.Question(redis);

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
    ]
  ];
};
