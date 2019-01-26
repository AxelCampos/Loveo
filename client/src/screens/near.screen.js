import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { graphql, compose } from 'react-apollo';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { USERS_QUERY } from '../graphql/users.query';
import withLoading from '../components/withLoading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: 550,
    width: 400,
  }
});

//TODO: convert real directions into coordinates with Geolocation

class SingleMarker extends Component {
  constructor(props) {
    super(props);
  }

  goToProfile = (user) => () => {
    const { properties: { navigation: { navigate } } } = this.props;
    navigate('Profile', { userId: user.id });
  };

  render() {
    const { user } = this.props
    const aleatLat = Math.random() / 50;
    const aleatLong = Math.random() / 50;
    return (
      <Marker
        coordinate={{
          latitude: 40.416700 + aleatLat,
          longitude: -3.703700 + aleatLong,
        }}
        title={user.username}
        //description={"description"}
        onPress={this.goToProfile(user)}
      />
    );
  }
}

class Nearer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 40.416775,
        longitude: -3.703790,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onPress = () => {
    const { users } = this.props;
    //console.log(this.state.markers);
    return users.filter(a => (a.id !== a.id));
  };

  render() {
    const { users } = this.props;
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.state.region}
          zoomEnabled={true}
          onPress={this.onPress}
        >
          {users.map((user, index) => (
            <SingleMarker key={index} user={user} properties={this.props} />
          ))
          }
        </MapView>
      </View>
    );
  }
}

const usersQuery = graphql(USERS_QUERY, {
  options: () => ({}), // fake the user for now
  props: ({ data: { users } }) => ({
    users: users || [],
  }),
});

export default compose(
  usersQuery,
  withLoading,
)(Nearer);