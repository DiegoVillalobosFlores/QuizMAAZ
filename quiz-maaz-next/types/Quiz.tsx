import Team from './Team';
import Category from './Category';

type Quiz = {
  name: string,
  active: boolean;
  teams: Array<Team>;
  categories: Array<Category>
};

export default Quiz;
