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

import { graphql, compose } from 'react-apollo';

import { USERS_QUERY } from '../graphql/users.query';
import withLoading from '../components/withLoading';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    alignItems: 'center',
    flexDirection: 'column',
  },
  tendencyContainer: {
    flexDirection: 'column',
    width: 120,
    height: 120,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 5,
  },
  userName: {
    fontSize: 15,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 10,
    color: 'blue',
  },
  userImage: {
    width: 100,
    height: 100,
  },
});
const Tendency = ({ users: { id, username, photoprofile } }) => (
  <TouchableHighlight key={id}>
    <View style={styles.tendencyContainer}>
      <Image style={styles.userImage} source={{ uri: photoprofile }} />
      <Text style={styles.userName}>{username}</Text>
    </View>
  </TouchableHighlight>
);
Tendency.propTypes = {
  users: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    photoprofile: PropTypes.string,
  }),
};
class Tendencies extends Component {
  /* static navigationOptions = {
    title: '',
  }; */

  keyExtractor = item => item.id.toString();

  renderItem = ({ item }) => <Tendency users={item} />;

  render() {
    const { users } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={users.slice().reverse()}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
Tendencies.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      photoprofile: PropTypes.string.isRequired,
    }),
  ),
};
const usersQuery = graphql(USERS_QUERY, {
  options: () => ({}), // fake the user for now
  props: ({ data: { users } }) => ({
    users: users || [],
  }),
});

export default compose(
  usersQuery,
  withLoading,
)(Tendencies);
