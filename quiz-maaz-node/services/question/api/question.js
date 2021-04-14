import uniqid from 'uniqid';
import Hash from 'redis-skinny-wrapper/src/hash';

export default class Question {
  constructor (redis) {
    this.hash = new Hash(redis);
  }

  getQuestionKey (id) {
    const newId = id || uniqid();
    return {
      key: `QUESTION:${newId}`,
      newId
    };
  }

  async set ({description, answerSetId, id}) {
    const {newId, key} = this.getQuestionKey(id);
    const result = await this.hash.add(key, {id: newId, answerSetId, description});
    if(!result) throw new Error('Unable to add Question');
    return newId;
  }

  async get ({id}) {
    if (!id) throw new Error(`No Question ID, given: ${id}`);
    const result = await this.hash.getAll(this.getQuestionKey(id).key);
    if (!result.id) throw new Error(`Invalid Question ID, given: ${id}`);
    return result;
  }
}
