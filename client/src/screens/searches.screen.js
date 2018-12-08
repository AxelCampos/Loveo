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
    Image,
    Button,
    TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { graphql, compose } from 'react-apollo';
import { USERS_QUERY } from '../graphql/users.query';
import withLoading from '../components/withLoading';
import SEARCHES_QUERY from '../graphql/searches.query';
import DELETE_SEARCH_MUTATION from '../graphql/delete-search.mutation';

/*
const Search = ({ item, goToSearch, deleteSearch }) => {
    return (
        <TouchableHighlight key={item.id} onPress={goToSearch}>
            <View >
                <Text>
                    {item.name}
                </Text>
                <View>
                    <Icon size={12} name="heart" color="#F0625A" />
                </View>
            </View>
        </TouchableHighlight>
    );
};


class Searches extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            userId: navigation.state.params.userId,
        }

    }

    keyExtractor = item => item.id.toString();

    renderItem = item => <Search item={item} goToSearch={this.goToSearch(item)} deleteSearch={this.deleteSearch(item)} />

    goToSearch = item => {
        const { navigation: { navigate, state } } = this.props;
        navigate('LifestyleResult',
            {
                userId: state.params.userId,
                gender: item.gender,
                civilStatus: item.civilStatus,
                children: item.children,
            });
    };

    deleteSearch = item => () => {
        deleteSearch({
            id: item.id,
        })
        alert('Busqueda eliminada!');
    };

    backToLifestyle = () => {
        const { navigation: { navigate, state } } = this.props;
        navigate('Lifestyle',
            {
                userId: state.params.userId,
            });
    }

    render() {
        const { searches } = this.props;
        return (
            <View>
                <FlatList
                    data={searches.slice()}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const deleteSearchMutation = graphql(DELETE_SEARCH_MUTATION, {
    props: ({ mutate }) => ({
        deleteSearch: search => mutate({
            variables: { search } /*,
        update: (store, { data: { searchGroup } }) => {
          // Read the data from our cache for this query.
          const data = store.readQuery({ query: USER_QUERY, variables: { id: group.userId } });
          // Add our message from the mutation to the end.
          data.user.groups.push(createGroup);
          // Write our data back to the cache.
          store.writeQuery({
            query: USER_QUERY,
            variables: { id: group.userId },
            data,
          });
        },*/
/*}),
}),
});

const searchesQuery = graphql(SEARCHES_QUERY, {
options: () => ({}), // fake the user for now
/*options: (ownProps) => ({
variables: {
    id: ownProps.navigation.state.params.userId,
},
}),*/
/*props: ({ data: { loading, searches } }) => ({
    loading,
    searches
}),
});

export default compose(
deleteSearchMutation,
searchesQuery,
withLoading,
)(Searches);

*/

const Searches = () => (
    <View>
        <Text>Busquedas</Text>
    </View>
);


export default Searches;