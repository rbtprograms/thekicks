import React, { ReactElement } from 'react';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import gql from 'graphql-tag';
import useSignupForm from '../state/useSignupForm';
import DisplayErrors from './DisplayErrors';
import CURRENT_USER_QUERY from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;
const Signup = (): ReactElement => {
  const initialValues = {
    name: '',
    password: '',
    email: '',
  };
  const { values, handleChange } = useSignupForm(initialValues);
  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      variables={values}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signup: () => void, { error, loading }: any) => (
        <Form
          method="post"
          onSubmit={(e: Event) => {
            e.preventDefault();
            signup();
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Sign up</h2>
            {error && <DisplayErrors error={error} />}
            <label htmlFor="email">
              email
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="name">
              name
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              password
              <input
                type="text"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </label>

            <button type="submit">Sign Up!</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default Signup;
