import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StackActions,
  NavigationActions,
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import { graphql } from 'react-apollo';

import { USER_QUERY } from '../graphql/user.query';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
const TestScreen = title => () => (
  <View style={styles.container}>
    <Text>{title}</Text>
  </View>
);

const SearchScreenNavigator = createMaterialTopTabNavigator(
  {
    Search: {
      screen: TestScreen('Search'),
    },
    Match: {
      screen: TestScreen('Match'),
    },

    User: {
      screen: TestScreen('User'),
    },
    Settings: {
      screen: TestScreen('Settings'),
    },
  },
  {
    initialRouteName: 'Search',
    activeColor: 'black',
  },
);
const AppNavigator = createStackNavigator({
  Main: { screen: SearchScreenNavigator },
});
class Search extends Component {
  static navigationOptions = {
    title: 'Search',
  };

  render() {
    return (
      <View>
        <AppWithNavigationState />
      </View>
    );
  }
}
const initialState = AppNavigator.router.getStateForAction(
  StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'Main',
      }),
    ],
  }),
);
const navigationReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const navigationMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);
const App = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = state => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);
export default Search;
