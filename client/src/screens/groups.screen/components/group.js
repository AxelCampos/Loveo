import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet, Text, TouchableHighlight, View,
} from 'react-native';

import CheckedImage from '../../../components/checked-image';

const styles = StyleSheet.create({
  groupContainer: {
    width: 100,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 50,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginHorizontal: 10,
    marginTop: 10,
  },
  groupName: {
    color: 'white',
    borderRadius: 10,
    marginHorizontal: 0.6,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    fontWeight: 'bold',
    flex: 0.7,
    textAlign: 'center',
    marginTop: -10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

const Group = ({ goToMessages, group: { id, name, photo } }) => (
  <TouchableHighlight key={id} onPress={goToMessages}>
    <View>
      <View style={styles.groupContainer}>
        <CheckedImage style={styles.image} url={photo} />
      </View>
      <Text style={styles.groupName}>{name}</Text>
    </View>
  </TouchableHighlight>
);

Group.propTypes = {
  goToMessages: PropTypes.func.isRequired,
  group: PropTypes.shape({
    photo: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};
export default Group;
