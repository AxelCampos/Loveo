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

const Tendency = ({ user: { id, username } }) => (
  <TouchableHighlight key={id}>
    <View>
      <Text>{username}</Text>
    </View>
  </TouchableHighlight>
);
Tendency.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
  }),
};
class Tendencies extends Component {
  /* static navigationOptions = {
    title: '',
  }; */

  keyExtractor = item => item.id.toString();

  renderItem = ({ item }) => <Tendency user={item} />;

  render() {
    const { user } = this.props;
    return (
      <View>
        <FlatList data={user} keyExtractor={this.keyExtractor} renderItem={this.renderItem} />
      </View>
    );
  }
}
Tendencies.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    album: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    ),
  }),
};
const userQuery = graphql(USER_QUERY, {
  options: () => ({ variables: { id: 1 } }), // fake the user for now
  props: ({ data: { user } }) => ({
    user,
  }),
});
export default userQuery(Tendencies);
