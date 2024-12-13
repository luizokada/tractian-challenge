import styled, { css } from 'styled-components';

export const ChildreanWrapper = styled.div<{
  $height: number;
  $isExpanded: boolean;
  $isRoot: boolean;
}>`
  ${({ $isRoot }) =>
    !$isRoot &&
    css`
      overflow: hidden;
    `}
`;

export const ChevronIconWrapper = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${({ $isExpanded }) =>
    !$isExpanded &&
    css`
      transform: rotate(180deg);
    `}
  transition: transform 0.3s;
`;

export const AssetTreeItemContainer = styled.div<{
  $shouldREnderBorder: boolean;
}>`
  position: relative;
  height: max-content;

  ${({ $shouldREnderBorder }) =>
    $shouldREnderBorder &&
    css`
      & > ::after {
        position: absolute;
        content: '';
        width: 1px;
        height: calc(100% - 32px);
        background-color: ${({ theme }) => theme.Colors.Gray._500};
        left: 5px;
        top: 22px;
      }
    `}

  .item-info {
    margin-bottom: 8px;
    min-height: max-content;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .icon-warpper {
    min-width: 22px;
    min-height: 22px;
  }
`;

export const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  border: none;
  margin-bottom: 8px;
  p {
    font-size: 14px;
    color: ${({ theme }) => theme.Colors.Blue._500};
    font-weight: 400;
  }
`;
