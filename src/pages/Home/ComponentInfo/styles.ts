import styled from 'styled-components';

export const AssetInfoContainer = styled.div`
  flex: 3;
  border: 1px solid ${({ theme }) => theme.Colors.Gray._300};
  display: flex;
  flex-direction: column;
`;

export const EmptyStateContainer = styled.div`
  flex: 1;
  margin: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.Colors.Gray._300};
  > p {
    font-size: 16px;
    color: ${({ theme }) => theme.Colors.Gray._900};
    font-weight: 500;
  }
`;

export const ComponentInfoWrapper = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.Colors.Gray._300};
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

  > h1 {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.Colors.Gray._1000};
  }
`;

export const ComponentDetailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 32px;
`;

export const FirstLineContainer = styled.div`
  height: 200px;
  display: flex;
  gap: 24px;
  .image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;

    background-color: ${({ theme }) => theme.Colors.Blue._300};
    border: 1px dashed ${({ theme }) => theme.Colors.Blue._500};
    flex: 1;
    max-width: 400px;
    max-height: 400px;
    overflow: hidden;
    > input {
      display: none;
    }
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }
  .infos {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: space-evenly;
    flex: 1;

    .info-item {
      display: flex;
      flex: 1;
      padding: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.Colors.Gray._300};
    }
  }
`;

export const SecordLineContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: space-evenly;
    flex: 1;
    > div {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    h1 {
      font-size: 20px;
      font-weight: 500;
      color: ${({ theme }) => theme.Colors.Blue._600};
    }
    p {
      font-size: 16px;
      color: ${({ theme }) => theme.Colors.Gray._900};
    }
  }
`;
