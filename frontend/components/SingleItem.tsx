import React, { Fragment, ReactText } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

type Props = {
  id: ReactText
}

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
    <Fragment>
      <p>one item!{id}</p>
    </Fragment>
  )
}

export default SingleItem;