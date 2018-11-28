import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  StyleSheet,
  StatusBar,
  onButtonPress,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { graphql, compose } from 'react-apollo';
import { USER_QUERY } from '../graphql/user.query';
import CREATE_USER_MUTATION from '../graphql/create-user.mutation';

// create a component
class RegisterForm extends Component {
  render() {
    return (
      <View style={StyleSheet.container}>
        <View style={styles.textIcon}>
          <Icon size={18} style={styles.icons} name="user-circle" color="white" />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCorrect={false}
            keyBoardType="default"
            returnKeyType="next"
            placeholder="Enter your username "
            placeholderTextColor="white"
          />
        </View>

        <View style={styles.textIcon}>
          <Icon size={18} style={styles.icons} name="at" color="white" />
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCorrect={false}
            keyBoardType="email-address"
            returnKeyType="next"
            placeholder="Enter your email"
            placeholderTextColor="white"
          />
        </View>

        <View style={styles.textIcon}>
          <Icon size={18} style={styles.icons} name="lock" color="white" />
          <TextInput
            style={styles.input}
            returnKeyType="go"
            ref={input => (this.passwordInput = input)}
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.createUserMutation}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

creachione = () => {
  const { createUser } = this.props;

  createUser({
    name: user.username,
    mail: user.email,
    pass: user.password,
  })
    .then(() => {
      ToastAndroid.showWithGravity('Usuario creado!', ToastAndroid.SHORT, ToastAndroid.CENTER);
    })
    .catch((error) => {
      Alert.alert('Error Creating New User', error.message, [{ text: 'OK', onPress: () => {} }]);
    });
};

const createUserMutation = graphql(CREATE_USER_MUTATION, {
  props: ({ mutate }) => ({
    createUser: user => mutate({
      variables: { user },
      update: (store, { data: { createUser } }) => {
        const data = store.readQuery({
          query: USER_QUERY,
          variables: {
            id: user.id,
          },
        });
        data.user.username = createUser.username;
        data.user.email = createUser.email;
        data.user.password = createUser.password;
        // data.user.likes = 0;
        console.log('*****username', createUser.username);
        console.log('<<<<<<<<<<<email', createUser.email);
        console.log('>>>>>>>>>>password', createUser.password);
        store.writeQuery({
          query: USER_QUERY,
          variables: {
            id: user.id,
          },
          data,
        });
      },
    }),
  }),
});

const userQuery = graphql(USER_QUERY, {
  options: {
    variables: {
      id: 50,
    },
  },
  props: ({ data: { user } }) => ({
    user: user || null,
  }),
});

// defining styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: '#c10bb7',
    paddingVertical: 15,
    borderRadius: 40,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  input: {
    marginLeft: 10,
    color: 'white',
  },
  icons: {
    marginTop: 15,
    marginLeft: 20,
  },
  textIcon: {
    flexDirection: 'row',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 10,
  },
});
export default compose(
  userQuery,
  createUserMutation,
)(RegisterForm);
