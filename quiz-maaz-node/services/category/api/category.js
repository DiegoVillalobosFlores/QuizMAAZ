import Hash from 'redis-skinny-wrapper/src/hash';
import uniqid from 'uniqid';

export default class Category {
  constructor (redis) {
    this.hash = new Hash(redis);
  }

  getCategoryKey (id) {
    const newId = id || uniqid();
    return {
      key: `CATEGORY:${newId}`,
      newId
    };
  }

  async set ({id, name, questionSetId}) {
    const {key, newId} = this.getCategoryKey(id);
    const result = await this.hash.add(key, {id: newId, name, questions: questionSetId});
    if (!result) throw new Error('Unable to add Category');
    return newId;
  }

  async get({id}) {
    if (!id) throw new Error(`No Category ID, given: ${id}`);
    const result = await this.hash.getAll(this.getCategoryKey(id).key);
    if (!result.id) throw new Error(`Invalid Category ID, given: ${id}`);
    return result;
  }
}