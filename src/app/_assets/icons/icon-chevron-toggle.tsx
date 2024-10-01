import { IconChevronDown } from '@/app/_assets/icons';
import { cn } from '@/app/_lib/helper';

interface TProps {
  isOpen: boolean;
  onClick?: () => void;
  variant?: '1' | '2';
  className?: string;
}

const IconChevronToggle = (props: TProps) => {
  const { isOpen, onClick, className, variant = '1', ...attrs } = props;

  const handleOnClick = () => {
    onClick && onClick();
  };

  return (
    <IconChevronDown
      className={cn({
        'transition-transform flex-inline duration-300 cursor-pointer': true,
        [`${variant === '1' && 'rotate-0'} ${variant === '2' && '-rotate-90'}`]: !isOpen,
        [`${variant === '1' && 'rotate-180'} ${variant === '2' && 'rotate-0'}`]: isOpen,
        [className || '']: className,
      })}
      {...attrs}
      onClick={handleOnClick}
    />
  );
};

export default IconChevronToggle;
