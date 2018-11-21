import R from 'ramda';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { StackActions, NavigationActions } from 'react-navigation';
import { USER_QUERY } from '../graphql/user.query';
import { UPDATE_USER_MUTATION } from '../graphql/update-user.mutation';

const EditProfile = () => (
    <View>
        <Text>Edit Test A</Text>
    </View>
);

/*class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
    }
    update() {
        const { updateUser } = this.props;
        const { name } = this.state;
        updateUser({
            id: 1,
            name,
        })
    }
    render() {
        return (
            <View>
                <Text>Nombre de Usuário: {name}</Text>
                <TextInput onChangeText={name => this.updateUser({ name })} placeholder='nuevo nombre' />
            </View>
        )
    }
}
 const updateUserMutation = graphql(UPDATE_USER_MUTATION, {
    props: ({ mutate }) => ({
        updateUser: user => mutate({
            variables: { user },
            update: (store, { data: { updateUser } }) => {
                const data = store.readQuery({ query: USER_QUERY, variables: { id: user.id } });
                //data.user.setState(updateUser);
                store.writeQuery({
                    query: USER_QUERY,
                    variables: { id: user.id },
                    data,
                });
            },
        }),
    }),
});
const userQuery = graphql(USER_QUERY, {
    options: ownProps => ({
        variables: {
            id: ownProps.navigation.state.params.userId,
        },
    }),
    props: ({ data: { loading, user } }) => ({
        loading,
        user,
    }),
});
export default compose(
    userQuery,
    updateUserMutation,
)(EditProfile); */

export default EditProfile;