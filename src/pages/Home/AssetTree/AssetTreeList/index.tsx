import React, { useContext, useEffect, useMemo } from 'react';
import StatusIndicator from '../../../../commom/StatusIndicator';
import { CompanieContext } from '../../../../context/Companie';
import { useCollapse } from '../../../../hooks/useCollapse';
import AssetIcon from '../../../../icons/AssetIcon';
import ComponentIcon from '../../../../icons/ComponentIcon';
import LocationIcon from '../../../../icons/LocationIcon';
import { Tree } from '../../../../utils/Tree';
import {
  AssetTreeItemContainer,
  ChevronIconWrapper,
  ChildreanWrapper,
  ExpandButton,
} from './styles';
import ChevronIcon from '../../../../icons/ChevronIcon';
import { FilterType } from '../../../../types/filter';

interface AssetTreeListProps {
  currentNode: Tree;
  renderRight: number;
  activeFilter: FilterType;
}

const AssetTreeList: React.FC<AssetTreeListProps> = ({
  currentNode,
  renderRight,
  activeFilter,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const { ref, height } = useCollapse(isExpanded, [currentNode]);
  const [remainRenderRight, setRenderRight] = React.useState(renderRight);
  const [renderedChilds, setRenderedChilds] = React.useState<string[]>([]);
  const { selectedAsset, setSelectedAsset } = useContext(CompanieContext);

  useEffect(() => {
    return () => {
      setRenderedChilds([]);
    };
  }, [activeFilter]);

  const shouldRenderBorder = useMemo(() => {
    return (
      currentNode.childrean &&
      currentNode.childrean.length > 0 &&
      currentNode.id !== 'root'
    );
  }, [currentNode]);

  const isAssetSelected = useMemo(() => {
    return selectedAsset?.id === currentNode.id;
  }, [selectedAsset, currentNode.asset]);

  const iconColor = useMemo(() => {
    return isAssetSelected ? '#fff' : undefined;
  }, [isAssetSelected]);

  const childsToRender = useMemo(() => {
    if (!currentNode.childrean) {
      return [];
    }
    let remainRenderRightVar = remainRenderRight;

    const nodesToRender = [];
    let currentIndex = 0;

    while (
      remainRenderRightVar > 0 &&
      currentIndex < currentNode.childrean?.length
    ) {
      const child = currentNode.childrean[currentIndex];

      if (remainRenderRightVar > 0) {
        nodesToRender.push(
          <AssetTreeList
            currentNode={child}
            key={child.id}
            activeFilter={activeFilter}
            renderRight={
              remainRenderRightVar - Tree.calcTreeSize(child) > 0
                ? remainRenderRightVar - Tree.calcTreeSize(child)
                : 100
            }
          />,
        );
        if (!renderedChilds.includes(child.id)) {
          remainRenderRightVar =
            remainRenderRightVar - Tree.calcTreeSize(child);
        }
        setRenderedChilds((prev) => {
          if (prev.includes(child.id)) {
            return prev;
          }
          return [...prev, child.id];
        });
      }
      currentIndex += 1;
    }

    return nodesToRender;
  }, [currentNode, remainRenderRight]);

  const shoulRenderMoreButton = useMemo(() => {
    return childsToRender.length < currentNode.childrean?.length;
  }, [remainRenderRight, childsToRender]);

  return (
    <AssetTreeItemContainer
      $shouldREnderBorder={shouldRenderBorder}
      style={{
        marginLeft: `${currentNode.level * 8}px`,
      }}
    >
      {currentNode.id !== 'root' && (
        <div
          className="item-info"
          style={{
            cursor: 'pointer',
            backgroundColor: isAssetSelected ? '#3B5BDB' : 'transparent',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (currentNode.childrean && currentNode.childrean.length > 0) {
              setIsExpanded((prev) => !prev);
            }
            if (currentNode.asset?.sensorType) {
              setSelectedAsset(currentNode.asset);
            }
          }}
        >
          {currentNode?.childrean && currentNode?.childrean.length > 0 && (
            <ChevronIconWrapper
              $isExpanded={isExpanded}
              className="chevron-icon"
            >
              <ChevronIcon />
            </ChevronIconWrapper>
          )}
          {!!currentNode.asset && !currentNode.asset.sensorType && (
            <>
              <div className="icon-wrapper">
                <AssetIcon color={iconColor} />
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
        {childsToRender.length > 0 && <>{childsToRender}</>}
        {shoulRenderMoreButton && (
          <ExpandButton
            style={{
              marginLeft: `${currentNode.level * 8}px`,
            }}
            onClick={() => {
              setRenderRight((prev) => prev + 1000);
            }}
          >
            <ChevronIcon />
            <p>Expandir</p>
          </ExpandButton>
        )}
      </ChildreanWrapper>
    </AssetTreeItemContainer>
  );
};

export default React.memo(AssetTreeList);
