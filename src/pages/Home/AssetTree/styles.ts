import styled from 'styled-components';

export const AssetTreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-height: 100%;
  overflow-y: scroll;
  width: 100%;
  flex: 1;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.Colors.Gray._300};
  border-radius: 4px;
`;

export const SearchInputContainer = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.Colors.Gray._300};
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  gap: 8px;
  background-color: ${({ theme }) => theme.Colors.Gray._200};
  position: sticky;
  top: 0;
  z-index: 1;
  > input {
    outline: none;
    flex: 1;
    background-color: transparent;
    border: none;
  }
  > div {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &::after {
    content: '';
    width: calc(100%);
    height: calc(100%);
    background-color: ${({ theme }) => theme.Colors.Gray._100};
    position: absolute;
    top: -32px;
    left: -16px;
    z-index: -1;
  }
`;

export const AssetTreeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  height: max-content;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex: 1;
`;
