import {
  Certification,
  Education,
  PersonalInformation,
  Portofolio,
  Skill,
  WorkHistroy,
} from '@/app/_assets/images';
import { routes } from '@/app/_lib/config/global-variable';

const menuSidebar = [
  {
    title: 'Personal Information',
    src: PersonalInformation,
    url: routes.personalInformation,
    name: 'personal-information',
  },
  {
    title: 'Skill',
    src: Skill,
    url: routes.skill,
    name: 'skill',
  },
  {
    title: 'Work History',
    src: WorkHistroy,
    url: routes.workHistory,
    name: 'work-history',
  },
  {
    title: 'Education',
    src: Education,
    url: routes.education,
    name: 'education',
  },
  {
    title: 'Portofolio',
    src: Portofolio,
    url: routes.portofolio,
    name: 'portofolio',
  },
  {
    title: 'Certification',
    src: Certification,
    url: routes.certification,
    name: 'certification',
  },
];

export default menuSidebar;
