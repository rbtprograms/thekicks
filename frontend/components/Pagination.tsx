import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

interface Props {
  page: number;
}

const Pagination: React.FunctionComponent<Props> = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      const { count } = data.itemsConnection.aggregate;
      const pages = Math.ceil(count / perPage);
      const { page } = props;
      if (error) return <p>Error!</p>;
      if (loading) return <p>Loading...</p>;
      return (
        <PaginationStyles>
          <Head>
            <title>
              theKicks {page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              pathname: 'items',
              query: { page: page - 1 },
            }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              Prev
            </a>
          </Link>
          <p>
            Page {page} of {pages}
          </p>
          <p>{count} Items Total</p>
          <Link
            prefetch
            href={{
              pathname: 'items',
              query: { page: page + 1 },
            }}
          >
            <a className="prev" aria-disabled={page >= pages}>
              Next
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
