import { NotFound } from '@/app/_assets/images';
import { cn } from '@/app/_lib/helper';
import Image from 'next/image';

interface TProps {
  customeClass?: {
    container?: string;
    img?: string;
    label?: string;
  };
}

const EmptyData = (props: TProps) => {
  const { customeClass } = props;
  return (
    <div
      className={cn({
        'flex flex-col items-center justify-center gap-2': true,
        [customeClass?.container || '']: customeClass?.container,
      })}
    >
      <div
        className={cn({
          [customeClass?.img || '']: customeClass?.img,
        })}
      >
        <Image
          className={cn({
            'object-cover': true,
          })}
          src={NotFound}
          alt="empty-data"
        />
      </div>
      <p
        className={cn({
          'font-medium text-base-medium': true,
          [customeClass?.label || '']: customeClass?.label,
        })}
      >
        No data to show
      </p>
    </div>
  );
};

export default EmptyData;
