import { useState } from 'react';

interface Values {
  name?: string;
  email: string;
  password: string;
}

interface FormProps {
  handleChange: (event: React.ChangeEvent<any>) => void;
  values: Values;
}

const useSignupForm = (initialValues: Values): FormProps => {
  const [values, setValues] = useState(initialValues);

  const handleChange = event => {
    const { value, name } = event.target;

    event.persist();
    setValues(values => ({
      ...values,
      [name]: value,
    }));
  };


  return {
    handleChange,
    values,
  };
};

export default useSignupForm;
