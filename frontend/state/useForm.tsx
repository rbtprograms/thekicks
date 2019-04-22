import { useState, SyntheticEvent } from 'react';

interface FormProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void, 
  handleSubmit: (event: SyntheticEvent) => void 
  values: {
    title?: string,
    price?: number,
    description?: string,
  }
}

const useForm = (initialValues, callback): FormProps => {
  const [values, setValues] = useState(initialValues);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    callback();
  };
  
  const handleChange = event => {
    const { value, name, type } = event.target;
    const val = type === 'number' ? parseFloat(value) : value;

    event.persist();
    setValues(values => ({
      ...values,
      [name]: val
    }))
    callback();
  };

  return {
    handleChange,
    handleSubmit,
    values
  }
}

export default useForm;