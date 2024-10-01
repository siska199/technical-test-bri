'use client';
/* eslint-disable no-nested-ternary */
import { IconArrowUp, IconSort } from '@/app/_assets/icons';
import Button from '@/app/_components/ui/button';
import EmptyData from '@/app/_components/ui/empty-data';
import { cn } from '@/app/_lib/helper';
import { TColumn, TSettingTable } from '@/types/ui';
import { Eye, FilePenLine, Trash } from 'lucide-react';

type TWithId<T> = T & { id: string | number };

export interface TTableProps<TData> {
  columns: TColumn<TData, keyof TData>[];
  data: TWithId<TData>[];
  setting: TSettingTable<TData>;
  onChange: (params: any) => void;
  isLoading?: boolean;
  withNo?: boolean;
  action?: {
    view?: (data: TData) => void;
    delete?: (data: TData) => void;
    edit?: (data: TData) => void;
  };
}

const Table = <TData,>(props: TTableProps<TData>) => {
  const { columns, action, isLoading, data, setting, onChange, withNo } = props;

  const handleSortColumn = (params: { key: keyof TData }) => {
    const sortDir =
      params?.key !== setting?.sortBy ? 'desc' : setting?.sortDir === 'desc' ? 'asc' : 'desc';
    if (data?.length !== 0 && !isLoading) {
      onChange({
        ...setting,
        sortBy: params.key,
        sortDir: sortDir,
      });
    }
  };

  const style = {
    columnData: 'py-2 px-6',
    columnNo: 'py-2 px-4 w-[3rem]',
  };

  const isShowtnBtnAction = action?.delete || action?.view || action?.edit;

  const handleOnClickAction = async (data: TData, type: 'view' | 'edit' | 'delete') => {
    switch (type) {
      case 'delete':
        action?.delete && (await action?.delete(data));
        break;
    }
  };

  return (
    <div className="border w-full overflow-hidden max-w-full">
      <div className="relative overflow-auto max-w-full max-h-[30rem] ">
        <table className={`table-auto w-full ${data?.length === 0 && 'flex flex-col'}`}>
          <thead className="sticky z-[2] top-0  bg-primary-50  ">
            <tr className="border-b ">
              {withNo && (
                <th className={`${style.columnNo}`}>
                  <div className=" w-fit">No.</div>
                </th>
              )}
              {columns?.map((column, i) => (
                <th key={i}>
                  <div
                    className={`flex ${style.columnData} py-5 items-center text-center ${column?.className}`}
                  >
                    {column?.name}
                    {column?.isSorted && (
                      <span
                        onClick={() => handleSortColumn({ key: column.key })}
                        className={`cursor-pointer ${(isLoading || data?.length === 0) && '!cursor-not-allowed'}`}
                      >
                        {setting?.sortBy === column?.key ? (
                          <IconArrowUp
                            className={cn({
                              'icon-gray h-[1.25rem] transition-transform duration-300': true,
                              'rotate-180':
                                setting?.sortDir === 'desc' && setting?.sortBy === column?.key,
                            })}
                          />
                        ) : (
                          <IconSort className="ml-1 w-[1.1rem] h-[1.1rem]" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {isShowtnBtnAction && <th className={`${style.columnData} w-full`}>Action</th>}
            </tr>
          </thead>
          {data?.length >= 0 && (
            <tbody className={`text-gray`}>
              {data?.map((dataRow, i) => {
                return (
                  <tr key={i} className={`border-b border-primary-50 `}>
                    {withNo && (
                      <td>
                        <div className={`${style.columnNo}`}>
                          {(setting?.currentPage - 1) * setting?.itemsPerPage + i + 1}
                        </div>
                      </td>
                    )}
                    {columns?.map((column, j) => (
                      <td key={j}>
                        <div className={`${style.columnData} ${column?.className}`}>
                          {column?.customeComponent
                            ? column?.customeComponent(dataRow)
                            : (dataRow[column.key] as string)}
                        </div>
                      </td>
                    ))}
                    {isShowtnBtnAction && (
                      <td className={'w-full'}>
                        <div
                          className={`mx-auto flex gap-2 justify-center items-center w-full ${style.columnData}`}
                        >
                          {action?.view && (
                            <Button
                              onClick={() => handleOnClickAction(dataRow, 'view')}
                              variant={'soft-primary'}
                              shape={'circle'}
                              className="!p-2"
                            >
                              <Eye size={15} />
                            </Button>
                          )}
                          {action?.edit && (
                            <Button
                              onClick={() => handleOnClickAction(dataRow, 'edit')}
                              variant={'soft-warning'}
                              shape={'circle'}
                              className="!p-2"
                            >
                              <FilePenLine size={15} />
                            </Button>
                          )}
                          {action?.delete && (
                            <Button
                              onClick={() => handleOnClickAction(dataRow, 'delete')}
                              variant={'soft-error'}
                              shape={'circle'}
                              className="!p-2"
                            >
                              <Trash size={15} />
                            </Button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        {data?.length === 0 && (
          <div className="w-full h-[20rem] flex items-center justify-center">
            {isLoading ? (
              'Loading...'
            ) : (
              <EmptyData
                customeClass={{ container: 'w-full !border-none', img: 'h-[10rem] w-[10rem]' }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
