import React from 'react'
import Header from '../components/Header';
import Meta from './Meta';
import styled from 'styled-components';

const StyledPage = styled.div`
  background: white;
  color: black;
`;

//used to control how wide the app gets
const InnerPage = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Page = props => (
  <StyledPage>
    <Meta/>
    <Header />
    <InnerPage>{props.children}</InnerPage>
  </StyledPage>
)

export default Page;