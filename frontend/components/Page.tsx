import React from 'react'
import styled from 'styled-components';
import Header from './Header';
import Meta from './Meta';

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

const Page = ({ children }) => (
  <StyledPage>
    <Meta/>
    <Header />
    <InnerPage>{children}</InnerPage>
  </StyledPage>
)

export default Page;