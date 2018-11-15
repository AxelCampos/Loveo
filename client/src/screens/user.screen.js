import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet, Text, View, Image,
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
    fontSize: 22,
    fontWeight: 'bold',
    flex: 0.7,
  },
  userImage: {
    flex: 1,
  },
  icons: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 20,
    //borderWidth: 1,
  },
  text: {
    marginLeft: 10,
    marginTop: 3,
  },
});

const User = ({
  user: {
    likes, username, age, photoprofile, city,
  },
}) => (
    <View style={styles.container}>
      <View style={styles.photo}>
        <Image style={styles.userImage} source={{ uri: photoprofile.url }} />
      </View>
      <View style={styles.icons}>
        <Icon size={40} name="check-circle" color="lightblue"></Icon>
        <View style={styles.text}>
          <Text style={styles.userText}>
            {username}, {age}
          </Text>
        </View>
      </View>
      <View style={styles.icons}>
        <Icon size={26} name="city" color="black"></Icon>
        <View style={styles.text}>
          <Text style={styles.userName}>
            {city}
          </Text>
        </View>
      </View>
      <View style={styles.icons}>
        <Icon size={26} name="heart" color="red"></Icon>
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
