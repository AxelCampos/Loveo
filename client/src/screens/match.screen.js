import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
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
import { graphql, compose } from 'react-apollo';

import Swiper from 'react-native-deck-swiper';
import USERS_QUERY from '../graphql/users.query';
import USER_QUERY from '../graphql/user.query';
import UPDATE_USER_MUTATION from '../graphql/update-user.mutation';
import withLoading from '../components/withLoading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  },
});

class Match extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
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
          uri: user.photoprofile.url,
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

  swipeRight = (index) => {
    console.log('loveo');
    const { updateUser, users } = this.props;

    const user = this.props.users.sort(this.compareUsers)[index];
    console.log(user.id, 'jbfaghfragh', user.likes);
    updateUser({
      id: user.id,
      likes: user.likes + 1,
    });
  };

  swipeLeft = (index) => {
    console.log('no lo veo', this.props.users.sort(this.compareUsers)[index]);
  };

  onSwiped = (index) => {
    const { cardIndex } = this.state;
    this.setState({
      cardIndex: cardIndex + 1,
    });
    console.log(this.props.users.sort(this.compareUsers)[index]);
    console.log('swiped!!!', index);
  };

  compareUsers = (a, b) => a.id - b.id;

  render = () => {
    const { users } = this.props;
    const { swipedAllCards } = this.state;
    console.log(users, 'AAAAAAAAA');
    return (
      <View style={styles.container}>
        {!swipedAllCards && (
          <Swiper
            ref={(swiper) => {
              this.swiper = swiper;
            }}
            cardIndex={this.state.cardIndex}
            verticalSwipe={false}
            backgroundColor="white"
            onSwiped={this.onSwiped}
            onSwipedRight={this.swipeRight}
            onSwipedLeft={this.swipeLeft}
            onTapCard={this.swipeLeft}
            cards={users.sort(this.compareUsers)}
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
        )}
        {!swipedAllCards && (
          <View style={styles.iconsView}>
            <Icon.Button
              underlayColor="transparent"
              size={50}
              color="black"
              backgroundColor="transparent"
              style={styles.icons}
              name="close"
              onPress={() => this.swiper.swipeLeft()}
              title="Swipe Left"
            />
            <Icon.Button
              underlayColor="transparent"
              style={styles.icons}
              color="black"
              backgroundColor="transparent"
              size={60}
              width={85}
              name="email-outline"
              title="Swipe Left"
            />
            <Icon.Button
              underlayColor="transparent"
              style={styles.icons}
              color="black"
              backgroundColor="transparent"
              size={50}
              name="cards-heart"
              onPress={() => this.swiper.swipeRight()}
            />
          </View>
        )}
      </View>
    );
  };
}
const usersQuery = graphql(USERS_QUERY, {
  options: () => ({}),
  props: ({ data: { users } }) => ({
    users: users || [],
  }),
});

const updateUserMutation = graphql(UPDATE_USER_MUTATION, {
  props: ({ mutate }) => ({
    updateUser: (user) => {
      console.log('lirios', user);
      return mutate({
        variables: { user },

        /*update: (store, { data: { updateUser } }) => {
          const data = store.readQuery({
            query: USERS_QUERY,
            variables: {
              id: user.id,
            },
          });
          data.user.likes = updateUser.likes;
          store.writeQuery({
            query: USERS_QUERY,
            variables: {
              id: user.id,
            },
            data,
          });
        },*/
      });
    },
  }),
});

export default compose(
  updateUserMutation,
  usersQuery,
  withLoading,
)(Match);
