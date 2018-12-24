import { graphql, compose } from 'react-apollo';
import withLoading from '../../components/withLoading';
import createSearchMutation from './mutation-create-search';
import searchesQuery from './query-searches';
import userQuery from './query-user';
import usersQuery from './query-users';
import LifestyleResult from './lifestyle-result';

export default compose(
    createSearchMutation,
    searchesQuery,
    userQuery,
    usersQuery,
    withLoading,
)(LifestyleResult);