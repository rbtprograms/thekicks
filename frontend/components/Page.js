import React from 'react'
import Header from '../components/Header';
import Meta from './Meta';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgreay: '#E1E1E1',
  offwhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

//used to control how wide the app gets
const InnerPage = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const Page = props => (
  <ThemeProvider theme={theme}>
    <StyledPage>
      <Meta/>
      <Header />
      <InnerPage>{props.children}</InnerPage>
    </StyledPage>
  </ThemeProvider>
)

export default Page;