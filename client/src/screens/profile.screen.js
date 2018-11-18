import PropTypes from 'prop-types';
import {
  StyleSheet, View, Image, Text, Alert,
} from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { graphql, compose } from 'react-apollo';
import { StackActions, NavigationActions } from 'react-navigation';
import USER_QUERY from '../graphql/user.query';
import withLoading from '../components/withLoading';
import Menu from '../components/navigator-menu-component';
import CREATE_CONVERSATION_MUTATION from '../graphql/create-conversation.mutation';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  containerImage: {
    flex: 0.5,
  },
  userImage: {
    flex: 1,
  },
  userInformacion: {
    alignItems: 'flex-start',
    flex: 0.2,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  userName: {
    fontSize: 20,
    color: 'black',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 30,
  },
  iconStyle: {
    alignItems: 'center',
    paddingStart: 9,
    paddingEnd: 0,
    width: 50,
    borderWidth: 0.7,
    marginHorizontal: 5,
  },
  locationUser: {
    marginTop: 10,
    marginBottom: 10,
  },
  conexionStyle: {
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    marginHorizontal: 5,
  },
  menu: {
    flex: 0.3,
    backgroundColor: 'red',
  },
});
const goToNewGroup = group => StackActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Main' }),
    NavigationActions.navigate({
      routeName: 'Messages',
      params: { groupId: group.id, title: group.name },
    }),
  ],
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
    this.create = this.create.bind(this);
  }

  addLike = (likes) => {
    console.log(likes);
    likes++;
    console.log(likes);
  };

  create() {
    const {
      createConversation,
      navigation,
      user: { username, id },
    } = this.props;

    createConversation({
      name: username,
      userIds: id,
      userId: 1,
    })
      .then((res) => {
        navigation.dispatch(goToNewGroup(res.data.createConversation));
      })
      .catch((error) => {
        Alert.alert('Error Creating New Group', error.message, [{ text: 'OK', onPress: () => {} }]);
      });
  }

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.containerImage}>
          <Image style={styles.userImage} source={{ uri: user.photoprofile.url }} />
        </View>
        <View style={styles.userInformacion}>
          <Text style={styles.userName}>
            {user.username}
            {' ('}
            {user.age}
            {')'}
            {user.likes}
          </Text>
          <View style={styles.conexionStyle}>
            <Icon size={11.5} name="home-circle" />
            <Text style={[styles.locationUser, styles.textStyle]}>{user.city}</Text>
          </View>
          <View style={styles.conexionStyle}>
            <Icon size={10} name="circle" color="green" />
            <Text style={styles.textStyle}>Ultima conexión: 13h</Text>
          </View>
          <View style={styles.icons}>
            <Icon.Button
              style={styles.iconStyle}
              color="#F0625A"
              backgroundColor="white"
              size={30}
              borderRadius={30}
              name="cards-heart"
              onPress={this.addLike(user.likes)}
            />
            <Icon.Button
              style={styles.iconStyle}
              color="black"
              backgroundColor="white"
              size={30}
              borderRadius={30}
              name="email-outline"
              onPress={this.create}
            />
          </View>
        </View>
        <View style={styles.menu}>
          <Menu />
        </View>
      </View>
    );
  }
}

Profile.propTypes = {
  createConversation: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }),
  user: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.number,
    email: PropTypes.string,
    city: PropTypes.string,
    age: PropTypes.number,
    likes: PropTypes.number,
    photoprofile: PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    }),
  }),
};
const createConversationMutation = graphql(CREATE_CONVERSATION_MUTATION, {
  props: ({ mutate }) => ({
    createConversation: group => mutate({
      variables: { group },
      update: (store, { data: { createConversation } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: USER_QUERY, variables: { id: group.userId } });
        // Add our message from the mutation to the end.
        data.user.groups.push(createConversation);
        // Write our data back to the cache.
        store.writeQuery({
          query: USER_QUERY,
          variables: { id: group.userId },
          data,
        });
      },
    }),
  }),
});
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
  createConversationMutation,
)(Profile);
