import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { graphql } from 'react-apollo';

import { USER_QUERY } from '../graphql/user.query';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  userName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
});

const User = ({ user: { id, username, email } }) => (
  <View style={styles.userContainer}>
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
  }),
};

const userQuery = graphql(USER_QUERY, {
  options: () => ({ variables: { id: 1 } }),
  props: ({ data: { user } }) => ({
    user,
  }),
});

export default userQuery(User);
