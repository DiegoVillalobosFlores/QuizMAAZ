import uniqid from 'uniqid';
import SortedSet from 'redis-skinny-wrapper/src/sortedSet';

export default class QuestionAnswersSet {
  constructor(redis) {
    this.sortedSet = new SortedSet(redis);
  }

  getQuestionAnswersSetKey (id) {
    const newId = id || uniqid();
    return {
      key: `QUESTION_ANSWERS:${newId}`,
      newId
    };
  }

  async set ({id, answers}) {
    const {key, newId} = this.getQuestionAnswersSetKey(id);
    for (const {answer, value} of answers) {
      const result = await this.sortedSet.add(key, answer, value);
      if(isNaN(result)) throw new Error(`Unable to add Answer: ${answer}:${value}`);
    }

    return newId;
  }


  async get ({id}) {
    if (!id) throw new Error(`Invalid Answer Set ID, given: ${id}`);
    const result = await this.sortedSet.range(this.getQuestionAnswersSetKey(id).key, true);
    if (!result) throw new Error(`Unable to find questionAnswerSet: ${id}`);
    return result;
  }
}
