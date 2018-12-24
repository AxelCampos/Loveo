import { graphql } from 'react-apollo';
import { USERS_QUERY } from '../../graphql/users.query';

const usersQuery = graphql(USERS_QUERY, {
    options: () => ({}), // fake the user for now
    props: ({ data: { users } }) => ({
        users: users || [],
    }),
});

export default usersQuery;
