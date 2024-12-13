import { Asset, AssetFromApi } from '../api-types/asset';
import { LocationFromApi } from '../api-types/location';

interface TreeProps {
  id: string;
  name: string;
  parentId?: string;
  level: number;
  children: Tree[];
  parent?: Tree;
  data?: Asset;
}
export class Tree {
  private _id: string;
  private _parenteId?: string;
  private _name: string;
  private _children: Tree[];
  private _parent?: Tree;
  private _level: number;
  private _data?: Asset;

  constructor(props: TreeProps) {
    this._id = props.id;
    this._parenteId = props.parentId;
    this._name = props.name;
    this._children = props.children;
    this._parent = props.parent;
    this._level = props.level;
    this._data = props.data;
  }

  static initTree(
    LocationFromApi: LocationFromApi,
    assets: AssetFromApi,
    treeProps: TreeProps,
    type?: string,
  ): Tree {
    const tree = new Tree(treeProps);
    tree.children = tree.initChildrean(
      LocationFromApi,
      assets,
      tree._id,
      tree,
      type,
    );
    return tree;
  }

  private initChildrean(
    LocationFromApi: LocationFromApi,
    assets: AssetFromApi,
    currentId: string | null,
    parent: Tree,
    type?: string,
  ) {
    const parentToSearch = currentId === 'root' ? null : currentId;
    const locationChildren = LocationFromApi.filter(
      (location) => location.parentId === parentToSearch,
    );
    const assetChildren = assets.filter((asset) => {
      if (type === 'location') {
        return asset.locationId === parentToSearch;
      }
      if (type === 'asset') {
        return asset.parentId === parentToSearch;
      }
      if (!parentToSearch) {
        return asset.locationId === null && asset.parentId === null;
      }
      return false;
    });

    if (!locationChildren.length && !assetChildren.length) {
      return [];
    }

    const locationChieldren = locationChildren.map((location) => {
      const locationNode = Tree.initTree(
        LocationFromApi,
        assets,
        {
          id: location.id,
          name: location.name,
          parentId: location.parentId,
          level: parent.level + 1,
          children: [],
          parent: parent,
        },
        'location',
      );
      return locationNode;
    });

    const assetChieldren = assetChildren.map((asset) => {
      const assetNode = Tree.initTree(
        LocationFromApi,
        assets,
        {
          id: asset.id,
          name: asset.name,
          parentId: asset.parentId,
          level: parent.level + 1,
          children: [],
          parent: parent,
        },
        'asset',
      );
      assetNode.data = asset;
      return assetNode;
    });

    return [...locationChieldren, ...assetChieldren];
  }
  get id() {
    return this._id;
  }
  get parentId() {
    return this._parenteId;
  }
  get name() {
    return this._name;
  }
  get children() {
    return this._children;
  }
  get parent() {
    return this._parent;
  }
  get level() {
    return this._level;
  }
  get asset() {
    return this._data;
  }

  set data(data: Asset) {
    this._data = data;
  }

  set children(children: Tree[]) {
    this._children = children;
  }
}
