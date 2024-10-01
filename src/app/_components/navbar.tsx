'use client';
import { IconHumburger, IconLogout, IconUser } from '@/app/_assets/icons';
import { AvatarFemale } from '@/app/_assets/images';
import Avatar from '@/app/_components/ui/Avatar';
import DropdownBase, { TOptionDropdown } from '@/app/_components/ui/dropdown';
import { useAppDispatch, useAppSelector } from '@/app/_store';
import { handleOnLogin } from '@/app/_store/auth/authSlice';
import { handleToggle } from '@/app/_store/ui/uiSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import { useMemo } from 'react';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const activeSegment = useSelectedLayoutSegment();
  const isToggleSidebar = useAppSelector((state) => state?.ui?.isToggleSidebar);
  const optionDropdown = useMemo(
    () => [
      {
        label: (
          <>
            <IconUser /> Profile
          </>
        ),
        value: 'profile',
        className: 'border-b',
      },
      {
        label: (
          <>
            <IconLogout /> Sign Out
          </>
        ),
        value: 'logout',
      },
    ],
    [],
  );

  const handleOnToggle = () => {
    dispatch(handleToggle(!isToggleSidebar));
  };

  const handleOnClickItemDropdown = (data: TOptionDropdown) => {
    switch (data.value) {
      case 'profile':
        router.push('/profile');
        break;
      case 'logout':
        dispatch(handleOnLogin({ isLogin: true }));
        router.push('/auth/sign-in');
        break;
    }
  };

  return (
    <nav className="px-6 py-3 sticky bg-white top-0 flex gap-4 items-center">
      {activeSegment !== 'profile' && (
        <IconHumburger className="cursor-pointer" onClick={handleOnToggle} />
      )}
      {activeSegment === 'profile' && (
        <Link href={'/personal-information'}>
          <Image
            src={'/logo.png'}
            width={30}
            height={30}
            alt="Dev port Logo"
            className="rounded-md shadow-sm cursor-pointer-cutome"
          />
        </Link>
      )}

      <div className="ml-auto">
        <div className="flex gap-4 ">
          <Avatar
            width={50}
            height={50}
            src={AvatarFemale}
            priority
            alt="avatar"
            className="self-center border-2 rounded-full"
          />
          <div className="flex flex-col justify-center space-y-1">
            <p className="text-black font-semibold">Siska Apriana</p>
            <p>Frontend Developer</p>
          </div>
          <DropdownBase
            options={optionDropdown}
            onClick={handleOnClickItemDropdown}
            customeClass={{
              containerDropdown: 'h-fit my-auto',
              btnDropdown: 'rounded-full p-2 my-auto',
              overlay: 'mt-[1.4rem]',
            }}
            position="right"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
