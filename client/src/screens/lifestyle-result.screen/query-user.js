import { graphql } from 'react-apollo';
import { USER_QUERY } from '../../graphql/user.query';

const userQuery = graphql(USER_QUERY, {
    options: ownProps => ({
        variables: {
            id: 1,
        },
    }),
    props: ({ data: { loading, user } }) => ({
        loading,
        user,
    }),
});

export default userQuery;
