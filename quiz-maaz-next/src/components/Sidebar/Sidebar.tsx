import Category from 'types/Category';
import Team from 'types/Team';
import SidebarSection from './SidebarSection';

type Props = {
  teams: Array<Team>;
  categories: Array<Category>;
};

export default function Sidebar({ categories, teams }: Props) {
  return (
    <div>
      <SidebarSection title="Teams" items={teams.map(({ name }) => name)} />
      <SidebarSection title="Categories" items={categories.map(({ name }) => name)} />
    </div>
  );
}
