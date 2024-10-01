import FormPersonalInformation from '@/app/_components/module/personal-information/form-personal-information';
import ContainerPage from '@/app/_components/ui/container-page';
import React from 'react';

const PersonalInformationPage = () => {
  return (
    <ContainerPage title="Personal Information">
      <FormPersonalInformation />
    </ContainerPage>
  );
};

export default PersonalInformationPage;
