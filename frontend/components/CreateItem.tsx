import React from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import useForm from '../state/useForm';

const CreateItem: React.FunctionComponent = () => {
  const placeHolderSubmitFunction = () => console.log(values);
  const initialValues = {
    title: '',
    price: '',
    description: ''

  }
  const { values, handleChange, handleSubmit } = useForm(initialValues, placeHolderSubmitFunction);
  return (
    <Form>
      <fieldset>
        <label htmlFor='Title'>
          Title
          <input 
            id="title" 
            name="title" 
            onChange={handleChange}
            placeholder="Title" 
            required
            type="text" 
            value={values.title}
          />
        </label>
        <label htmlFor='Price'>
          Price
          <input 
            id="price" 
            name="price" 
            onChange={handleChange}
            placeholder="Price" 
            required
            type="number" 
            value={values.price}
          />
        </label>
        <label htmlFor='Description'>
          Description
          <input 
            id="description" 
            name="description" 
            onChange={handleChange}
            placeholder="Description" 
            required
            type="text" 
            value={values.description}
          />
        </label>
      </fieldset>
    </Form>
  )
};

export default CreateItem;