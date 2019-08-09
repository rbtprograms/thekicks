import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import useSigninForm from '../state/useSigninForm';
import DisplayErrors from './DisplayErrors';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;
const Signin = () => {
  const initialValues = {
    name: '',
    password: '',
    email: '',
  };
  const { values, handleChange } = useSigninForm(initialValues);
  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      variables={values}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signin: () => void, { error, loading }: any) => (
        <Form
          method="post"
          onSubmit={(e: Event) => {
            e.preventDefault();
            signin();
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Sign in</h2>
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
            <label htmlFor="password">
              password
              <input
                type="text"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </label>

            <button type="submit">Sign In!</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default Signin;
