import uniqid from 'uniqid';
import Hash from 'redis-skinny-wrapper/src/hash';

export default class Team {
  constructor(redis) {
    this.hash = new Hash(redis);
  }

  getTeamKey(id) {
    const newId = id || uniqid();
    return {
      key: `TEAM:${newId}`,
      newId
    };
  }

  async set({id, name, score, teamMembersId}) {
    const {newId, key} = this.getTeamKey(id);
    const result = await this.hash.add(key, {id: newId, name, score, teamMembersId});
    if(!result) throw new Error('Unable to add Team');
    return newId;
  }

  async get({id}) {
    if(!id) throw new Error(`Invalid Team ID, given: ${id}`);
    const result = await this.hash.getAll(this.getTeamKey(id).key);
    if(!result) throw new Error(`Unable to find Team with id: ${id}`);
    return result;
  }
}