import PropTypes from 'prop-types';
import {
  StyleSheet, View, Image, Text,
} from 'react-native';
import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import USER_QUERY from '../graphql/user.query';
import withLoading from '../components/withLoading';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
  },
  userContainer: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: 'red',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  userName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
  userImage: {
    width: 412,
    height: 300,
  },
});

class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: state.params.username,
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;

    return (
      <View style={styles.userContainer}>
        <Image style={styles.userImage} source={{ uri: user.photoprofile.url }} />

        <Text style={styles.userName}>
          {user.username}
,
          {user.email}
,
          {user.id}
,
        </Text>
      </View>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
    photoprofile: PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    }),
  }),
};

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
export default compose(
  userQuery,
  withLoading,
)(Profile);
