import React from "react";
import {View, Text} from "react-native";

import styles from "../../styles";

const FormTitle = (props) => {
  return(
    <View style={styles.center}>
      <Text style={styles.h1}>{props.title}</Text>
    </View>
  );
}

export default FormTitle;
