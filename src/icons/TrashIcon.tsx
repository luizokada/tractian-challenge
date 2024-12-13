import React from 'react';
import { IconProps } from './type/IcontProps';

// import { Container } from './styles';

const TrashIcon: React.FC<IconProps> = ({
  color = '#F8F9FA',
  width = 26,
  height = 26,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.25 1.75H16.75M1.75 5.5H24.25M21.75 5.5L20.8734 18.6491C20.7419 20.6219 20.6761 21.6083 20.25 22.3563C19.8749 23.0147 19.3091 23.5441 18.6271 23.8746C17.8525 24.25 16.8639 24.25 14.8867 24.25H11.1133C9.13613 24.25 8.14754 24.25 7.37292 23.8746C6.69095 23.5441 6.12511 23.0147 5.74998 22.3563C5.32389 21.6083 5.25813 20.6219 5.12661 18.6491L4.25 5.5M10.5 11.125V17.375M15.5 11.125V17.375"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TrashIcon;
