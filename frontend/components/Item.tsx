import React, { ReactText } from 'react';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';

interface Props {
  item: {
    id: ReactText;
    title: any;
    price: number;
    description: String;
    image: string;
  };
}

const Item: React.FunctionComponent<Props> = ({ item }) => (
  <ItemStyles>
    {item.image ? <img src={item.image} alt={item.title} /> : null}
    <Title>
      <Link
        href={{
          pathname: '/item',
          query: { id: item.id },
        }}
      >
        {item.title}
      </Link>
    </Title>
    <PriceTag>{formatMoney(item.price)}</PriceTag>
    <p>{item.description}</p>
    <div className="buttonList">
      <Link
        href={{
          pathname: 'update',
          query: { id: item.id },
        }}
      >
        <a>Edit</a>
      </Link>
      <button>Add to cart</button>
      <DeleteItem id={item.id} text={'Delete'} />
    </div>
  </ItemStyles>
);

export default Item;
