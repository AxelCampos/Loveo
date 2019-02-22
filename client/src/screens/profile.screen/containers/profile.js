import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import withLoading from '../../../components/withLoading';
import CREATE_CONVERSATION_MUTATION from '../../../graphql/create-conversation.mutation';
import UPDATE_USER_MUTATION from '../../../graphql/update-user.mutation';
import USER_QUERY from '../../../graphql/user.query';
import EDIT_FRIEND_MUTATION from '../../../graphql/edit-friend.mutation';
import Profile from '../components/profile';

const mapStateToProps = ({ auth }) => ({
  auth,
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
  props: ({ mutate }) => ({
    updateUser: user => mutate({
      variables: { user },

      update: (store, { data: { updateUser } }) => {
        const data = store.readQuery({
          query: USER_QUERY,
          variables: {
            id: user.id,
          },
        });
        data.user.likes = updateUser.likes;

        store.writeQuery({
          query: USER_QUERY,
          variables: {
            id: user.id,
          },
          data,
        });
      },
    }),
  }),
});
const userQuery = graphql(USER_QUERY, {
  options: ownProps => ({
    variables: {
      id: ownProps.navigation.state.params.userId,
    },
  }),
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  }),
});

const conectedUserQuery = graphql(USER_QUERY, {
  options: ownProps => ({
    variables: {
      id: ownProps.auth.id,
    },
  }),
  props: ({ data: { loading, user } }) => ({
    loading,
    conectedUser: user,
  }),
});

const editFriendMutation = graphql(EDIT_FRIEND_MUTATION, {
  props: ({ mutate, ownProps }) => ({
    editFriend: (id, userId) => mutate({
      variables: id,
      userId,
      refetchQueries: [{ query: USER_QUERY, variables: { id: ownProps.auth.id } }],
    }),
  }),
});

export default compose(
  connect(mapStateToProps),
  conectedUserQuery,
  userQuery,
  withLoading,
  createConversationMutation,
  updateUserMutation,
  editFriendMutation,
)(Profile);
