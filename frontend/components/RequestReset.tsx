import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import useSigninForm from '../state/useSigninForm';
import DisplayErrors from './DisplayErrors';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;
const RequestReset = () => {
  const initialValues = {
    email: '',
  };
  const { values, handleChange } = useSigninForm(initialValues);
  return (
    <Mutation
      mutation={REQUEST_RESET_MUTATION}
      variables={values}
    >
      {(reset: () => void, { error, loading, called }: any) => (
        <Form
          method="post"
          onSubmit={(e: Event) => {
            e.preventDefault();
            reset();
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Request password reset</h2>
            {error && <DisplayErrors error={error} />}
            {!error && !loading && called && <p>success! check your email</p>}
            <label htmlFor="email">
              email
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Reset Password</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
};

export default RequestReset;
