import FilterSearch from '@/app/_components/module/skill/filter-search';
import TableSkill from '@/app/_components/module/skill/table-skill';
import ContainerPage from '@/app/_components/ui/container-page';

const SkillPage = () => {
  return (
    <ContainerPage title="Skill">
      <div className="space-y-6">
        <FilterSearch />
        <TableSkill />
      </div>
    </ContainerPage>
  );
};

export default SkillPage;
