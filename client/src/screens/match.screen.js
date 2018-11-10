import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
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

import { graphql, compose } from 'react-apollo';
import Swiper from 'react-native-deck-swiper';
import withLoading from '../components/withLoading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  card: {
    flex: 0.8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
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

  renderCard = card => (
    <View style={styles.card}>
      <Text style={styles.text}>{card}</Text>
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

  swipeLeft = () => {
    this.swiper.swipeLeft();
  };

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          ref={(swiper) => {
            this.swiper = swiper;
          }}
          onSwiped={this.onSwiped}
          onTapCard={this.swipeLeft}
          cards={this.state.cards}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSeparation={15}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              element: <Text>SUPER</Text>,
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                },
              },
            },
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
        >
          <Button onPress={this.swipeLeft} title="Swipe Left" />
        </Swiper>
      </View>
    );
  }
}

export default Match;
