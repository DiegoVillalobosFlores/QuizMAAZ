import Hash from 'redis-skinny-wrapper/src/hash';
import uniqid from 'uniqid';

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
  }

  async set({
    id, name, schedule, status, categoriesSetId, teamsSetId,
  }) {
    const { key, newId } = getQuizKey(id);
    const result = await this.hash.add(key, {
      name, schedule, status, categoriesSetId, teamsSetId,
    });

    if (!Number.isNaN(result)) throw new Error('Unable to add Quiz');

    return newId;
  }

  async get({ id }) {
    if (!id) throw new Error(`No Quiz ID, given: ${id}`);
    const result = await this.hash.getAll(getQuizKey(id).key);
    if (!result.id) throw new Error(`Invalid Quiz ID, given: ${id}`);
    return result;
  }
}
