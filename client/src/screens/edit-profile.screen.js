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
    Picker,
    ListView,
    FlatList,
    ToastAndroid
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { StackActions, NavigationActions } from 'react-navigation';
import { USER_QUERY } from '../graphql/user.query';
import EDIT_USER_MUTATION from '../graphql/edit-user.mutation';

const styles = StyleSheet.create({
    container: {
        //flexDirection: 'row', //'column', 'row'
        //justifyContent: 'flex-start', //'center', 'flex-start', 'flex-end', 'space-around', 'space-between'
        //alignItems: "flex-start", //'center', 'flex-start', 'flex-end', 'stretched'
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
        borderColor: '#c7d6db',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,

    },
    submitButton: {
        backgroundColor: '#9cb1b7',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 20,
    },
    submitButtonText: {
        //color: 'white'
    },
    label: {
        marginBottom: 0,
        marginTop: 0,
        marginLeft: 15,
        marginRight: 15,
        height: 40,
        padding: 10,
        backgroundColor: '#c7d6db',
        borderRadius: 20,
        //color: '#7a42f4',
    },
    picker: {
        marginBottom: 15,
        marginTop: 0,
        marginLeft: 15,
        marginRight: 8,
        borderColor: '#9cb1b7',
        height: 40,
        borderRadius: 20,
        padding: 10,
        //borderColor: '#c7d6db',
        //backgroundColor: 'lightblue',
        //color: '#7a42f4',
    },
    header: {
        alignItems: 'flex-end',
        padding: 6,
        borderColor: '#eee',
        borderBottomWidth: 1,
    },
});
const Header = ({ onPress }) => (
    <View style={styles.header}>
        <Button title="Volver al Perfil" onPress={onPress} />
    </View>
);
class EditProfile extends Component {
    constructor(props) {
        super(props);
        const { user } = this.props;
        this.state = {
            newName: user.username,
            newCountry: user.country,
            newCity: user.city,
            newEmail: user.email,
            newAge: user.age,
            newGender: user.gender,
            newCivilStatus: user.civilStatus,
            newChildren: user.children,
        };
    }

    //TODO: fix age input
    update = () => {
        const { editUser, user } = this.props;
        const { newName, newCountry, newCity, newEmail, newAge, newGender, newCivilStatus, newChildren } = this.state;
        console.log('aqui', user.id);
        editUser({
            id: user.id,
            username: newName,
            email: newEmail,
            age: user.age,
            gender: newGender,
            civilStatus: newCivilStatus,
            children: newChildren,
            city: newCity,
            country: newCountry,
            likes: user.likes,
        });
        alert('Usuário actualizado.');
    }
    goToProfile = () => {
        const {
            navigation: { navigate },
            user,
        } = this.props;
        ToastAndroid.showWithGravity(
            'Salir de la Pagina y volver al Perfil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
        navigate('User', {
            userId: user.id,
        });
    };

    render() {
        const { user: { username, country, city, email, age, gender, civilStatus, children } } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Header onPress={this.goToProfile} />
                    <ScrollView>
                        <Text style={styles.label}>Nombre de Usuário: {username}</Text>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            //placeholderTextColor="#9a73ef"
                            autoCapitalize="none"
                            placeholder='nuevo nombre'
                            onChangeText={(newName) => this.setState({ newName })}
                        //value={username}
                        />
                        <Text style={styles.label}>Correo Electrónico: {email}</Text>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            //placeholderTextColor="#9a73ef"
                            autoCapitalize="none"
                            placeholder='nuevo correo electrónico'
                            onChangeText={(newEmail) => this.setState({ newEmail })}
                        //value={country}
                        />
                        <Text style={styles.label}>Edad: {age}</Text>
                        <TextInput style={styles.input}
                            keyboardType='numeric'
                            underlineColorAndroid="transparent"
                            //placeholderTextColor="#9a73ef"
                            autoCapitalize="none"
                            placeholder='nueva edad'
                            onChangeText={(newAge) => this.setState({ newAge })}
                        //value={country}
                        />
                        <Text style={styles.label}>País: {country}</Text>
                        <Picker style={styles.picker} selectedValue={this.state.newCountry} onValueChange={(newCountry) => this.setState({ newCountry })}>
                            <Picker.Item label='España' value='España' />
                            <Picker.Item label='Italia' value='Italia' />
                            <Picker.Item label='Francia' value='Francia' />
                            <Picker.Item label='EEUU' value='EEUU' />
                            <Picker.Item label='Reino Unido' value='Reino Unido' />
                            <Picker.Item label='Brasil' value='Brasil' />
                            <Picker.Item label='Argentina' value='Argentina' />
                            <Picker.Item label='Portugal' value='Portugal' />
                            <Picker.Item label='Bélgica' value='Bélgica' />
                        </Picker>
                        <Text style={styles.label}>Ciudad: {city}</Text>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            //placeholderTextColor="#9a73ef"
                            autoCapitalize="none"
                            placeholder='nuevo nombre'
                            onChangeText={(newCity) => this.setState({ newCity })}
                        //value={country}
                        />
                        <Text style={styles.label}>Genero: {gender}</Text>
                        <Picker style={styles.picker} selectedValue={this.state.newGender} onValueChange={(newGender) => this.setState({ newGender })}>
                            <Picker.Item label='hombre' value='hombre' />
                            <Picker.Item label='mujer' value='mujer' />
                            <Picker.Item label='otro' value='otro' />
                        </Picker>
                        <Text style={styles.label}>Estado Civil: {civilStatus}</Text>
                        <Picker style={styles.picker} selectedValue={this.state.newCivilStatus} onValueChange={(newCivilStatus) => this.setState({ newCivilStatus })}>
                            <Picker.Item label='soltero nunca casado' value='soltero nunca casado' />
                            <Picker.Item label='divorciado' value='divorciado' />
                            <Picker.Item label='separado' value='separado' />
                            <Picker.Item label='casado' value='casado' />
                            <Picker.Item label='viudo' value='viudo' />
                            <Picker.Item label='no especificado' value='no especificado' />
                        </Picker>
                        <Text style={styles.label}>Tiene hijos? {children}</Text>
                        <Picker style={styles.picker} selectedValue={this.state.newChildren} onValueChange={(newChildren) => this.setState({ newChildren })}>
                            <Picker.Item label='no tiene hijos' value='no tiene hijos' />
                            <Picker.Item label='tiene hijos' value='tiene hijos' />
                            <Picker.Item label='no especificado' value='no especificado' />
                        </Picker>
                        <TouchableOpacity style={styles.submitButton}
                            onPress={this.update}
                        >
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </ScrollView>
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
)(EditProfile);