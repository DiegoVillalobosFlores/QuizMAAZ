import uniqid from 'uniqid';
import Answer from './answer';
import SortedSet from 'redis-skinny-wrapper/src/sortedSet';

class AnswerSet {
  constructor(redis) {
    this.sortedSet = new SortedSet(redis);
    this.answer = new Answer(redis);
  }

  getAnswerSetKey(id) {
    const newId = id || uniqid();
    return {
      key: `ANSWERS:${newId}`,
      newId
    };
  }

  async set({id, answers}) {
    const {key, newId} = this.getAnswerSetKey(id);
    for(const answerId of answers) {
      const answer = await this.answer.get({id: answerId});
      if(!answer) throw new Error(`Invalid Answer ID, given: ${answer.id}`);
      const result = await this.sortedSet.add(key, answer.id, answer.value);
      if(isNaN(result)) throw new Error(`Failed to add answer ${answerId} to set ${newId}`);
    }
    return newId;
  }

  get({id}) {
    if(!id) throw new Error(`Invalid Answer Set ID, given: ${id}`);
    return this.sortedSet.range(this.getAnswerSetKey(id).key);
  }
}

export default AnswerSet;
