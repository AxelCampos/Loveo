import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { LIFESTYLE_QUERY } from '../graphql/lifestyle.query';
import { USER_QUERY } from '../graphql/user.query';
import withLoading from '../components/withLoading';

const Lifestyle = (props) => {
  if (!props.lifestyles) {
    return null;
  }
  const {
    lifestyles: [{
      gender, civilStatus, nation, children,
    }],
  } = props;
  return (
    <View>
      <Text>
        Genero:
        {gender}
      </Text>
      <Text>
        Estado Civil:
        {civilStatus}
      </Text>
      <Text>
        Nacionalidad:
        {nation}
      </Text>
      <Text>
        Tiene hijos:
        {children}
      </Text>
    </View>
  );
};

const lifestyleQuery = graphql(LIFESTYLE_QUERY, {
  options: () => ({ variables: { id: 1 } }),
  props: ({ data: { lifestyles } }) => ({
    lifestyles,
  }),
});

export default compose(
  lifestyleQuery,
  withLoading,
)(Lifestyle);
