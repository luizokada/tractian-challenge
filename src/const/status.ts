export enum StatusEnum {
  OPERATING = 'operating',
  ALERT = 'alert',
}

export const StatusDict = {
  [StatusEnum.OPERATING]: 'Operando',
  [StatusEnum.ALERT]: 'Alerta',
};

export const StatusColor = {
  [StatusEnum.OPERATING]: '#27AE60',
  [StatusEnum.ALERT]: '#EB5757',
};
