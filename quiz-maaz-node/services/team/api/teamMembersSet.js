import SortedSet from 'redis-skinny-wrapper/src/sortedSet';
import uniqid from 'uniqid';

const getTeamMembersKey = (id) => {
  const newId = id || uniqid();
  return {
    key: `TEAM_MEMBERS:${newId}`,
    newId,
  };
};

export default class TeamMembersSet {
  constructor(redis) {
    this.sortedSet = new SortedSet(redis);
  }

  async set({ id, members }) {
    const { key, newId } = getTeamMembersKey(id);

    await Promise.all(members.map(({ name, score }) => this.sortedSet.add(key, name, score)));

    return newId;
  }

  async get({ id }) {
    if (!id) throw new Error(`Invalid Team Members id, given: ${id}`);
    return this.sortedSet.range(getTeamMembersKey(id).key, true);
  }
}
