import gql from 'graphql-tag';
// get the user and all user's groups
export const USER_QUERY = gql`
  query user($id: Int) {
    user(id: $id) {
      id
      email
      username
      age
      city
      likes
      photoprofile {
        id
        url
      }
      groups {
        id
        name
      }
      friends {
        id
        username
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
