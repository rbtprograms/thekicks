import React, { ReactText } from 'react';
import SingleItem from '../components/SingleItem';

type Props = {
  query: {
    id: ReactText
  }
}

const Item = ({ query }: Props) => (
  <div>
    <SingleItem
      id={query.id}
    />
  </div>
)

export default Item;