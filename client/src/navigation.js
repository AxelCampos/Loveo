import React from 'react';
import { StackActions, NavigationActions, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
const TestScreen = title => () => (
  <View style={styles.container}>
    <Text>{title}</Text>
  </View>
);
// tabs in main screen
const MainScreenNavigator = createMaterialBottomTabNavigator(
  {
    Search: {
      screen: TestScreen('Search'),
      navigationOptions: {
        tabBarIcon: () => <Icon size={20} name="ios-settings" color="red" />,
        tabBarColor: 'blue',
      },
    },
    Match: {
      screen: TestScreen('Match'),
      navigationOptions: {
        tabBarIcon: () => <Icon size={20} name="ios-settings" color="red" />,
        tabBarColor: 'pink',
      },
    },
    Chats: {
      screen: TestScreen('Chats'),
      navigationOptions: {
        tabBarIcon: () => <Icon size={20} name="ios-settings" color="red" />,
        tabBarColor: 'green',
      },
    },
    User: {
      screen: TestScreen('User'),
      navigationOptions: {
        tabBarIcon: () => <Icon size={20} name="ios-settings" color="red" />,
        tabBarColor: 'orange',
      },
    },
    Settings: {
      screen: TestScreen('Settings'),
      navigationOptions: {
        tabBarIcon: () => <Icon size={20} name="ios-settings" color="red" />,
        tabBarColor: 'violet',
      },
    },
  },
  {
    initialRouteName: 'Chats',
    activeColor: 'black',
  },
);
const AppNavigator = createStackNavigator(
  {
    Main: { screen: MainScreenNavigator },
  },
  {
    headerMode: 'none',
  },
);
// reducer initialization code
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
export const navigationReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
export const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const App = reduxifyNavigator(AppNavigator, 'root');
const mapStateToProps = state => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);
export default AppWithNavigationState;
