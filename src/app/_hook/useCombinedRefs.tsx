import React, { useCallback } from 'react';

const useCombinedRefs = <T,>(...refs: React.Ref<T>[]): React.RefCallback<T> => {
  return useCallback(
    (element: T) => {
      refs.forEach((ref) => {
        if (!ref) return;

        if (typeof ref === 'function') {
          ref(element);
        } else {
          (ref as React.MutableRefObject<T>).current = element;
        }
      });
    },
    [refs],
  );
};

export default useCombinedRefs;
