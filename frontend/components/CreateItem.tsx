import React from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';

const CreateItem: React.FunctionComponent = () => (
  <Form>
    <h2>Sell an Item</h2>
  </Form>
);

export default CreateItem;