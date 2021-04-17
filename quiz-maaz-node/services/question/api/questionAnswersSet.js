import uniqid from 'uniqid';
import SortedSet from 'redis-skinny-wrapper/src/sortedSet';

const getQuestionAnswersSetKey = (id) => {
  const newId = id || uniqid();
  return {
    key: `QUESTION_ANSWERS:${newId}`,
    newId,
  };
};

export default class QuestionAnswersSet {
  constructor(redis) {
    this.sortedSet = new SortedSet(redis);
  }

  async set({ id, answers }) {
    const { key, newId } = getQuestionAnswersSetKey(id);

    await Promise.all(answers.map(({ answer, value }) => this.sortedSet.add(key, answer, value)));

    return newId;
  }

  async get({ id }) {
    if (!id) throw new Error(`Invalid Answer Set ID, given: ${id}`);
    const result = await this.sortedSet.range(getQuestionAnswersSetKey(id).key, true);
    if (!result) throw new Error(`Unable to find questionAnswerSet: ${id}`);
    return result;
  }
}
