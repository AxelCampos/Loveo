import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet, Text, View, Image, Button
} from 'react-native';

import { graphql, compose } from 'react-apollo';

import { USER_QUERY } from '../graphql/user.query';
import withLoading from '../components/withLoading';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  photo: {
    flex: 0.7,

  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 0.7,
  },
  userText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 0.7,
    color: 'black',
  },
  userImage: {
    flex: 1,
  },
  icons: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 20,
  },
  text: {
    marginLeft: 10,
    marginTop: 5,

  },
});

const EditUser = ({ onPress }) => (
  <View>
    <Button title="Edit User" onPress={onPress} />
  </View>
);
EditUser.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const User = ({
  user: {
    likes, username, age, photoprofile, city,
  },
  navigation: { navigate },
  goToSettings = () => {
    navigate('Settings');
  },
}) => (
    <View style={styles.container}>
      <View style={styles.photo}>
        <Image style={styles.userImage} source={{ uri: photoprofile.url }} />
      </View>
      <EditUser onPress={goToSettings} />
      <View style={styles.icons}>
        <Text style={styles.userText}>
          {username} ({age})
        </Text>
      </View>

      <View style={styles.icons}>
        <Icon size={28} name="city" color="black"></Icon>
        <View style={styles.text}>
          <Text style={styles.userName}>
            {city}
          </Text>
        </View>
      </View>
      <View style={styles.icons}>
        <Icon size={28} name="heart" color="red"></Icon>
        <View style={styles.text}>
          <Text style={styles.userName}>
            {likes}
          </Text>
        </View>
      </View>
      <View style={styles.icons}>
        <Text style={styles.userName}>
          Description: {city}
        </Text>
      </View>
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
