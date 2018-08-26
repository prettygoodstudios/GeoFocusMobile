import React, {Component} from "react";
import {View, Image} from "react-native";

const ProfileImage = (props) => {
  const {url, size, offsetX, offsetY, width, height, zoom, style} = props;

  const scaleRatio = size/400;
  const finalWidth = width*zoom*scaleRatio;
  const finalHeight = height*zoom*scaleRatio;
  const finalOffsetX = offsetX*scaleRatio;
  const finalOffsetY = offsetY*scaleRatio;

  return (
    <View style={{width: size, height: size, borderRadius: Math.floor(size/2), position: "relative", overflow: "hidden", ...style}}>
      <Image source={{uri: url}} style={{width: finalWidth, height: finalHeight, position: "absolute", left: finalOffsetX, top: finalOffsetY}} />
    </View>
  );

}

export default ProfileImage;
