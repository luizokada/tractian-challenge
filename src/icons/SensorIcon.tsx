import React from 'react';
import { IconProps } from './type/IcontProps';

const SensorIcon: React.FC<IconProps> = ({
  width = '20',
  height = '20',
  color = '#2188FF',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_1_7907"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={width}
        height={height}
      >
        <rect width={width} height={height} fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1_7907)">
        <path
          d="M10 12.7778C9.54169 12.7778 9.14933 12.6146 8.82294 12.2882C8.49655 11.9619 8.33335 11.5695 8.33335 11.1112C8.33335 10.6528 8.49655 10.2605 8.82294 9.93408C9.14933 9.60769 9.54169 9.4445 10 9.4445C10.4584 9.4445 10.8507 9.60769 11.1771 9.93408C11.5035 10.2605 11.6667 10.6528 11.6667 11.1112C11.6667 11.5695 11.5035 11.9619 11.1771 12.2882C10.8507 12.6146 10.4584 12.7778 10 12.7778ZM6.04169 14.1737C5.72224 13.7431 5.46877 13.2709 5.28127 12.757C5.09377 12.2431 5.00002 11.6945 5.00002 11.1112C5.00002 9.72228 5.48613 8.54172 6.45835 7.5695C7.43058 6.59728 8.61113 6.11117 10 6.11117C11.3889 6.11117 12.5695 6.59728 13.5417 7.5695C14.5139 8.54172 15 9.72228 15 11.1112C15 11.6945 14.9063 12.2501 14.7188 12.7778C14.5313 13.3056 14.2778 13.7778 13.9584 14.1945C13.8195 14.3751 13.6354 14.4653 13.4063 14.4653C13.1771 14.4653 12.9722 14.3751 12.7917 14.1945C12.6389 14.0417 12.559 13.8542 12.5521 13.632C12.5452 13.4098 12.6111 13.1945 12.75 12.9862C12.9445 12.7084 13.0903 12.4132 13.1875 12.1007C13.2847 11.7882 13.3334 11.4584 13.3334 11.1112C13.3334 10.1945 13.007 9.40978 12.3542 8.757C11.7014 8.10422 10.9167 7.77783 10 7.77783C9.08335 7.77783 8.29863 8.10422 7.64585 8.757C6.99308 9.40978 6.66669 10.1945 6.66669 11.1112C6.66669 11.4723 6.71877 11.8056 6.82294 12.1112C6.9271 12.4167 7.06947 12.7084 7.25002 12.9862C7.38891 13.1945 7.45141 13.4132 7.43752 13.6424C7.42363 13.8716 7.3403 14.0626 7.18752 14.2153C7.02085 14.382 6.82294 14.4619 6.59377 14.4549C6.3646 14.448 6.18058 14.3542 6.04169 14.1737ZM3.68752 16.5487C3.06252 15.8126 2.56946 14.9827 2.20835 14.0591C1.84724 13.1355 1.66669 12.1528 1.66669 11.1112C1.66669 9.95839 1.88544 8.87505 2.32294 7.86117C2.76044 6.84728 3.35419 5.96533 4.10419 5.21533C4.85419 4.46533 5.73613 3.87158 6.75002 3.43408C7.76391 2.99658 8.84724 2.77783 10 2.77783C11.1528 2.77783 12.2361 2.99658 13.25 3.43408C14.2639 3.87158 15.1459 4.46533 15.8959 5.21533C16.6459 5.96533 17.2396 6.84728 17.6771 7.86117C18.1146 8.87505 18.3334 9.95839 18.3334 11.1112C18.3334 12.1528 18.1528 13.1389 17.7917 14.0695C17.4306 15.0001 16.9375 15.8334 16.3125 16.5695C16.1597 16.7362 15.9722 16.8195 15.75 16.8195C15.5278 16.8195 15.3334 16.7362 15.1667 16.5695C15.0139 16.4167 14.934 16.2257 14.9271 15.9966C14.9202 15.7674 14.9931 15.5626 15.1459 15.382C15.6181 14.7987 15.9896 14.1459 16.2604 13.4237C16.5313 12.7014 16.6667 11.9306 16.6667 11.1112C16.6667 9.25005 16.0209 7.67367 14.7292 6.382C13.4375 5.09033 11.8611 4.4445 10 4.4445C8.13891 4.4445 6.56252 5.09033 5.27085 6.382C3.97919 7.67367 3.33335 9.25005 3.33335 11.1112C3.33335 11.9306 3.46877 12.698 3.7396 13.4132C4.01044 14.1285 4.38891 14.7778 4.87502 15.3612C5.0278 15.5417 5.10072 15.7466 5.09377 15.9757C5.08683 16.2049 5.00002 16.4028 4.83335 16.5695C4.66669 16.7362 4.47224 16.816 4.25002 16.8091C4.0278 16.8021 3.8403 16.7153 3.68752 16.5487Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default SensorIcon;
