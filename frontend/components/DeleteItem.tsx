import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

type Props = {
  id: string,
  children: any
}

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

const DeleteItem: React.FunctionComponent = ({ children, id }: Props) => {

  return (
    <Mutation 
      mutation={DELETE_ITEM_MUTATION}
      variables={{ id }}
    >
      {(deleteItem, { error }) => (
        <button onClick={() => {
          if(confirm('Are you sure?')) {
            deleteItem();
          }
        }}>{children}</button>
      )}
    </Mutation>
  )
}

export default DeleteItem;