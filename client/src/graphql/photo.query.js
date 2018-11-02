import gql from 'graphql-tag';
// get photos
export const PHOTO_QUERY = gql`
  query photo($id: Int) {
    photo(id: $id) {
      id
      name
      from {
        username
      }
      to {
        name
      }
      comment
    }
  }
`;
export default PHOTO_QUERY;
