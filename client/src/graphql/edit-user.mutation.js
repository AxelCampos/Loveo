import gql from 'graphql-tag';

const EDIT_USER_MUTATION = gql`
    mutation editUser($user: EditUserInput!){
        editUser(user:$user){
            id
            name
        }
    }
`;
export default EDIT_USER_MUTATION;