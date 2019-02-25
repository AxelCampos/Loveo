import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import styles from './styles';

const openImagepicker = (createPicture) => {
  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.showImagePicker(options, async (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    await ImgToBase64.getBase64String(`${response.uri}`)
      .then((res) => {
        createPicture(res);
      })
      .catch(err => console.log('error!!!', err));
    alert('Foto guardada en el album');
  });
};

const CurrentUserIcons = ({ settings, createPicture }) => (
  <View style={styles.currentUserIcons}>
    <Icon.Button
      underlayColor="transparent"
      color="black"
      backgroundColor="white"
      size={20}
      borderRadius={30}
      name="camera"
      onPress={() => openImagepicker(createPicture)}
    />
    <Icon.Button
      underlayColor="transparent"
      color="black"
      backgroundColor="white"
      size={20}
      borderRadius={30}
      name="dots-vertical"
      onPress={settings}
    />
  </View>
);
CurrentUserIcons.propTypes = {
  settings: PropTypes.func.isRequired,
};
export default CurrentUserIcons;
