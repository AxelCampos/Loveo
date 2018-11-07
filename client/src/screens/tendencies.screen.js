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
    backgroundColor: 'white',
    alignItems: 'center',
  },
  tendencyContainer: {
    flex: 1,
    width: 160,
    height: 180,
    alignItems: 'center',
    backgroundColor: '#F3E7E4',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    margin: 10,
  },

  userName: {
    alignContent: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,

    color: 'blue',
  },
  userImage: {
    width: 150,
    height: 135,
    borderRadius: 10,
  },
});
const Tendency = ({
  users: {
    id, location, username, photoprofile, likes,
  },
  goToProfiles,
  expandImage,
}) => (
  <TouchableHighlight key={id} onPress={goToProfiles} underlayColor="transparent">
    <View style={styles.tendencyContainer}>
      <Image style={styles.userImage} source={{ uri: photoprofile.url }} onPress={expandImage} />

      <Text style={styles.userName}>{username}</Text>
      <Text>{location}</Text>
      <Text>{likes}</Text>
    </View>
  </TouchableHighlight>
);
Tendency.propTypes = {
  goToProfiles: PropTypes.func.isRequired,
  users: PropTypes.shape({
    id: PropTypes.number,
    location: PropTypes.string,
    username: PropTypes.string,
    likes: PropTypes.number,
    photoprofile: PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    }),
  }),
};

class Tendencies extends Component {
  /* static navigationOptions = {
    title: '',
  }; */

  keyExtractor = item => item.id.toString();

  goToProfiles = user => () => {
    const {
      navigation: { navigate },
    } = this.props;
    navigate('Profile', { userId: user.id });
  };

  expandImage = user => () => {
    <View>
      <Image source={{ uri: user.photoprofile }} />
    </View>;
  };

  renderItem = ({ item }) => <Tendency users={item} goToProfiles={this.goToProfiles(item)} />;

  compare = (a, b) => b.likes - a.likes;

  render() {
    const { users } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={users.sort(this.compare).slice()}
          numColumns={2}
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
      location: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      photoprofile: PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
      }),
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
