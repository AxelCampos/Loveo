import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

const SectionItem = ({ title }) => <Text style={{ color: 'blue' }} />;
SectionItem.propTypes = {
  title: PropTypes.string,
};
export default SectionItem;
