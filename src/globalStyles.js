import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto';
  }
`;

export const PageWrapper = styled.div`
  padding: 15px 20px;
`;


export const LogoWrapper = styled.div`
    text-align: center;
`;

export const TopLink = styled.div`
    text-align: right;
`;
