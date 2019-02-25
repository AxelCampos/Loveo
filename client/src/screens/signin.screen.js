import React, { Component } from 'react';
import R from 'ramda';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { setCurrentUser } from '../actions/auth.actions';
import LOGIN_MUTATION from '../graphql/login.mutation';
import SIGNUP_MUTATION from '../graphql/signup.mutation';
import CREATE_PHOTO_MUTATION from '../graphql/create-photo.mutation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderRadius: 4,
    marginVertical: 13,
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  loadingContainer: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  switchAction: {
    paddingHorizontal: 4,
    color: 'blue',
  },
  submit: {
    marginVertical: 6,
  },
  image: {
    width: '100%',
    height: '130%',
    position: 'absolute',
    top: -190,
  },
});

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

class Signin extends Component {
  static navigationOptions = {
    title: 'Loveo',
    headerLeft: null,
  };

  constructor(props) {
    super(props);

    if (props.auth && props.auth.jwt) {
      props.navigation.goBack();
    }

    this.state = {
      signup: false,
      view: 'login',
      username: 'Axel',
      email: 'kk@kk.es',
      password: '123',
    };
  }

  componentDidMount() {
    const {
      auth: { jwt },
      navigation: { navigate },
    } = this.props;
    if (jwt) navigate('Main');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.jwt) {
      nextProps.navigation.goBack();
    }
  }

  login = () => {
    const { email, password, view } = this.state;
    const { login, dispatch } = this.props;

    this.setState({
      loading: true,
    });

    login({ email, password })
      .then(({ data: { login: user } }) => {
        dispatch(setCurrentUser(user));
        this.setState({
          loading: false,
        });
        dispatch(
          NavigationActions.navigate({
            routeName: 'Main',
          }),
        );
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
        Alert.alert(`${capitalizeFirstLetter(view)} error`, error.message, [
          { text: 'OK', onPress: () => console.log('OK pressed') }, // eslint-disable-line no-console
          {
            text: 'Forgot',
            onPress: () => console.log('Forgot Pressed'),
            style: 'cancel',
          }, // eslint-disable-line no-console
        ]);
      });
  };

  signup = () => {
    const { view } = this.state;
    const { signup, dispatch, createPhoto } = this.props;
    this.setState({
      loading: true,
    });
    const { username, email, password } = this.state;
    signup({ username, email, password })
      .then(({ data: { signup: user } }) => {
        dispatch(setCurrentUser(user));
        this.setState({
          loading: false,
        });
        createPhoto({
          photo: {
            userId: user.id,
            url: 'http://blogs.grupojoly.com/la-sastreria/files/Manolo-Garc%C3%ADa.jpg',
          },
        });
      })
      .then(this.setState({ view: 'login', signup: true }))
      .catch((error) => {
        this.setState({
          loading: false,
        });
        Alert.alert(
          `${capitalizeFirstLetter(view)} error`,
          error.message,
          [{ text: 'OK', onPress: () => console.log('OK pressed') }], // eslint-disable-line no-console
        );
      });
  };

  switchView = () => {
    const { view } = this.state;
    this.setState({
      view: view === 'signup' ? 'login' : 'signup',
    });
  };

  render() {
    const {
      view, loading, signup, username, email, password,
    } = this.state;
    const jwt = R.path(['auth', 'jwt'], this.props);

    return (
      <KeyboardAvoidingView style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          undefined
        )}

        {view === 'login' ? (
          <View style={styles.inputContainer}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://pbs.twimg.com/profile_images/786502800763187201/ac8dsrMa_400x400.jpg',
              }}
            />
            <TextInput
              defaultValue="kk@kk.es"
              onChangeText={email => this.setState({ email })}
              placeholder="Email"
              style={styles.input}
            />
            {signup === false ? (
              <TextInput
                defaultValue="123"
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                secureTextEntry
                style={styles.input}
              />
            ) : (
              <TextInput
                onChangeText={password => this.setState({ password })}
                placeholder="Password"
                secureTextEntry
                style={styles.input}
              />
            )}
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              defaultValue="Axel"
              onChangeText={username => this.setState({ username })}
              placeholder="Username"
              style={styles.input}
            />
            <TextInput
              defaultValue="kk@kk.es"
              onChangeText={email => this.setState({ email })}
              placeholder="Email"
              style={styles.input}
            />
            <TextInput
              defaultValue="123"
              onChangeText={password => this.setState({ password })}
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />
          </View>
        )}
        {username.trim() === '' || email.trim() === '' || password.trim() === '' ? (
          <Button
            onPress={this[view]}
            style={styles.submit}
            title={view === 'signup' ? 'Sign up' : 'Login'}
            disabled
            color="rgba(255, 27, 151, 0.5)"
          />
        ) : (
          <Button
            onPress={this[view]}
            style={styles.submit}
            title={view === 'signup' ? 'Sign up' : 'Login'}
            disabled={loading}
            color="rgba(255, 27, 151, 0.5)"
          />
        )}

        <View style={styles.switchContainer}>
          <Text>{view === 'signup' ? 'Already have an account?' : 'Still have no account?'}</Text>
          <TouchableOpacity onPress={this.switchView}>
            <Text style={styles.switchAction}>{view === 'login' ? 'Sign up' : 'Login'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
Signin.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  auth: PropTypes.shape({
    loading: PropTypes.bool,
    jwt: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
};

const login = graphql(LOGIN_MUTATION, {
  props: ({ mutate }) => ({
    login: ({ email, password }) => mutate({
      variables: { email, password },
    }),
  }),
});

const signup = graphql(SIGNUP_MUTATION, {
  props: ({ mutate }) => ({
    signup: ({ username, email, password }) => mutate({
      variables: { username, email, password },
    }),
  }),
});

const createPhoto = graphql(CREATE_PHOTO_MUTATION, {
  props: ({ mutate }) => ({
    createPhoto: photo => mutate({
      variables: photo,
    }),
  }),
});

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default compose(
  login,
  signup,
  connect(mapStateToProps),
  createPhoto,
)(Signin);
