import React from 'react';
import { Image } from 'react-native';

const CheckedImage = ({ url, defaultImg, style }) => {
  const uri = url || defaultImg || 'http://blogs.grupojoly.com/la-sastreria/files/Manolo-Garc%C3%ADa.jpg';
  return <Image style={style} source={{ uri }} />;
};

export default CheckedImage;
