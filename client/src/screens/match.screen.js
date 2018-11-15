import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Button,
} from 'react-native';
import { USERS_QUERY } from '../graphql/users.query';
import { graphql, compose } from 'react-apollo';
import Swiper from 'react-native-deck-swiper';
import withLoading from '../components/withLoading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  card: {
    flex: 0.8,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 370,
    height: 448,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 50,
    color: 'white',
  },
  iconsView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  icons: {
    color: 'black',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 40,
    alignItems: 'center',
    paddingStart: 9,
    paddingEnd: 0,
    width: 75,
    marginHorizontal: 20,
  },
  information: {
    position: 'absolute',
    bottom: 100,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',

  }
});

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: ['1', '2', '3'],
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0,
    };
  }

  renderCard = user => (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri:
            user.photoprofile.url,
        }}
      />
      <Text style={styles.information}>{user.username}</Text>
    </View>
  );

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true,
    });
  };

  swipeBack = () => {
    if (!this.state.isSwipingBack) {
      this.setIsSwipingBack(true, () => {
        this.swiper.swipeBack(() => {
          this.setIsSwipingBack(false);
        });
      });
    }
  };

  setIsSwipingBack = (isSwipingBack, cb) => {
    this.setState(
      {
        isSwipingBack,
      },
      cb,
    );
  };

  swipeRight = () => {
    this.swiper.swipeRight();
  };

  swipeLeft = () => {
    this.swiper.swipeLeft();
  };

  render() {
    const { users } = this.props;
    return (
      <View style={styles.container}>
        <Swiper
          ref={(swiper) => {
            this.swiper = swiper;
          }}
          verticalSwipe={false}
          backgroundColor="white"
          onSwiped={this.onSwiped}
          onTapCard={this.swipeLeft}
          cards={users}
          stackSize={3}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSeparation={15}
          overlayLabels={{
            left: {
              element: <Text style={styles.text}>NO</Text>,
              title: 'NOPE',
              style: {
                wrapper: {
                  backgroundColor: 'red',
                  height: 448,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
            },
            right: {
              element: <Text style={styles.text}>Me gusta</Text>,
              title: 'Me gusta',
              style: {
                wrapper: {
                  height: 448,
                  borderRadius: 10,
                  backgroundColor: 'green',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
            },
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
        />
        <View style={styles.iconsView}>
          <Icon.Button
            size={50}
            backgroundColor="transparent"
            style={styles.icons}
            name="close"
            onPress={this.swipeLeft}
            title="Swipe Left"
          />
          <Icon.Button
            style={styles.icons}
            backgroundColor="transparent"
            size={60}
            width={85}
            name="email-outline"
            title="Swipe Left"
          />
          <Icon.Button
            style={styles.icons}
            backgroundColor="transparent"
            size={50}
            name="cards-heart"
            onPress={this.swipeRight}
          />
        </View>
      </View>
    );
  }
}
const usersQuery = graphql(USERS_QUERY, {
  options: () => ({}),
  props: ({ data: { users } }) => ({
    users: users || [],
  }),
});

export default compose(
  usersQuery,
  withLoading,
)(Match);
