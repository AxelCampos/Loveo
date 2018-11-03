import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';

import { graphql, compose } from 'react-apollo';

import { USER_QUERY } from '../graphql/user.query';
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
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  userName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
  userImage: {
    width: 200,
    height: 200,
  },
});

const User = ({
  user: {
    id, username, email, photoprofile,
  },
}) => (
  <View style={styles.userContainer}>
    <Image style={styles.userImage} source={{ uri: photoprofile.url }} />

    <Text style={styles.userName}>
      {username}
,
      {email}
,
      {id}
    </Text>
  </View>
);

User.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    photoprofile: PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    }),
  }),
};

const userQuery = graphql(USER_QUERY, {
  options: () => ({ variables: { id: 1 } }),
  props: ({ data: { user } }) => ({
    user,
  }),
});

export default compose(
  userQuery,
  withLoading,
)(User);
