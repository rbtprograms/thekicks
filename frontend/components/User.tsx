import { ReactNode, ReactElement } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

interface Props {
  children: (payload: { data: { me: { name: string } } }) => ReactNode;
}

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
    }
  }
`;

const User = (props: Props): ReactElement => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

export default User;
export { CURRENT_USER_QUERY };
