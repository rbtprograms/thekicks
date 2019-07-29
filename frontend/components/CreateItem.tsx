import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
// import formatMoney from '../lib/formatMoney';
import useItemForm from '../state/useItemForm';
import Input from './shared/Input';
import DisplayErrors from './DisplayErrors';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
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

const CreateItem: React.FunctionComponent = () => {
  const initialValues = {
    title: '',
    price: 0,
    description: '',
  };
  const { values, handleChange, handleUpload } = useItemForm(initialValues);
  return (
    <Mutation mutation={CREATE_ITEM_MUTATION} variables={values}>
      {(createItem: () => any, { loading, error }: any) => (
        <Form
          onSubmit={async (e: { preventDefault: () => void }) => {
            e.preventDefault();
            const res = await createItem();
            Router.push(`/item?id=${res.data.createItem.id}`);
          }}
        >
          {error && <DisplayErrors error={error} />}
          <fieldset disabled={loading} aria-busy={loading}>
            <Input
              name="image"
              handleChange={handleUpload}
              placeholder={'Choose an image to upload...'}
              type="file"
            />
            {values.image ? (
              <img alt="Uploaded Image" src={values.image} width="200" />
            ) : null}
            <Input
              name="title"
              handleChange={handleChange}
              type="text"
              value={values.title}
            />
            <Input
              name="price"
              handleChange={handleChange}
              type="number"
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
                value={values.description}
              />
            </label>
            <button type="submit">Submit</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default CreateItem;
export { CREATE_ITEM_MUTATION };
