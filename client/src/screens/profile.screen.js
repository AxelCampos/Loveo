import PropTypes from 'prop-types';
import {
  StyleSheet, View, Image, Text,
} from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { graphql, compose } from 'react-apollo';
import USER_QUERY from '../graphql/user.query';
import withLoading from '../components/withLoading';
import Menu from '../components/navigator-menu-component';

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
    fontWeight: 'bold',
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

class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: state.params.username,
    };
  };

  constructor(props) {
    super(props);
  }

  addLike = (likes) => {
    console.log(likes);
    likes++;
    console.log(likes);
  };

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
)(Profile);
