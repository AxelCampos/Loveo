import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Text, View, Image, ScrollView,
} from 'react-native';
import styles from './styles';
import CurrentUserIcons from './currentUserIcons';

class User extends Component {
  static navigationOptions = () => ({
    title: 'Profile',
  });

  constructor(props) {
    super(props);
    this.state = { image: undefined, enableScrollViewScroll: true };
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

  render() {
    const { user = {} } = this.props;
    const { enableScrollViewScroll, image } = this.state;
    return (
      <View style={styles.container}>
        <CurrentUserIcons
          settings={this.goTosettings}
          setImage={img => this.setState({ image: img })}
        />
        <View
          onStartShouldSetResponderCapture={() => {
            this.setState({ enableScrollViewScroll: true });
          }}
        >
          <ScrollView
            scrollEnabled={enableScrollViewScroll}
            ref={(scroll) => { this.myScroll = scroll; }}
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
