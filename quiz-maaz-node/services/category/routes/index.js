import Api from '../api';

export default (redis, prefix) => {
  const category = new Api.Category(redis);
  const questionSet = new Api.CategoryQuestionSet(redis);

  return [
    [
      'post',
      `${prefix}/addCategory`,
      (request) => category.set(request.body),
    ],
    [
      'get',
      `${prefix}/getCategory`,
      (request) => category.get(request.query),
    ],
    [
      'post',
      `${prefix}/addCategoryQuestionSet`,
      (request) => questionSet.set(request.body),
    ],
    [
      'get',
      `${prefix}/getCategoryQuestionSet`,
      (request) => questionSet.get(request.query),
    ],
  ];
};
