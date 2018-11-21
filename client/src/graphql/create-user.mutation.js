import gql from 'graphql-tag';

const CREATE_USER_MUTATION = gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(username: $name, email: $email, password: $password) {
      name
      email
      password
    }
  }
`;
export default CREATE_USER_MUTATION;
