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
    ScrollView,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { StackActions, NavigationActions } from 'react-navigation';
import { USER_QUERY } from '../graphql/user.query';
import EDIT_USER_MUTATION from '../graphql/edit-user.mutation';

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    formContainer: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    input: {
        marginBottom: 15,
        marginTop: 0,
        marginLeft: 15,
        marginRight: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    },
    label: {
        marginBottom: 0,
        marginTop: 0,
        marginLeft: 15,
        marginRight: 15,
        height: 40,
        padding: 10,
        backgroundColor: 'lightblue',
        color: '#7a42f4',
    }
});
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: 'blablabla',
            newName: 'desconocido',
        };
    }
    update = () => {
        const { editUser, user } = this.props;
        const { newName } = this.state;
        console.log('aqui', user.id);
        editUser({
            id: user.id,
            username: newName,
            email: user.email,
            age: user.age,
            gender: user.gender,
            civilStatus: user.civilStatus,
            children: user.children,
            city: user.city,
            country: user.country,
            likes: user.likes,
        });
        alert('Usuário actualizado.');
    }
    render() {
        const { user: { username } } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.label}>Nombre de Usuário: {username}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newName) => this.setState({ newName })}
                    //value={this.state.newName}
                    />
                    <TouchableOpacity style={styles.submitButton}
                        onPress={this.update}
                    >
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}
const editUserMutation = graphql(EDIT_USER_MUTATION, {
    props: ({ mutate }) => ({
        editUser: user => mutate({
            variables: { user },
            update: (store, { data: { editUser } }) => {
                const data = store.readQuery({
                    query: USER_QUERY,
                    variables: {
                        id: user.id,
                    },
                });
                data.user.username = editUser.username;
                console.log('<<<<<', data.user.username);
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
    options: (ownProps) => ({
        variables: {
            id: ownProps.navigation.state.params.userId,
        },
    }),
    props: ({ data: { user } }) => ({
        user: user || null,
    }),
});
export default compose(
    userQuery,
    editUserMutation,
)(EditProfile);