import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Text, View, Image, ScrollView,
} from 'react-native';

import Menu from '../../../components/navigator-menu-component';
import styles from './styles';
import Header from './header';

class User extends Component {
  static navigationOptions = () => ({
    title: 'Profile',
  });

  constructor(props) {
    super(props);
    this.state = { enableScrollViewScroll: true };
  }

  goTosettings = () => {
    const {
      navigation: { navigate },
      user,
    } = this.props;
    navigate('EditProfile', {
      userId: user.id,
    });
  };

  renderMenu() {
    return (
      <View
        onStartShouldSetResponderCapture={() => {
          this.setState({ enableScrollViewScroll: false });
          if (this._myScroll.contentOffset === 0 && this.state.enableScrollViewScroll === false) {
            this.setState({ enableScrollViewScroll: true });
          }
        }}
        style={styles.menu}
      >
        <Menu />
      </View>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <Header onPress={this.goTosettings} />
        <View
          onStartShouldSetResponderCapture={() => {
            this.setState({ enableScrollViewScroll: true });
          }}
        >
          <ScrollView
            scrollEnabled={this.state.enableScrollViewScroll}
            ref={myScroll => (this._myScroll = myScroll)}
          >
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
            </View>
            {this.renderMenu()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

User.propTypes = {
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
export default User;
