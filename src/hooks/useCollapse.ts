import { useState, useRef, useEffect } from 'react';

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
