import React, { ReactText } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

type Props = {
  id: ReactText;
  text: string;
};

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteItem: React.FunctionComponent<Props> = ({ text, id }) => {
  const update = (cache, payload) => {
    //manually update client cache to match server
    //1. read cache for items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    //2. filter out deleted item
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    // 3. Put items back in cache
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  return (
    <Mutation
      mutation={DELETE_ITEM_MUTATION}
      variables={{ id }}
      update={update}
    >
      {(deleteItem: () => void, _) => (
        <button
          onClick={() => {
            if (confirm('Are you sure?')) {
              deleteItem();
            }
          }}
        >
          {text}
        </button>
      )}
    </Mutation>
  );
};

export default DeleteItem;
