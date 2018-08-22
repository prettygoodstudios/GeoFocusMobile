import React from "react";
import {View, Text, Image} from "react-native";

import profileStyles from "../../styles/profile";

const UsersHeader = (props) => {

  const {profileImg, display, email, backgroundPhoto} = props;

  return(
    <View style={profileStyles.header}>
      <Image
        style={profileStyles.headerImage}
        source={{uri: profileImg}}
      />
      <View style={profileStyles.headerInfo}>
        <Text style={profileStyles.headerTitle}>{display}</Text>
        <Text style={profileStyles.headerEmail}>{email}</Text>
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
