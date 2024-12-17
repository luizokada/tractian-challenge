import { Asset } from '../api-types/asset';
import { Location } from '../api-types/location';

interface TreeProps {
  id: string;
  name: string;
  parentId?: string;
  level: number;
  childrean: Tree[];
  parent?: Tree;
  asset?: Asset;
}
export class Tree {
  private _id: string;
  private _parenteId?: string;
  private _name: string;
  private _childrean: Tree[];
  private _parent?: Tree;
  private _level: number;
  private _asset?: Asset;

  constructor(props: TreeProps) {
    this._id = props.id;
    this._parenteId = props.parentId;
    this._name = props.name;
    this._childrean = props.childrean;
    this._parent = props.parent;
    this._level = props.level;
    this._asset = props.asset;
  }

  static initTree(
    LocationFromApi: {
      [key: string]: {
        data: Location | undefined;
        childrean: {
          id: string;
          type: string;
        }[];
      };
    },
    assets: {
      [key: string]: {
        data: Asset | undefined;
        childrean: string[];
      };
    },
    treeProps: TreeProps,
  ): Tree {
    const tree = new Tree(treeProps);
    tree.childrean = tree.initChildrean(
      LocationFromApi,
      assets,
      tree._id,
      tree,
    );
    return tree;
  }

  private initChildrean(
    LocationFromApi: {
      [key: string]: {
        data: Location | undefined;
        childrean: {
          id: string;
          type: string;
        }[];
      };
    },
    assets: {
      [key: string]: {
        data: Asset | undefined;
        childrean: string[];
      };
    },
    currentId: string | null,
    parent: Tree,
  ) {
    if (!currentId) return [];
    const parentToSearch = currentId;

    let locationChild: { id: string; type: string }[] = [];

    let assetChild: string[] = [];

    if (
      LocationFromApi[parentToSearch] &&
      LocationFromApi[parentToSearch].childrean
    ) {
      locationChild = LocationFromApi[parentToSearch].childrean;
    }

    if (assets[parentToSearch] && assets[parentToSearch].childrean) {
      assetChild = assets[parentToSearch].childrean;
    }

    const locationTree: Tree[] = [];

    locationChild.forEach((child) => {
      const location =
        child.type === 'location'
          ? LocationFromApi[child.id]
          : assets[child.id];
      if (!location) return;
      const tree = new Tree({
        id: child.id,
        name: location?.data?.name || '',
        parentId: parentToSearch,
        level: parent.level + 1,
        childrean: [],
        parent,
        asset: child.type === 'location' ? undefined : assets[child.id].data,
      });
      tree.childrean = this.initChildrean(
        LocationFromApi,
        assets,
        child.id,
        tree,
      );
      locationTree.push(tree);
    });

    const assetChildrean = assetChild.map((child) => {
      const asset = assets[child];
      const tree = new Tree({
        id: child,
        name: asset.data?.name || '',
        parentId: parentToSearch,
        level: parent.level + 1,
        childrean: [],
        parent,
        asset: asset.data,
      });
      tree.childrean = this.initChildrean(LocationFromApi, assets, child, tree);
      return tree;
    });

    return [...locationTree, ...assetChildrean];
  }

  static calcTreeSize(tree: Tree): number {
    let size = 1;
    tree.childrean.forEach((child) => {
      size += this.calcTreeSize(child);
    });

    return size;
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
  get childrean() {
    return this._childrean;
  }
  get parent() {
    return this._parent;
  }
  get level() {
    return this._level;
  }
  get asset(): Asset | undefined {
    return this._asset;
  }

  set asset(data: Asset) {
    this._asset = data;
  }

  set childrean(childrean: Tree[]) {
    this._childrean = childrean;
  }
}
