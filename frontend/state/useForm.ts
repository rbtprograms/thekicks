import { useState } from 'react';

interface FormProps {
  handleChange: (event: React.ChangeEvent<any>) => void, 
  values: {
    title?: string,
    price?: number,
    description?: string,
  }
}

const useForm = (initialValues): FormProps => {
  const [values, setValues] = useState(initialValues);
  
  const handleChange = event => {
    const { value, name, type } = event.target;
    const val = type === 'number' ? parseFloat(value) : value;

    event.persist();
    setValues(values => ({
      ...values,
      [name]: val
    }))
  };  

  return {
    handleChange,
    values
  }
}

export default useForm;