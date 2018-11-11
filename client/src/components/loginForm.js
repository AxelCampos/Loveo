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

// create a component
class LoginForm extends Component {
  render() {
    return (
      <View style={StyleSheet.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          keyBoardType="email-address"
          returnKeyType="next"
          placeholder="Enter your email or username"
          placeholderTextColor="green"
        />
        <TextInput
          style={styles.input}
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
          placeholder="Password"
          placeholderTextColor="green"
          secureTextEntry
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={onButtonPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// defining styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'blue',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});
export default LoginForm;
