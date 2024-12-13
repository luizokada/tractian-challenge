import React from 'react';
import { IconProps } from './type/IcontProps';

const ChevronIcon: React.FC<IconProps> = ({
  width = 12,
  height = 12,
  color = '#2188FF',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ChevronIcon;
