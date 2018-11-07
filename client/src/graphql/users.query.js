import gql from 'graphql-tag';
// get all the users
export const USERS_QUERY = gql`
  query users {
    users {
      id
      email
      location
      username
      likes
      photoprofile {
        id
        url
      }
    }
  }
`;
export default USERS_QUERY;
