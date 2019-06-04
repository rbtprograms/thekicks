import React from 'react';
import Items from '../components/Items';

interface Props {
  query: {
    page: string
  }
}

const Home: React.FunctionComponent<Props> = ({ query }) => (
  <div>
    <Items page={parseFloat(query.page) || 1}/>
  </div>
)

export default Home;