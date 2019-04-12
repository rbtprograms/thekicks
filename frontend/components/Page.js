import React, { Fragment } from 'react'
import Header from '../components/Header';
import Meta from './Meta';

const Page = props => (
    <Fragment>
      <Meta/>
      <Header />
      {props.children}
    </Fragment>
)

export default Page;