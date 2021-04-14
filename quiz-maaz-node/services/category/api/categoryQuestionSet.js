import SortedSet from 'redis-skinny-wrapper/src/sortedSet';
import uniqid from 'uniqid';

export default class CategoryQuestionSet {
  constructor(redis) {
    this.sortedSet = new SortedSet(redis);
  }

  getCategoryQuestionSet(id) {
    const newId = id || uniqid();
    return {
      key: `CATEGORY_QUESTIONS:${newId}`,
      newId
    };
  }

  async set({id, questions}) {
    const {newId, key} = this.getCategoryQuestionSet(id);
    for (const question of questions) {
      const result = await this.sortedSet.add(key, question.id, question.order);
      if(isNaN(result)) throw new Error('Unable to add Question to category');
    }
    return newId;
  }

  async get({id}) {
    if(!id) throw new Error(`Invalid ID: ${id}`);
    return this.sortedSet.range(this.getCategoryQuestionSet(id).key, true);
  }
}