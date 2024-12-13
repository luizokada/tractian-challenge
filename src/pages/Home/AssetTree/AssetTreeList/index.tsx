import React, { useEffect, useMemo } from 'react';
import AssetIcon from '../../../../icons/AssetIcon';
import ComponentIcon from '../../../../icons/ComponentIcon';
import LocationIcon from '../../../../icons/LocationIcon';
import { Tree } from '../../../../utils/Tree';
import { AssetTreeItemContainer, ChildreanWrapper } from './styles';
import { useCollapse } from '../../../../hooks/useCollapse';
import { Asset } from '../../../../api-types/asset';
import StatusIndicator from '../../../../commom/StatusIndicator';

// import { Container } from './styles';

interface AssetTreeListProps {
  currentNode: Tree;
  setSelectedAsset: React.Dispatch<React.SetStateAction<Asset | undefined>>;
  selectedAsset: Asset | undefined;
}

const AssetTreeList: React.FC<AssetTreeListProps> = ({
  currentNode,
  setSelectedAsset,
  selectedAsset,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const { ref, height } = useCollapse(isExpanded, [currentNode]);

  const shouldRenderBorder = useMemo(() => {
    return (
      currentNode.children &&
      currentNode.children.length > 0 &&
      currentNode.id !== 'root'
    );
  }, [currentNode]);

  const isAssetSelected = useMemo(() => {
    return selectedAsset?.id === currentNode.id;
  }, [selectedAsset, currentNode.asset]);

  const iconColor = useMemo(() => {
    return isAssetSelected ? '#fff' : undefined;
  }, [isAssetSelected]);

  return (
    <AssetTreeItemContainer
      $shouldREnderBorder={shouldRenderBorder}
      $height={height}
    >
      {currentNode.id !== 'root' && (
        <div
          className="item-info"
          style={{
            paddingLeft: `${(currentNode.level - 1) * 8}px`,
            cursor: 'pointer',
            backgroundColor: isAssetSelected ? '#3B5BDB' : 'transparent',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (currentNode.children && currentNode.children.length > 0) {
              setIsExpanded((prev) => !prev);
            }
            if (currentNode.asset?.sensorType) {
              setSelectedAsset(currentNode.asset);
            }
          }}
        >
          {!!currentNode.asset && !currentNode.asset.sensorType && (
            <>
              <div className="icon-wrapper">
                <AssetIcon color={iconColor} />
              </div>
              <div className="icon-wrapper">
                <StatusIndicator
                  status={currentNode.asset.status}
                  type={currentNode.asset.sensorType}
                />
              </div>
            </>
          )}
          {!!currentNode.asset && !!currentNode.asset.sensorType && (
            <>
              <div className="icon-wrapper">
                <ComponentIcon color={iconColor} />
              </div>
              <div className="icon-wrapper">
                <StatusIndicator
                  status={currentNode.asset.status}
                  type={currentNode.asset.sensorType}
                />
              </div>
            </>
          )}
          {!currentNode.asset && (
            <div className="icon-wrapper">
              <LocationIcon />
            </div>
          )}
          <p
            style={{
              color: isAssetSelected ? '#fff' : '#000',
            }}
          >
            {currentNode.name}
          </p>
        </div>
      )}

      <ChildreanWrapper
        $isExpanded={isExpanded}
        $height={height}
        ref={ref}
        style={{
          height: isExpanded ? 'auto' : 0,
        }}
        $isRoot={currentNode.id === 'root'}
      >
        {currentNode.children.length > 0 && (
          <>
            {currentNode.children.map((child) => (
              <AssetTreeList
                setSelectedAsset={setSelectedAsset}
                currentNode={child}
                key={child.id}
                selectedAsset={selectedAsset}
              />
            ))}
          </>
        )}
      </ChildreanWrapper>
    </AssetTreeItemContainer>
  );
};

export default AssetTreeList;
