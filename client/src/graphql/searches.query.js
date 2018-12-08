import gql from 'graphql-tag';

export const SEARCHES_QUERY = gql`
    query searches($userId: Int){
        searches(userId: $userId){
            id
            userId
            name
            gender
            civilStatus
            children
        }
    }
`;
export default SEARCHES_QUERY;