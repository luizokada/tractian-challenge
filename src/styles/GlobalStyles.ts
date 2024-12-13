import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    box-sizing: border-box;
  }


  main{
    display: flex;
    max-width: 100%;
    min-height: 100vh;
    min-width: 100vw;
    overflow: hidden;
    max-height: 100vh;
    align-items: center;
    flex-direction: column;
    background-color: ${({ theme }) => theme.Colors.Gray._500};


  }

  body{
    margin: 0;
  }


  button{
    cursor: pointer;
  }


  a{
    color: ${({ theme }) => theme.Colors.Gray._600}
  }

  a:visited{
    color: ${({ theme }) => theme.Colors.Gray._1000}
  }

  

  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #a3a3a3;
    border: 4px solid transparent;
    border-radius: 8px;
    background-clip: content-box;
  }
`;
