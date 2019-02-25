import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { USER_QUERY } from '../../../graphql/user.query';
import withLoading from '../../../components/withLoading';
import Profile from '../../profile.screen/components/profile';
import CREATE_PHOTO_MUTATION from '../../../graphql/create-photo.mutation';

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
    loggedUser: true,
  }),
});
const createPhoto = graphql(CREATE_PHOTO_MUTATION, {
  props: ({ mutate, ownProps }) => ({
    createPhoto: photo => mutate({
      variables: photo,
      refetchQueries: [{ query: USER_QUERY, variables: { id: ownProps.auth.id } }],
    }),
  }),
});

export default compose(
  connect(mapStateToProps),
  createPhoto,
  userQuery,
  withLoading,
)(Profile);
