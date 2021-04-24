import Hash from 'redis-skinny-wrapper/src/hash';
import uniqid from 'uniqid';
import Automatic from 'redis-skinny-wrapper/src/automatic';

const getQuizKey = (id) => {
  const newId = id || uniqid();
  return {
    key: `QUIZ:${newId}`,
    newId,
  };
};

export default class Quiz {
  constructor(redis) {
    this.hash = new Hash(redis);
    this.automatic = new Automatic(redis, null, true);
  }

  async set({
    id, quiz,
  }) {
    const { key, newId } = getQuizKey(id);
    const newSchema = this.automatic.generateSchema({ id: newId, quiz });
    this.automatic.setSchema(newSchema);
    await this.automatic.add(key, { id: newId, quiz });

    return newId;
  }

  async get({ id }) {
    if (!id) throw new Error(`No Quiz ID, given: ${id}`);
    const result = await this.automatic.get(getQuizKey(id).key);
    if (!result.id) throw new Error(`Invalid Quiz ID, given: ${id}`);
    return result;
  }

  async getSchema({ id }) {
    if (!id) throw new Error(`No Quiz ID, given: ${id}`);
    // if (!result.id) throw new Error(`Invalid Quiz ID, given: ${id}`);
    return this.automatic.getSchema();
  }
}
