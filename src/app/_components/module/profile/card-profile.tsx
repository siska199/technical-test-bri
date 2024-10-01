import CardItemProfile from '@/app/_components/module/profile/card-item-profile';
import { profile } from '@/app/_lib/data/dummy';
import Image from 'next/image';
import React from 'react';

const CardProfile = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center space-y-16">
      <Image
        width={100}
        height={100}
        src={profile.image}
        alt="image-profile"
        className="rounded-full border-4"
      />

      <div className="grid grid-cols-2 gap-4 w-full">
        <CardItemProfile label={'First Name'} value={profile.first_name} />
        <CardItemProfile label={'Last Name'} value={profile.first_name} />
        <CardItemProfile label={'Email'} value={profile.email} />
        <CardItemProfile label={'Number'} value={profile.phone_no} />
        <CardItemProfile label={'City'} value={profile.city} />
        <CardItemProfile label={'Province'} value={profile.province} />
        <CardItemProfile label={'Country'} value={profile.country} />
      </div>
    </div>
  );
};

export default CardProfile;
