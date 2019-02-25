import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import CheckedImage from '../../../components/checked-image';

const UserChosen = ({ item, goToProfile }) => (
  <TouchableHighlight key={item.id} onPress={goToProfile}>
    <View style={styles.tendencyContainer}>
      <CheckedImage style={styles.userImage} url={item.photoprofile.url} />
      <View style={styles.userLikes}>
        <Icon size={12} name="heart" color="#F0625A" />
        <Text style={styles.textLikes}>{item.likes}</Text>
      </View>
      <Text style={styles.userName}>
        {item.username}
        :
        {item.gender}
        ,
        {item.civilStatus}
        ,
        {item.children}
      </Text>
    </View>
  </TouchableHighlight>
);

export default UserChosen;
