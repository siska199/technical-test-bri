'use client';

import menuSidebar from '@/app/_lib/data/menu-sidebar';
import { cn } from '@/app/_lib/helper';
import { useAppSelector } from '@/app/_store';
import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const Sidebar = () => {
  const isToggleSidebar = useAppSelector((state) => state?.ui?.isToggleSidebar);
  const activeSegment = useSelectedLayoutSegment();

  return (
    <div className="h-screen relative bg-gradient-to-r from-purple-500 to-purple-300 ">
      <div
        className={cn({
          'sticky top-0 py-4  space-y-8 transition-all w-[17rem]  h-full': true,
          'w-0 p-0': isToggleSidebar,
        })}
      >
        <div className="gap-2 px-6 flex">
          <Image
            src={'/logo.png'}
            width={30}
            height={30}
            className="self-center flex-grow-0 rounded-md shadow-sm"
            alt="Dev port Logo"
          />
          <h3 className="text-body-xl font-bold py-6 text-white">
            <span className="text-primary-50">Dev</span>Port
          </h3>
        </div>
        <div className="flex flex-col">
          {menuSidebar?.map((data, i) => (
            <Link
              key={i}
              href={data.url}
              className={cn({
                'relative text-body-base text-white px-8 py-3 w-full flex gap-4 items-center cursor-pointer font-medium':
                  true,
                'text-primary-700 ': activeSegment === data.name,
              })}
            >
              <div
                className={cn({
                  'w-10 h-10 bg-white border p-2 rounded-full  z-[9]': true,
                  'bg-primary-100 border-primary-700': activeSegment === data.name,
                })}
              >
                <Image src={data.src || ''} className="object-contain" alt="icon menu sidebar" />
              </div>
              <span className={cn({})}>{data.title}</span>
              {i + 1 !== menuSidebar?.length && (
                <div
                  className={cn({
                    'w-[1px] transform translate-y-1/2 ml-5  border-l absolute top-0 h-full': true,
                  })}
                ></div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
