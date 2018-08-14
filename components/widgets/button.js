import React, {Component} from "react";
import {TouchableOpacity, View, Text} from "react-native";

import styles from "../../styles";

export default function(props) {
  const {content, onPress} = props;
  return(
    <TouchableOpacity onPress={ () => onPress() } activeOpacity={0.7}>
      <View style={[styles.button]}>
        <Text style={[styles.buttonText]}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
}
