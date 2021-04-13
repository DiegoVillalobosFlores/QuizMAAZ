import SortedSet from 'redis-skinny-wrapper/src/sortedSet';
import uniqid from 'uniqid';

export default class TeamMembersSet {
  constructor (redis) {
    this.sortedSet = new SortedSet(redis);
  }

  getTeamMembersKey (id){
    const newId = id || uniqid();
    return {
      key: `TEAM_MEMBERS:${newId}`,
      newId
    };
  }

  async set ({id, members}) {
    const {key, newId} = this.getTeamMembersKey(id);
    for (const {name, score} of members) {
      const result = await this.sortedSet.add(key, name, score);
      if(isNaN(result)) throw new Error(`Unable to add Team Member: ${name}:${score}`);
    }
    return newId;
  }

  async get ({id}) {
    if(!id) throw new Error(`Invalid Team Members id, given: ${id}`);
    const result = await this.sortedSet.range(this.getTeamMembersKey(id).key, true);
    const members = [];
    for (let i = 0 ; i < result.length ; i += 2) {
      members.push({answer: result[i], value: result[i + 1]});
    }
    return members;
  }

}