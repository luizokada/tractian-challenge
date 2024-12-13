import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`

  to {
    transform: rotate(360deg);
  }
`;

export const LoaderContainer = styled.div<{
  size: number;
}>`
  .loader {
    width: ${({ size }) => `${size}`}px;
    height: ${({ size }) => `${size}`}px;
    border-radius: 50%;
    border: ${({ size }) => `${0.1 * size}px`} solid
      ${({ theme }) => theme.Colors.Gray._100};
    border-top-color: ${({ theme }) => theme.Colors.Blue._700};
    animation: ${loadingAnimation} 1s linear infinite;
  }
`;
