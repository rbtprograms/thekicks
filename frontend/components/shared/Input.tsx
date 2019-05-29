import React from 'react'
import upperCasedFirstLetter from '../../lib/upperCase';

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLElement>) => void,
  placeholder?: string,
  name: string,
  type: string,
  value?: any,
  defaultValue?: string
}

const Input: React.FunctionComponent<Props> = ({ placeholder, name, type, value, handleChange, defaultValue }) => {
  const upperCased = upperCasedFirstLetter(name);
  return (
  <label htmlFor={upperCased}>
    {upperCased}
    <input
      defaultValue={defaultValue} 
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