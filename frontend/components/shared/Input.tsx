import React from 'react'
import upperCasedFirstLetter from '../../lib/upperCase';

interface Props {
  name: string,
  handleChange: (event: React.ChangeEvent<HTMLElement>) => void,
  type: string,
  value: any
}

const Input: React.FunctionComponent<Props> = ({ name, type, value, handleChange }) => {
  const upperCased = upperCasedFirstLetter(name);
  return (
  <label htmlFor={upperCased}>
    {upperCased}
    <input 
      id={name} 
      name={name} 
      onChange={handleChange}
      placeholder={upperCased} 
      required
      type={type} 
      value={value}
    />
  </label>
  );
}

export default Input;