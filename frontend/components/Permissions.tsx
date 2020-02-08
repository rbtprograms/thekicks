import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './DisplayError';

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = () => (
  <Query query={ALL_USERS_QUERY}>
    {({ error }) => (
      <div>
        <Error message={error} />
        <p>Hey</p>
      </div>
    )}
  </Query>
);

export default Permissions;
