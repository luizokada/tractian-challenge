import { SensorEnum } from '../const/sensor';
import { StatusEnum } from '../const/status';

export type AssetFromApi = Asset[];

export interface Asset {
  gatewayId?: string;
  id: string;
  locationId: string;
  name: string;
  parentId: any;
  sensorId?: string;
  sensorType?: SensorEnum;
  status: StatusEnum;
}
