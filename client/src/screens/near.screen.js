import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Button,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import DatePicker from 'react-native-datepicker';
import { USERS_QUERY } from '../graphql/users.query';
import withLoading from '../components/withLoading';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

// TODO: convert real directions into coordinates with Geolocation

class SingleMarker extends Component {
  constructor(props) {
    super(props);
  }

  goToProfile = user => () => {
    const {
      properties: {
        navigation: { navigate },
      },
    } = this.props;
    navigate('Profile', { userId: user.id });
  };

  render() {
    const { user } = this.props;
    const aleatLat = Math.random() / 50;
    const aleatLong = Math.random() / 50;
    return (
      <Marker
        coordinate={{
          latitude: 40.4167 + aleatLat,
          longitude: -3.7037 + aleatLong,
        }}
        title={user.username}
        // description={"description"}
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
        longitude: -3.70379,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      date: '2000-01-01',
    };
  }

  getPosition = () => {
    Geocoder.geocodeAddress('28231, Spain')
      .then((res) => {
        console.log(res);
        // res is an Array of geocoding object (see below)
      })
      .catch(err => console.log(err));
  };

  render() {
    const { users } = this.props;
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={this.state.region}
        zoomEnabled
        // onPress={this.onPress}
      >
        {users.map((user, index) => (
          <SingleMarker key={index} user={user} properties={this.props} />
        ))}
      </MapView>
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
