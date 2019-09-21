import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import useResetPasswordForm from '../state/useResetPasswordForm';
import DisplayErrors from './DisplayErrors';

interface Props {
  resetToken: string
}

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;
const Reset: React.FunctionComponent<Props> = ({ resetToken }) => {
  const initialValues = {
    password: '',
    confirmPassword: '',
  };
  const { values, handleChange } = useResetPasswordForm(initialValues);
  return (
    <Mutation
      mutation={RESET_MUTATION}
      variables={{
        ...values,
        resetToken
      }}
    >
      {(reset: () => void, { error, loading }: any) => (
        <Form
          method="post"
          onSubmit={async (e: Event) => {
            e.preventDefault();
            await reset();
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Reset your password</h2>
            {error && <DisplayErrors error={error} />}
            <label htmlFor="password">
              Password
              <input
                type="text"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="confirmPassword">
              Confirm Your Password
              <input
                type="text"
                name="confirmPassword"
                value={values.confirmPassword}
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

export default Reset;
