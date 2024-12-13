import { useState, useRef, useEffect } from 'react';

/**
 *@param {Boolean} isExpanded: State that controls the collapse
 *@param {Array<unknown>} depedencyArray: Array with the dependencies that will trigger the recalculation of the height
 *@returns {Object} ref: Ref of the element that will be collapsed, height: Height of the element
 */

export const useCollapse = (
  isExpanded: boolean,
  depedencyArray?: unknown[],
) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, ...(Array.isArray(depedencyArray) ? depedencyArray : [])]);

  return { ref: contentRef, height };
};
