/*import R from 'ramda';
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

const EditInput = (text, baseData, state, stateData) => {

    const dataName = (newName) => this.setState({ newName: newName });
    //console.log(stateData);
    return (
        <View>
            <Text style={styles.label}>`{text}: {baseData}`</Text>
            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                placeholder='nuevo nombre'
                onChangeText={dataName}
            //value={username}
            />
        </View>
    );
}
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newName: 'desconocido',
            newCountry: 'no informado',
            newCity: 'no informado',
            newEmail: 'no informado',
            newAge: 10,
            newGender: 'no informado',
            newCivilStatus: 'no informado',
            newChildren: 'no informado',
        };
        this.state.text = {
            newName: 'Nombre',
            newCountry: 'País',
            newCity: 'Ciudad',
            newEmail: 'Correo Electrónico',
            newAge: 'Edad',
            newGender: 'Genero',
            newCivilStatus: 'Estado Civil',
            newChildren: 'hijos',
        };
        this.state.value = {
            newName: 'desconocido',
            newCountry: 'no informado',
            newCity: 'no informado',
            newEmail: 'no informado',
            newAge: 10,
            newGender: 'no informado',
            newCivilStatus: 'no informado',
            newChildren: 'no informado',
        };
    }
    update = () => {
        const { editUser, user } = this.props;
        const { newName, newCountry, newCity, newEmail, newAge, newGender, newCivilStatus, newChildren } = this.state;
        console.log('aqui', user.id);
        editUser({
            id: user.id,
            username: newName,
            email: newEmail,
            age: newAge,
            gender: newGender,
            civilStatus: newCivilStatus,
            children: newChildren,
            city: newCity,
            country: newCountry,
            likes: user.likes,
        });
        alert('Usuário actualizado.');
    }

    render() {
        const { user: { username, country, city, email, age, gender, civilStatus, children } } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <EditInput text={this.state.newName} baseData={username} stateData={newName} />
                    <Text style={styles.label}>Nombre de Usuário: {username}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newName) => this.setState({ newName })}
                    //value={username}
                    />
                    <Text style={styles.label}>País: {country}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newCountry) => this.setState({ newCountry })}
                    //value={country}
                    />
                    <Text style={styles.label}>Ciudad: {city}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newCity) => this.setState({ newCity })}
                    //value={country}
                    />
                    <Text style={styles.label}>Correo Electrónico: {email}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newEmail) => this.setState({ newEmail })}
                    //value={country}
                    />
                    <Text style={styles.label}>Genero: {gender}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newGender) => this.setState({ newGender })}
                    //value={country}/>
                    />
                    <Text style={styles.label}>Estado Civil: {civilStatus}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newCivilStatus) => this.setState({ newCivilStatus })}
                    //value={country}
                    />
                    <Text style={styles.label}>Tiene hijos? {children}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newChildren) => this.setState({ newChildren })}
                    //value={country}
                    />
                    <TouchableOpacity style={styles.submitButton}
                        onPress={this.update}
                    >
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
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
                    //value={username}
                    />
                    <Text style={styles.label}>País: {country}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newCountry) => this.setState({ newCountry })}
                    //value={country}
                    />
                    <Text style={styles.label}>Ciudad: {city}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newCity) => this.setState({ newCity })}
                    //value={country}
                    />
                    <Text style={styles.label}>Correo Electrónico: {email}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newEmail) => this.setState({ newEmail })}
                    //value={country}
                    />
                    <Text style={styles.label}>Edad: {age}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newAge) => this.setState({ newAge })}
                    //value={country}
                    />
                    <Text style={styles.label}>Genero: {gender}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newGender) => this.setState({ newGender })}
                    //value={country}/>
                    />
                    <Text style={styles.label}>Estado Civil: {civilStatus}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newCivilStatus) => this.setState({ newCivilStatus })}
                    //value={country}
                    />
                    <Text style={styles.label}>Tiene hijos? {children}</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#9a73ef"
                        autoCapitalize="none"
                        placeholder='nuevo nombre'
                        onChangeText={(newChildren) => this.setState({ newChildren })}
                    //value={country}
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
                data.user.country = editUser.country;
                data.user.city = editUser.city;
                data.user.email = editUser.email;
                data.user.age = editUser.age;
                data.user.gender = editUser.gender;
                data.user.civilStatus = editUser.civilStatus;
                data.user.children = editUser.children;
                console.log('<<<<<Username', data.user.username);
                console.log('<<<<<Username', editUser.username);
                console.log('*****Country', data.user.country);
                console.log('*****Country', editUser.country);
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
)(EditProfile);*/

/*LIFESTYLE
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { LIFESTYLE_QUERY } from '../graphql/lifestyle.query';
import { USER_QUERY } from '../graphql/user.query';
import withLoading from '../components/withLoading';

const Lifestyle = (props) => {
    if (!props.lifestyles) {
        return null
    }
    const { lifestyles: [{ gender, civilStatus, nation, children }] } = props
    return (
        <View>
            <Text>
                Genero: {gender}
            </Text>
            <Text>
                Estado Civil: {civilStatus}
            </Text>
            <Text>
                Nacionalidad: {nation}
            </Text>
            <Text>
                Tiene hijos: {children}
            </Text>
        </View>
    )
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
)(Lifestyle);*/