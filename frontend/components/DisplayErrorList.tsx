import React from 'react';
import DisplayError from './DisplayError';

type ErrorProps = {
  error: {
    networkError?: {
      result: {
        errors: [Error]
      }
    }
  }
}

const DisplayErrorList = (props: ErrorProps) => {
  return props.error.networkError.result.errors.map((error, i) => (
    <DisplayError 
      key={i}
      message={error.message}
    >
    </DisplayError>
  ));
}

export default DisplayErrorList;