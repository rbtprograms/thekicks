import React from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import useForm from '../state/useForm';

const CreateItem: React.FunctionComponent = () => {
  const placeHolderSubmitFunction = () => console.log(values);
  const initialValues = {
    title: ''
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
      </fieldset>>
    </Form>
  )
};

export default CreateItem;