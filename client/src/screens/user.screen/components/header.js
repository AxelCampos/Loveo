import PropTypes from 'prop-types';
import React from 'react';
import { View, Button } from 'react-native';
import styles from './styles';

const Header = ({ onPress }) => (
  <View style={styles.header}>
    <Button title="Edit Profile" onPress={onPress} />
  </View>
);
Header.propTypes = {
  onPress: PropTypes.func.isRequired,
};
export default Header;
