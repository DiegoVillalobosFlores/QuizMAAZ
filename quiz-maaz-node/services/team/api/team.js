import uniqid from 'uniqid';
import Hash from 'redis-skinny-wrapper/src/hash';

const getTeamKey = (id) => {
  const newId = id || uniqid();
  return {
    key: `TEAM:${newId}`,
    newId,
  };
};

export default class Team {
  constructor(redis) {
    this.hash = new Hash(redis);
  }

  async set({ id, name, teamMembersId }) {
    const { newId, key } = getTeamKey(id);
    const result = await this.hash.add(key, { id: newId, name, teamMembersId });
    if (!result) throw new Error('Unable to add Team');
    return newId;
  }

  async get({ id }) {
    if (!id) throw new Error(`Invalid Team ID, given: ${id}`);
    const result = await this.hash.getAll(getTeamKey(id).key);
    if (!result) throw new Error(`Unable to find Team with id: ${id}`);
    return result;
  }
}
