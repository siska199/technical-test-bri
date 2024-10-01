import { isEmptyValue } from '@/app/_lib/helper';
import { RefObject, useEffect } from 'react';

interface TProps<T> {
  handler: () => void;
  ref: RefObject<T>;
  refExceptions?: RefObject<T>[];
}

const useOnClickOutside = <T extends HTMLElement>(props: TProps<T>) => {
  const { ref, handler, refExceptions } = props;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        (isEmptyValue(refExceptions)
          ? true
          : !refExceptions?.some((exceptionRef) => {
              return exceptionRef.current?.contains(event.target as Node);
            }))
      ) {
        handler();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
