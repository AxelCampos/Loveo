import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '10%',
    padding: 10,
  },
});
const Header = () => (
  <View style={styles.header}>
    <Text style={{ fontFamily: 'KaushanScript-Regular', fontSize: 20 }}>¿Quíen te gusta?</Text>
  </View>
);
export default Header;
