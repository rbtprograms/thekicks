import React, { Fragment } from 'react';
import Items from '../components/Items';

interface Props {
  query: {
    page: string
  }
}

const Home: React.FunctionComponent<Props> = ({ query }) => (
  <Fragment>
    <Items page={parseFloat(query.page) || 1}/>
  </Fragment>
)

export default Home;