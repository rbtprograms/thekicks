import { useState } from 'react';

interface InitalValues {
  title?: string;
  price?: string;
  description?: string;
}

interface FormProps {
  handleChange: (event: React.ChangeEvent<any>) => void;
  handleUpload: (event: React.ChangeEvent<any>) => void;
  values: {
    title?: string;
    price?: number;
    description?: string;
    image?: string;
    largeImage?: string;
  };
}

const useForm = (initialValues: InitalValues): FormProps => {
  const [values, setValues] = useState(initialValues);

  const handleChange = event => {
    const { value, name, type } = event.target;
    const val = type === 'number' ? parseFloat(value) : value;

    event.persist();
    setValues(values => ({
      ...values,
      [name]: val,
    }));
  };

  const handleUpload = async event => {
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'the kicks');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dn9suz9dn/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();
    setValues(values => ({
      ...values,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    }));
  };

  return {
    handleChange,
    handleUpload,
    values,
  };
};

export default useForm;
