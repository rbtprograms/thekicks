import React, { Fragment } from 'react'
import Header from '../components/Header';
import Meta from './Meta';
import styled from 'styled-components';

const MyButton = styled.button`
  background: red;
  font-size: ${props => props.huge ? '100px' : '50px'};
  span {
    font-size: 100px;
  }
`;

const Page = props => (
  <Fragment>
    <Meta/>
    <Header />
    <MyButton>Howdy<span>partner</span></MyButton>
    <MyButton huge>Howdy<span>partner</span></MyButton>
    {props.children}
  </Fragment>
)

export default Page;