import PropTypes from 'prop-types';
import {
  View, Image, Text, Alert, ScrollView, FlatList, TouchableHighlight,
} from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackActions, NavigationActions } from 'react-navigation';
import styles from './styles';

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
    this.state = {
      enableScrollViewScroll: true,
      switcher: false,
    };
    this.create = this.create.bind(this);
    this.addLike = this.addLike.bind(this);
  }

  keyExtractor = item => item.id.toString();

  renderItem = ({ item }) => (
    <TouchableHighlight onPress={() => this.setState({ img: item })} key={item.id} underlayColor="transparent">
      <View style={styles.photoContainer}>
        <Image
          source={{ uri: item.url }}
          style={styles.albumImage}
        />
      </View>
    </TouchableHighlight>
  );

  addLike() {
    const { updateUser, user, editFriend } = this.props;
    this.setState({
      switcher: true,
    });

    updateUser({
      id: user.id,
      likes: user.likes + 1,
    });

    editFriend({
      id: 1,
      userId: user.id,
    })
      .catch((error) => {
        Alert.alert('Error Creating New Friend', error.message, [{ text: 'OK', onPress: () => { } }]);
      });
  }

  create() {
    const {
      createConversation,
      navigation,
      user: { username, id, photoprofile },
    } = this.props;

    createConversation({
      name: username,
      userIds: id,
      userId: 1,
      photo: photoprofile.url,
    })
      .then((res) => {
        navigation.dispatch(goToNewGroup(res.data.createConversation));
      })
      .catch((error) => {
        Alert.alert('Error Creating New Group', error.message, [{ text: 'OK', onPress: () => { } }]);
      });
  }


  render() {
    const { user } = this.props;
    const { switcher, enableScrollViewScroll, img = user.photoprofile } = this.state;

    return (
      <View
        style={styles.container}
        onStartShouldSetResponderCapture={() => {
          this.setState({ enableScrollViewScroll: true });
        }}
      >
        <ScrollView
          scrollEnabled={enableScrollViewScroll}
          ref={(myScroll) => { this.myScroll = myScroll; }}
        >
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>
              {user.username}
            </Text>
            <View style={styles.icons}>
              {switcher === false ? (
                <Icon.Button
                  underlayColor="transparent"
                  style={styles.iconStyle}
                  color="#F0625A"
                  backgroundColor="white"
                  size={30}
                  borderRadius={30}
                  name="cards-heart"
                  onPress={this.addLike}
                />
              )
                : (
                  <Icon.Button
                    underlayColor="transparent"
                    style={styles.iconStyle}
                    color="grey"
                    backgroundColor="white"
                    size={30}
                    borderRadius={30}
                    name="cards-heart"
                  />
                )}

              <Icon.Button
                underlayColor="transparent"
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
          <View style={styles.containerImage}>
            <Image style={styles.userImage} source={{ uri: img.url }} />
          </View>
          <FlatList
            styles={styles.album}
            data={user.album}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            ListEmptyComponent={<View />}
            horizontal
          />
          <View style={styles.userInformacion}>
            <View style={styles.conexionStyle}>
              <Icon size={11.5} name="home-circle" />
              <Text style={[styles.locationUser, styles.textStyle]}>{user.city}</Text>
            </View>
            <View style={styles.conexionStyle}>
              <Icon size={10} name="circle" color="green" />
              <Text style={styles.textStyle}>Ultima conexión: 13h</Text>
            </View>
            <Text>Aquí iría una descripcion o lo que cohone queráis</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

Profile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  editFriend: PropTypes.func.isRequired,
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

export default Profile;
