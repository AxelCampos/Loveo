import { graphql, compose } from 'react-apollo';


import USER_QUERY from '../../../graphql/user.query';
import USERS_QUERY from '../../../graphql/users.query';
import CREATE_CONVERSATION_MUTATION from '../../../graphql/create-conversation.mutation';
import UPDATE_USER_MUTATION from '../../../graphql/update-user.mutation';
import EDIT_FRIEND_MUTATION from '../../../graphql/edit-friend.mutation';
import EDIT_MISCREATED_MUTATION from '../../../graphql/edit-miscreated.mutation';
import { withLoading } from '../../../components/withLoading';

import Match from '../components/match';
import { connect } from 'react-redux';

const mapStateToProps = ({ auth }) => ({
  auth,
});

const userQuery = graphql(USER_QUERY, {
  options: ownProps => ({
    variables: {
      id: ownProps.auth.id,
    },
  }),
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  }),
});

const usersQuery = graphql(USERS_QUERY, {
  options: () => ({}),
  props: ({ data: { users } }) => ({
    users: users || [],
  }),
});

const createConversationMutation = graphql(CREATE_CONVERSATION_MUTATION, {
  props: ({ mutate, ownProps }) => ({
    createConversation: group => mutate({
      variables: { group },
      refetchQueries: [{ query: USER_QUERY, variables: { id: ownProps.auth.id } }],
    }),
  }),
});

const updateUserMutation = graphql(UPDATE_USER_MUTATION, {
  props: ({ mutate, ownProps }) => ({
    updateUser: user => mutate({
      variables: { user },
      // refetchQueries: [{ query: USER_QUERY, variables: { id: ownProps.auth.id } }],
    }),
  }),
});

const editFriendMutation = graphql(EDIT_FRIEND_MUTATION, {
  props: ({ mutate, ownProps }) => ({
    editFriend: (id, userId) => mutate({
      variables: id,
      userId,
      // refetchQueries: [{ query: USER_QUERY, variables: { id: ownProps.auth.id } }],
    }),
  }),
});

const editMiscreatedMutation = graphql(EDIT_MISCREATED_MUTATION, {
  props: ({ mutate, ownProps }) => ({
    editMiscreated: (id, userId) => mutate({
      variables: id,
      userId,
      // refetchQueries: [{ query: USER_QUERY, variables: { id: ownProps.auth.id } }],
    }),
  }),
});

export default compose(
  connect(mapStateToProps),
  updateUserMutation,
  createConversationMutation,
  userQuery,
  usersQuery,
  withLoading,
  editFriendMutation,
  editMiscreatedMutation,
)(Match);
