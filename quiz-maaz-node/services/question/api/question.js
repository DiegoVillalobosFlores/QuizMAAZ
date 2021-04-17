import uniqid from 'uniqid';
import Hash from 'redis-skinny-wrapper/src/hash';

const getQuestionKey = (id) => {
  const newId = id || uniqid();
  return {
    key: `QUESTION:${newId}`,
    newId,
  };
};

export default class Question {
  constructor(redis) {
    this.hash = new Hash(redis);
  }

  async set({ description, answerSetId, id }) {
    const { newId, key } = getQuestionKey(id);
    const result = await this.hash.add(key, { id: newId, answerSetId, description });

    if (!Number.isNaN(result)) throw new Error('Unable to add Question');

    return newId;
  }

  async get({ id }) {
    if (!id) throw new Error(`No Question ID, given: ${id}`);
    const result = await this.hash.getAll(getQuestionKey(id).key);
    if (!result.id) throw new Error(`Invalid Question ID, given: ${id}`);
    return result;
  }
}
