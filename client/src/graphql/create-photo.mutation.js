import gql from 'graphql-tag';

const CREATE_PHOTO_MUTATION = gql`
  mutation createPhoto($photo: CreatePhotoInput) {
    createPhoto(photo: $photo) {
      url
    }
  }
`;
export default CREATE_PHOTO_MUTATION;
