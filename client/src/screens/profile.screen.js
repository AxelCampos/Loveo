import PropTypes from 'prop-types';
import {
  StyleSheet, View, Image, Text,
} from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { graphql, compose } from 'react-apollo';
import USER_QUERY from '../graphql/user.query';
import withLoading from '../components/withLoading';

const styles = StyleSheet.create({
  userContainer: {
    backgroundColor: 'white',
  },
  userInformacion: {
    alignItems: 'flex-start',
    height: 120,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userImage: {
    width: 412,
    height: 300,
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
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    position: 'absolute',
    top: 30,
    right: 40,
  },
  iconStyle: {
    alignItems: 'center',
    paddingStart: 9,
    paddingEnd: 0,
    width: 50,
    borderWidth: 0.7,
    marginHorizontal: 5,
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

  render() {
    const { user } = this.props;

    return (
      <View style={styles.userContainer}>
        <Image style={styles.userImage} source={{ uri: user.photoprofile.url }} />
        <View style={styles.userInformacion}>
          <Text style={styles.userName}>
            {user.username}
            {' ('}
            {user.age}
            {')'}
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
