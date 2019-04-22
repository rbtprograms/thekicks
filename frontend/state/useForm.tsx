import { useState, SyntheticEvent } from 'react';

interface FormProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void, 
  handleSubmit: (event: SyntheticEvent) => void 
  values: {
    title?: string,
  }
}

const useForm = (callback): FormProps => {
  const [values, setValues] = useState({});

  const handleSubmit = event => {
    if (event) event.preventDefault();
    callback();
  };

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }))
  };

  return {
    handleChange,
    handleSubmit,
    values
  }
}

export default useForm;