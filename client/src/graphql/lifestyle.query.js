import gql from 'graphql-tag';

export const LIFESTYLE_QUERY = gql`
    query lifestyles($id: Int){
        lifestyles(id: $id){
            id
        }
    }
`;
export default LIFESTYLE_QUERY;