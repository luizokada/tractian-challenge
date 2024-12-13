import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  margin: 16px;
  padding: 16px;
  background-color: ${({ theme }) => theme.Colors.Gray._100};
  flex: 1;
  border-radius: 8px;
  width: calc(100% - 32px);
  height: 100%;
  flex-direction: column;
  overflow: hidden;
`;

export const HomeCompanieFilterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

export const CompanieInfo = styled.div`
  display: flex;
  align-items: center;
  height: max-content;
  justify-content: center;
  > h1 {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.Colors.Gray._1000};

    span {
      font-size: 24px;
      font-weight: 400;
      color: ${({ theme }) => theme.Colors.Gray._900};
    }
  }
`;

export const AssetInfosWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
  overflow: hidden;
  max-height: 100%;
`;
export const AssetTreeFilterController = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AssetTreeFilterButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  border-radius: 4px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.Colors.Blue._700 : theme.Colors.Gray._100};
  border: ${({ theme, $isActive }) =>
    $isActive
      ? `1px solid ${theme.Colors.Blue._700}`
      : `1px solid ${theme.Colors.Blue._700}`};
  outline: none;
  cursor: pointer;
  p {
    color: ${({ theme, $isActive }) =>
      $isActive ? theme.Colors.Gray._100 : theme.Colors.Gray._1000};
    font-weight: ${({ $isActive }) => ($isActive ? 500 : 400)};
    font-size: 14px;
  }
`;
