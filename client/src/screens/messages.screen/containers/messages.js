import R from 'ramda';
import { graphql, compose } from 'react-apollo';
import GROUP_QUERY from '../../../graphql/group.query';
import CREATE_MESSAGE_MUTATION from '../../../graphql/create-message.mutation';
import { withLoading } from '../../../components/withLoading';
import Messages from '../components/messages';

const ITEMS_PER_PAGE = 10;

const groupQuery = graphql(GROUP_QUERY, {
  options: ownProps => ({
    variables: {
      groupId: ownProps.navigation.state.params.groupId,
      messageConnection: {
        first: ITEMS_PER_PAGE,
      },
    },
  }),
  props: ({ data: { fetchMore, loading, group } }) => ({
    loading,
    group,
    loadMoreEntries() {
      return fetchMore({
        // query: ... (you can specify a different query.
        // GROUP_QUERY is used by default)
        variables: {
          messageConnection: {
            first: ITEMS_PER_PAGE,
            after: group.messages.edges[group.messages.edges.length - 1].cursor,
          },
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // we will make an extra call to check if no more entries
          if (!fetchMoreResult) {
            return previousResult;
          }

          const edgesLens = R.lensPath(['group', 'messages', 'edges']);
          const pageInfoLens = R.lensPath(['group', 'messages', 'pageInfo']);

          const moreEdges = R.view(edgesLens, fetchMoreResult);

          // push results (older messages) to end of messages list
          return R.compose(
            R.set(pageInfoLens, R.view(pageInfoLens, fetchMoreResult)),
            R.over(edgesLens, xs => R.concat(xs, moreEdges)),
          )(previousResult);
        },
      });
    },
  }),
});

const createMessageMutation = graphql(CREATE_MESSAGE_MUTATION, {
  props: ({ mutate }) => ({
    createMessage: message => mutate({
      variables: { message },
      optimisticResponse: {
        __typename: 'Mutation',
        createMessage: {
          __typename: 'Message',
          id: -1,
          text: message.text,
          createdAt: new Date().toISOString(),
          from: {
            __typename: 'User',
            id: 1,
            username: 'Liza43',
          },
          to: {
            __typename: 'Group',
            id: message.groupId,
          },
        },
      },
      update: (store, { data: { createMessage } }) => {
        // Read the data from our cache for this query
        const groupData = store.readQuery({
          query: GROUP_QUERY,
          variables: {
            groupId: message.groupId,
          },
        });
        // Add our message from the mutation to the end
        groupData.group.messages.unshift(createMessage);
        // Write our data back to the cache.
        store.writeQuery({
          query: GROUP_QUERY,
          variables: {
            groupId: message.groupId,
          },
          data: groupData,
        });
      },
    }),
  }),
});
export default compose(
  groupQuery,
  createMessageMutation,
  withLoading,
)(Messages);
