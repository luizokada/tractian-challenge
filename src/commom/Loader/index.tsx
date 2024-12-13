import React from 'react';
import { LoaderContainer } from './styles';

interface LoaderProps {
  size: number;
}
const Loader: React.FC<LoaderProps> = ({ size }) => {
  return (
    <LoaderContainer size={size}>
      <div className="loader" />
    </LoaderContainer>
  );
};

export default Loader;
