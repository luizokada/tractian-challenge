import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 16px;
  background: ${({ theme }) => theme.Colors.Blue._1000};
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
`;

export const CompanieSelectionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CompanieOption = styled.button<{ $isSelected: boolean }>`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px 16px;
  outline: none;
  border: none;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.Colors.Blue._700 : theme.Colors.Blue._900};
  border-radius: 4px;
  p {
    color: #fff;
  }
`;
