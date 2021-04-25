import uniqid from 'uniqid';
import Automatic from 'redis-skinny-wrapper/src/automatic';
import Stream from 'redis-skinny-wrapper/src/stream';

const getQuizKey = (id) => {
  const newId = id || uniqid();
  return {
    key: `QUIZ:${newId}`,
    newId,
  };
};

const getQuizSchemaKey = (id) => `QUIZ:${id}:SCHEMA`;

export default class Quiz {
  constructor(redis) {
    this.stream = new Stream(redis);
    this.automatic = new Automatic(redis, null, true);
  }

  async set({
    id, quiz,
  }) {
    const { key, newId } = getQuizKey(id);
    const newSchema = this.automatic.generateSchema({ id: newId, quiz });

    await this.stream.add(getQuizSchemaKey(newId), newSchema);
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
    const result = await this.stream.range(getQuizSchemaKey(id), null, 1);
    if (result.length === 0 || !result[0].id) throw new Error(`Invalid Quiz ID, given: ${id}`);
    const { quiz } = result[0];
    return { id, quiz };
  }
}
