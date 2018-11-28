import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableHighlight,
    Picker,
    ScrollView,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { graphql, compose } from 'react-apollo';
import { USERS_QUERY } from '../graphql/users.query';
import withLoading from '../components/withLoading';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        //justifyContent: 'flex-start', //'center', 'flex-start', 'flex-end', 'space-around', 'space-between'
        //alignItems: "flex-start", //'center', 'flex-start', 'flex-end', 'stretched'
        paddingTop: 10
    },
    header: {
        flex: 0.4,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 5
    },
    main: {
        flex: 0.6,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 5,
    },
    title: {
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        height: 40,
        padding: 10,
        backgroundColor: '#c7d6db',
        borderRadius: 10,
        //color: '#7a42f4',
    },
    label: {
        marginBottom: 0,
        marginTop: 0,
        marginLeft: 15,
        marginRight: 15,
        height: 30,
        padding: 3,
        paddingLeft: 10,
        backgroundColor: '#c7d6db',
        borderRadius: 10,
        //color: '#7a42f4',
    },
    picker: {
        marginBottom: 15,
        marginTop: 0,
        marginLeft: 15,
        marginRight: 15,
        borderColor: '#9cb1b7',
        height: 30,
        borderRadius: 10,
        padding: 3,
        paddingLeft: 10,
        //color: '#7a42f4',
    },
    tendencyContainer: {
        flex: 1,
        width: 200,
        height: 190,
        alignItems: 'center',
        backgroundColor: '#F3E7E4',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 5,
        margin: 10,
    },
    userName: {
        fontSize: 12,
        position: 'absolute',
        top: 160,
        left: 10,
        color: 'black',
    },
    userImage: {
        width: 200,
        height: 150,
        borderRadius: 10,
    },
    userLikes: {
        flexDirection: 'row',
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        width: 40,
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    textLikes: {
        color: 'white',
        marginLeft: 3,
    },
});

const UserChosen = ({ item, goToProfile }) => {
    console.log(item.username, item.gender, item.civilStatus, item.children);
    return (
        <TouchableHighlight key={item.id} onPress={goToProfile}>
            <View style={styles.tendencyContainer}>
                <Image style={styles.userImage} source={{ uri: item.photoprofile.url }} />
                <View style={styles.userLikes}>
                    <Icon size={12} name="heart" color="#F0625A" />
                    <Text style={styles.textLikes}>{item.likes}</Text>
                </View>
                <Text style={styles.userName}>
                    {item.username} /
                {item.gender} /
                {item.civilStatus} /
                {item.children}
                </Text>
            </View>
        </TouchableHighlight>
    );
};

UserChosen.propTypes = {
    goToProfile: PropTypes.func,
    item: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
    }),
};

class Lifestyle extends Component {
    constructor(props) {
        super(props);
        const { users } = props;
        this.state = {
            gender: 'hombre',
            civilStatus: 'soltero',
            children: 'no tiene hijos',
        }
    }

    keyExtractor = item => item.id.toString();

    renderItem = ({ item }) => <UserChosen item={item} goToProfile={this.goToProfile(item)} />

    goToProfile = item => () => {
        const { navigation: { navigate } } = this.props;
        navigate('Profile', { userId: item.id });
    }

    selectGender = (item) => {
        return item.gender == this.state.gender;
    }
    selectCivilStatus = (item) => {
        return item.civilStatus == this.state.civilStatus;
    }
    selectChildren = (item) => {
        return item.children == this.state.children;
    }

    render() {

        const { users } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ScrollView >
                        <Text style={styles.title}>Preferencias de Búsqueda </Text>
                        <Text style={styles.label}>por Genero: </Text>
                        <Picker style={styles.picker} selectedValue={this.state.gender} onValueChange={(gender) => this.setState({ gender })}>
                            <Picker.Item label='hombre' value='hombre' />
                            <Picker.Item label='mujer' value='mujer' />
                            <Picker.Item label='otro' value='otro' />
                        </Picker>
                        <Text style={styles.label}>Estado Civil: </Text>
                        <Picker style={styles.picker} selectedValue={this.state.civilStatus} onValueChange={(civilStatus) => this.setState({ civilStatus })}>
                            <Picker.Item label='soltero' value='soltero' />
                            <Picker.Item label='divorciado' value='divorciado' />
                            <Picker.Item label='separado' value='separado' />
                            <Picker.Item label='casado' value='casado' />
                            <Picker.Item label='viudo' value='viudo' />
                            <Picker.Item label='no especificado' value='no especificado' />
                        </Picker>
                        <Text style={styles.label}>por Tener o no Tener Hijos: </Text>
                        <Picker style={styles.picker} selectedValue={this.state.children} onValueChange={(children) => this.setState({ children })}>
                            <Picker.Item label='no tiene hijos' value='no tiene hijos' />
                            <Picker.Item label='tiene hijos' value='tiene hijos' />
                            <Picker.Item label='no especificado' value='no especificado' />
                        </Picker>
                    </ScrollView>
                </View>
                <View style={styles.main}>
                    <FlatList
                        data={users.slice().filter(this.selectGender).filter(this.selectCivilStatus).filter(this.selectChildren)}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                    //numColumns={2}
                    />
                </View>
            </View>

        );
    }
}

Lifestyle.propTypes = {
    navigation: PropTypes.shape({
        navitate: PropTypes.func,
    }),
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            username: PropTypes.string,
            album: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                }),
            ),
        }),
    ),
};

const usersQuery = graphql(USERS_QUERY, {
    options: () => ({}), // fake the user for now
    props: ({ data: { users } }) => ({
        users: users || [],
    }),
});

export default compose(
    usersQuery,
    withLoading,
)(Lifestyle);