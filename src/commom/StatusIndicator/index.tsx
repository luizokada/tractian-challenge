import React from 'react';
import { SensorEnum } from '../../const/sensor';
import { StatusColor, StatusEnum } from '../../const/status';
import BoltIcon from '../../icons/BoltIcon';
import { StatusIndicatorContainer } from './styles';

interface StatusIndicatorProps {
  status: StatusEnum;
  size?: number;
  type: SensorEnum | undefined;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size,
  type,
}) => {
  return (
    <>
      {type === SensorEnum.ENERGY && (
        <BoltIcon color={StatusColor[status]} fill={StatusColor[status]} />
      )}
      {type !== SensorEnum.ENERGY && (
        <StatusIndicatorContainer
          color={StatusColor[status]}
          size={size || 10}
        />
      )}
    </>
  );
};

export default StatusIndicator;
