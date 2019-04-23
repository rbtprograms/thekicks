import React from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import upperCasedFirstLetter from '../lib/upperCase';
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
        <ItemInput
          name='title'
          handleChange={handleChange}
          value={values.title}
          />
        <ItemInput
          name='price'
          handleChange={handleChange}
          value={values.price}
          />
        <ItemInput
          name='description'
          handleChange={handleChange}
          value={values.description}
        />
      </fieldset>
    </Form>
  )
};

export default CreateItem;

const ItemInput = props => {
  const upperCased = upperCasedFirstLetter(props.name);
  return (
  <label htmlFor={upperCased}>
    {upperCased}
    <input 
      id={props.name} 
      name={props.name} 
      onChange={props.handleChange}
      placeholder={upperCased} 
      required
      type={props.type} 
      value={props.value}
    />
  </label>
  );
}