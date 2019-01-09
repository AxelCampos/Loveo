import { graphql } from 'react-apollo';
import SEARCHES_QUERY from '../../graphql/searches.query';

const searchesQuery = graphql(SEARCHES_QUERY, {
  options: () => ({}),
  /* options: (ownProps) => ({
      variables: {
          id: ownProps.navigation.state.params.userId,
      },
  }), */
  props: ({ data: { searches } }) => ({
    searches: searches || [],
  }),
});

export default searchesQuery;
