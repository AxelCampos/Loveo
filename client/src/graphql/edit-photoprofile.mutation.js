import gql from 'graphql-tag';

const EDIT_PHOTOPROFILE_MUTATION = gql`
  mutation editPhoto($photo: PhotoInput!) {
    editPhoto(photo: $photo) {
      id
    }
  }
`;

export default EDIT_PHOTOPROFILE_MUTATION;
