import React from "react";
import {View, Text, Image} from "react-native";

import profileStyles from "../../styles/profile";
import ProfileImage from "../users/profileImage";

const UsersHeader = (props) => {

  const {profileImg, display, email, bio, backgroundPhoto, zoom, width, height, offsetX, offsetY} = props;




  return(
    <View style={profileStyles.header}>
      <ProfileImage url={profileImg} size={100} zoom={zoom} width={width} height={height} offsetX={offsetX} offsetY={offsetY} style={{zIndex: 9999, marginLeft: 10, marginRight: 10}}/>
      <View style={profileStyles.headerInfo}>
        <Text style={profileStyles.headerTitle}>{display}</Text>
        <Text style={profileStyles.headerEmail}>{bio ? bio : email}</Text>
      </View>
      <View style={profileStyles.headerBackgroundMask}></View>
      <Image
        style={profileStyles.headerBackgroundImage}
        source={{uri: backgroundPhoto  }}
      />
    </View>
  );
}

export default UsersHeader;
