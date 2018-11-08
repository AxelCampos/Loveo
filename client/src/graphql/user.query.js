import gql from 'graphql-tag';
// get the user and all user's groups
export const USER_QUERY = gql`
  query user($id: Int) {
    user(id: $id) {
      id
      email
      username
      photoprofile {
        id
        url
      }
      groups {
        id
        name
      }
      lifestyle {
        id
        gender
        civilStatus
        nation
        children
      }
    }
  }
`;
export default USER_QUERY;
