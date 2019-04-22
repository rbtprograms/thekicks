import React, { ReactText } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';

interface RenderProps {
  data: {
    items: Array<{
      id: ReactText
      title: String
    }>
  },
  error?: any,
  loading: boolean
}

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

const Items = () => {
  return (
    <Center>
      <p>Howdy</p>
      <Query
        query={ALL_ITEMS_QUERY}
      >
        {({ data, error, loading }: RenderProps) => {
          let dom = null;
          if(loading) {
            dom = <p>Loading...</p>;
          } else if (error) {
            dom = <p>Error: {error.message}</p>;
          } else {
            dom = 
              <ItemsList>
                {data.items.map(item => (
                  <Item
                    key={item.id}
                    item={item}
                  />
                ))}
              </ItemsList>
            ;
          }
          return dom;
        }}
      </Query>
    </Center>
  );
}

export default Items;