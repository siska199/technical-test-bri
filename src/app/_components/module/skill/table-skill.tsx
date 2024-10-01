'use client';
import { handleGetSkill } from '@/app/_actions/skill';
import Badge from '@/app/_components/ui/Badge';
import Table from '@/app/_components/ui/table';
import { TVariantBadge } from '@/app/_lib/variants/ui/variant-badge';
import { TColumn, TSettingTable } from '@/types/ui';

type TSkill = {
  name: string;
  category: string;
  level: TLevel;
};

enum TLevel {
  BEGINNER = 'beginner',
  INTERMEDIET = 'intermediet',
  ADVANCE = 'advance',
}

const TableSkill = () => {
  const columns: TColumn<TSkill, keyof TSkill>[] = [
    {
      name: 'Name',
      key: 'name',
      className: 'md:min-w-[15rem] flex justify-center',
    },
    {
      name: 'Category',
      key: 'category',
      className: 'md:min-w-[15rem] flex justify-center',
    },
    {
      name: 'Level',
      key: 'level',
      className: 'md:min-w-[15rem] flex justify-center',
      customeComponent: (data: TSkill) => {
        const color: Record<TLevel, TVariantBadge> = {
          beginner: 'softborder-warning',
          intermediet: 'softborder-primary',
          advance: 'softborder-success',
        };
        return <Badge label={data.level} variant={color[data?.level]} />;
      },
    },
  ];

  const setting: TSettingTable<TSkill> = {
    sortBy: 'category',
    sortDir: 'asc',
    currentPage: 1,
    totalPage: 10,
    itemsPerPage: 10,
  };

  const handleFetchData = (params: any) => {
    console.log(params);
  };

  return (
    <div>
      <Table<TSkill>
        columns={columns}
        setting={setting}
        data={[...new Array(10)]?.map((_, i) => ({
          id: i,
          category: 'Frontend Developer',
          name: 'Next JS',
          level: TLevel.BEGINNER,
        }))}
        onChange={handleFetchData}
        action={{
          view: handleGetSkill,
        }}
        withNo={true}
      />
    </div>
  );
};

export default TableSkill;
