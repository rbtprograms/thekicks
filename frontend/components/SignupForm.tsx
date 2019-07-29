import React from 'react';
import Form from './styles/Form';
import useSignupForm from '../state/useSignupForm';

const Signup = () => {
  const initialValues = {
    name: '',
    password: '',
    email: '',
  };
  const { values, handleChange } = useSignupForm(initialValues);
  return (
    <Form>
      <fieldset>
        <h2>Sign up</h2>
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
      </fieldset>
    </Form>
  );
};

export default Signup;
