import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Flatlist, StyleSheet, Text, TouchableHightlight, View,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { PHOTO_QUERY } from '../graphql/photo.query';
import withLoading from '../components/withLoading';

const styles = StyleSheet.create({
  tendencyContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  userName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
});
const ShowPhoto = ({ photo }) => (
  <View style={styles.tendencyContainer}>
    <Text style={styles.userName}>Es un test.</Text>
  </View>
);
const photoQuery = graphql(PHOTO_QUERY, {
  options: () => ({ variables: { id: 1 } }),
  props: ({ data: { photo } }) => ({
    photo,
  }),
});
export default compose(
  photoQuery,
  withLoading,
)(ShowPhoto);
