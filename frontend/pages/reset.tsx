import React from 'react';
import Reset from '../components/Reset';

interface Props {
  query: {
    resetToken: string
  }
}

const Item: React.FunctionComponent<Props> = ({ query }) => {
  return (
    <>
      <p>Reset your password {query.resetToken}</p>
      <Reset 
        resetToken={query.resetToken}
      />
    </>
  );
};

export default Item;
