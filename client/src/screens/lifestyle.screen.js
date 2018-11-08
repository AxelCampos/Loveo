import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { LIFESTYLE_QUERY } from '../graphql/lifestyle.query';
import { USER_QUERY } from '../graphql/user.query';
import withLoading from '../components/withLoading';

const Lifestyle = ({ lifestyle: { id, gender, civilStatus, nation, children } }) => (
    <View>
        <Text>
            {id}
        </Text>
        <Text>
            {gender}
        </Text>
        <Text>
            {civilStatus}
        </Text>
        <Text>
            {nation}
        </Text>
        <Text>
            {children}
        </Text>
    </View>
);

const lifestyleQuery = graphql(USER_QUERY, {
    options: () => ({ variables: { id: 1 } }),
    props: ({ data: { user: { lifestyle } } }) => ({
        lifestyle,
    }),
});

export default compose(
    lifestyleQuery,
    withLoading,
)(Lifestyle);