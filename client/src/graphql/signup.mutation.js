import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(email: $email, password: $password, username: $username) {
      id
      jwt
      username
    }
  }
`;

export default SIGNUP_MUTATION;
