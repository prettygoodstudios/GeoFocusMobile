import React, {Component} from "react";
import {Text, View, TextInput} from "react-native";

import styles from "../../styles/form";

const FormGroup = (props) => {
  const {placeholder, value, defaultValue, onChangeText, label, secure} = props;
  const setValue = label.split(" ").length > 1 ? label.split(" ")[0].toLowerCase() + label.split(" ")[1].charAt(0).toUpperCase() + label.split(" ")[1].slice(1) : label.toLowerCase();
  return(
    <View style={[styles.formGroup]}>
      <Text style={[styles.formLabel]}>{label}</Text>
      <TextInput style={[styles.formInput]} placeholder={placeholder} autoCapitalize="none" secureTextEntry={secure} onChangeText={(t) => onChangeText(setValue, t)} defaultValue={defaultValue} value={value} underlineColorAndroid="transparent"/>
    </View>
  );
}

export default FormGroup;
