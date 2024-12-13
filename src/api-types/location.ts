export type LocationFromApi = Location[];

export interface Location {
  id: string;
  name: string;
  parentId?: string;
}
