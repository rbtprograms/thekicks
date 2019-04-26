import React from 'react'
import upperCasedFirstLetter from '../../lib/upperCase';

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLElement>) => void,
  placeholder?: string,
  name: string,
  type: string,
  value?: any
}

const Input: React.FunctionComponent<Props> = ({ placeholder, name, type, value, handleChange }) => {
  const upperCased = upperCasedFirstLetter(name);
  return (
  <label htmlFor={upperCased}>
    {upperCased}
    <input 
      id={name} 
      name={name} 
      onChange={handleChange}
      placeholder={placeholder || upperCased} 
      required
      type={type} 
      value={value}
    />
  </label>
  );
}

export default Input;