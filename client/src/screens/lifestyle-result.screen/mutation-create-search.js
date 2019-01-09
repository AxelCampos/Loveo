import { graphql } from 'react-apollo';
import SEARCHES_QUERY from '../../graphql/searches.query';
import CREATE_SEARCH_MUTATION from '../../graphql/create-search.mutation';

const createSearchMutation = graphql(CREATE_SEARCH_MUTATION, {
  props: ({ mutate }) => ({
    createSearch: search => mutate({
      variables: { search },
      refetchQueries: [{ query: SEARCHES_QUERY }]
      /* ,
  update: (store, { data: { searchGroup } }) => {
    // Read the data from our cache for this query.
    const data = store.readQuery({ query: USER_QUERY, variables: { id: group.userId } });
    // Add our message from the mutation to the end.
    data.user.groups.push(createGroup);
    // Write our data back to the cache.
    store.writeQuery({
      query: USER_QUERY,
      variables: { id: group.userId },
      data,
    });
  }, */
    }),
  }),
});

export default createSearchMutation;
