import { messageError } from '@/app/_lib/data/validation';
import { isValidDomain } from '@/app/_lib/helper';
import { zNumberRequired, zStringRequired } from '@/schemas';
import * as z from 'zod';

export const personalInformationSchema = z.object({
  firstName: zStringRequired({
    name: 'First Name',
    max: 50,
  }),
  lastName: zStringRequired({
    name: 'Last Name',
    max: 50,
  }),
  profession: zStringRequired({
    name: 'Prefession',
    max: 100,
  }),
  city: zStringRequired({
    name: 'City',
  }),
  province: zStringRequired({
    name: 'Province',
  }),
  district: zStringRequired({
    name: 'District',
  }),
  postalCode: zNumberRequired({
    name: 'Postal Code',
    min: 5,
  }),
  phone: z.string().nonempty({
    message: messageError.required('Phone'),
  }),
  email: zStringRequired({
    name: 'Email',
    max: 254,
  }).email({
    message: messageError.invalid('Email'),
  }),

  bio: zStringRequired({
    name: 'Bio',
    max: 100,
  }),
  aboutMe: zStringRequired({
    name: 'About Me',
    max: 500,
  }),
  image: z
    .instanceof(File, {
      message: messageError.required('Profesional Image'),
    })
    .refine((file) => file != null, {
      message: messageError.required('Profesional Image'),
    }),

  linkind: z
    .string()
    .optional()
    .refine(
      (linkindUrl) =>
        linkindUrl
          ? isValidDomain({
              url: linkindUrl || '',
              hostname: 'www.linkedin.com',
            })
          : true,
      {
        message: messageError.linkindUrl,
      },
    )
    .or(z.literal('')),
  gitRepository: z.string().url({ message: messageError.linkindUrl }).optional().or(z.literal('')),
  website: z.string().url({ message: messageError.linkindUrl }).optional().or(z.literal('')),
});

export type TFormPersonalInformation = z.infer<typeof personalInformationSchema>;
