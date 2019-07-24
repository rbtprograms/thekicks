import React from 'react';
import DisplayError from './DisplayError';

interface ErrorProps {
  error: any;
}

const DisplayErrorList = ({ error }: ErrorProps) =>
  error.length ? (
    error.networkError.result.errors.map((error, i) => (
      <DisplayError key={i} message={error.message} />
    ))
  ) : (
    <DisplayError message={error.message} />
  );

export default DisplayErrorList;
