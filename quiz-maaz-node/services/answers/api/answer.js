import uniqid from 'uniqid';
import Hash from 'redis-skinny-wrapper/src/hash';

class Answer {
  constructor(redis) {
    this.hash = new Hash(redis);
  }

  getAnswerId(id) {
    const newId = id ? id : uniqid();
    return {
      key: `ANSWER:${newId}`,
      newId
    };
  }

  async set({questionId, id, description, value}) {
    if(!questionId) throw new Error(`An answer should always be associated with a question with a valid ID, given: ${questionId}`);
    const {key, newId} = this.getAnswerId(id);
    const result = await this.hash.add(key, {description, value, questionId, id: newId});
    if(result === 4) return newId;
    return 'Failed to add Answer';
  }

  async get({id}) {
    if(!id) throw new Error(`No Answer ID, given: ${id}`);
    const result = await this.hash.getAll(this.getAnswerId(id).key);
    if(!result.id) throw new Error(`Invalid Answer ID, given: ${id}`);
    return result;
  }
}

export default Answer;
