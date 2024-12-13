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

export const AssetTreeItemContainer = styled.div<{
  $shouldREnderBorder: boolean;
  $height: number;
}>`
  position: relative;
  height: max-content;

  ${({ $shouldREnderBorder, $height }) =>
    $shouldREnderBorder &&
    css`
      & > ::after {
        position: absolute;
        content: '';
        width: 1px;
        height: ${$height - 10}px;
        background-color: ${({ theme }) => theme.Colors.Gray._500};
        left: 0;
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
