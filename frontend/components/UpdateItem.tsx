import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
// import Router from 'next/router';
import Form from './styles/Form';
// import formatMoney from '../lib/formatMoney';
import useItemForm from '../state/useItemForm';
import Input from './shared/Input';
import DisplayErrors from './DisplayErrors';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

interface Props {
  id: string;
}

const UpdateItem: React.FunctionComponent<Props> = ({ id }) => {
  const initialValues = {};
  const { values, handleChange } = useItemForm(initialValues);
  const handleUpdateItem = async (e, mutation) => {
    e.preventDefault();
    await mutation({
      variables: {
        id: id,
        ...values,
      },
    });
  };
  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id: id }}>
      {({ data, loading }) => {
        const { item: queriedItem } = data;
        if (loading) return <p>Loading...</p>;
        if (!data.item) return <p>{`No item found for id ${id}`}</p>;
        return (
          <Mutation mutation={UPDATE_ITEM_MUTATION} variables={values}>
            {(updateItem: () => any, { loading, error }: any) => (
              <Form onSubmit={e => handleUpdateItem(e, updateItem)}>
                {error && <DisplayErrors error={error} />}
                <fieldset disabled={loading} aria-busy={loading}>
                  <Input
                    name="title"
                    handleChange={handleChange}
                    type="text"
                    defaultValue={queriedItem.title}
                    value={values.title}
                  />
                  <Input
                    name="price"
                    handleChange={handleChange}
                    type="number"
                    defaultValue={queriedItem.price}
                    value={values.price}
                  />
                  <label htmlFor="description">
                    Description
                    <textarea
                      id="description"
                      name="description"
                      onChange={handleChange}
                      placeholder="Enter a Description"
                      required
                      defaultValue={queriedItem.description}
                      value={values.description}
                    />
                  </label>
                  <button type="submit">Submit</button>
                </fieldset>
              </Form>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
