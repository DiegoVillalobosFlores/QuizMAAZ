import SortedSet from 'redis-skinny-wrapper/src/sortedSet';
import uniqid from 'uniqid';

const getCategoryQuestionSet = (id) => {
  const newId = id || uniqid();
  return {
    key: `CATEGORY_QUESTIONS:${newId}`,
    newId,
  };
};

export default class CategoryQuestionSet {
  constructor(redis) {
    this.sortedSet = new SortedSet(redis);
  }

  async set({ id, questions }) {
    const { newId, key } = getCategoryQuestionSet(id);

    await Promise.all(questions.map(
      (question) => this.sortedSet.add(key, question.id, question.order),
    ));
    return newId;
  }

  async get({ id }) {
    if (!id) throw new Error(`Invalid ID: ${id}`);
    return this.sortedSet.range(getCategoryQuestionSet(id).key, true);
  }
}
