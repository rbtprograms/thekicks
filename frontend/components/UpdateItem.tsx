import React from 'react'
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router'
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import useForm from '../state/useForm';
import Input from './shared/Input';
import DisplayErrors from './DisplayErrors';

const SINGLE_ITEM_QUERY = gql`
query SINGLE_ITEM_QUERY($id: ID!) {
  item(where: { id: $id}) {
    id
    title
    description
    price
  }
}`

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

interface Props {
  id: string  
}

const UpdateItem: React.FunctionComponent<Props> = ({ id }) => {
  const initialValues = {}
  const { values, handleChange } = useForm(initialValues);
  return (
    <Query 
      query={SINGLE_ITEM_QUERY} variables={{ id: id }}>
        {({ data, loading }) => {
          const { item: queriedItem } = data;
          if(loading) return <p>Loading...</p>
          return (
            <Mutation
              mutation={UPDATE_ITEM_MUTATION}
              variables={values}
            >
              {(createItem: () => any, {loading, error}: any) => (
                <Form
                  onSubmit={async (e: { preventDefault: () => void; }) => {
                    e.preventDefault();
                    const res = await createItem();
                    console.log(res);
                    Router.push({
                      pathname: '/item',
                      query: { id: res.data.createItem.id }
                    })
                  }}
                >
                  {error &&
                    <DisplayErrors
                      error={error}
                    />
                  }
                  <fieldset disabled={loading} aria-busy={loading}>
                    <Input
                      name='title'
                      handleChange={handleChange}
                      type='text'
                      defaultValue={queriedItem.title}
                      value={values.title}
                      />
                    <Input
                      name='price'
                      handleChange={handleChange}
                      type='number'
                      defaultValue={queriedItem.price}
                      value={values.price}
                      />
                    <label htmlFor='description'>
                      Description
                      <textarea 
                        id='description' 
                        name='description' 
                        onChange={handleChange}
                        placeholder='Enter a Description'
                        required
                        defaultValue={queriedItem.description}
                        value={values.description}
                        />
                    </label>
                    <button type='submit'>Submit</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
    </Query>
  )
};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION }