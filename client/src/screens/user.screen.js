import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';

import { graphql } from 'react-apollo';

import { USER_QUERY } from '../graphql/user.query';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
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

const User = ({ user: { id, username, email } }) => (
  <View style={styles.userContainer}>
    <Image
      style={styles.userImage}
      source={{
        uri:
          'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1160x650/public/media/image/2018/08/fotos-perfil-whatsapp_16.jpg?itok=0b5SU9Z9',
      }}
    />

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
