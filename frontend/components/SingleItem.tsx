import React, { ReactText } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './DisplayErrors';
import styled from 'styled-components';
import Head from 'next/head';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

type Props = {
  id: ReactText;
};

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;
const SingleItem: React.FunctionComponent<Props> = ({ id }) => {
  return (
    <Query
      query={SINGLE_ITEM_QUERY}
      variables={{
        id,
      }}
    >
      {result => {
        const { error, loading, data } = result;
        const { item } = data;
        if (error) return <Error error={error} />;
        if (loading) return <p>Loading...</p>;
        if (!item) return <p>No item found for item id: ${id}</p>;
        return (
          <SingleItemStyles>
            <Head>
              <title>theKicks | {item.title}</title>
            </Head>
            <img src={item.largeImage} alt={item.title} />
            <div className="details">
              <h2>Viewing {item.title}</h2>
              <p>{item.description}</p>
            </div>
          </SingleItemStyles>
        );
      }}
    </Query>
  );
};

export default SingleItem;
