import React from 'react';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';

interface Props {
  item: {
    title: String
  }
}

const Item: React.FunctionComponent<Props> = ({ item }) => (
  <ItemStyles>
    <Title>{item.title}</Title>
  </ItemStyles>
);



export default Item;