import React from "react";
import {View, Text} from "react-native";

import errorStyles from "../../styles/error";

const Error = (props) => {
  const {error} = props;

  if(!error || error == ""){
    return <View></View>;
  }

  return(
    <View style={errorStyles.errorBubble}>
      <Text style={errorStyles.errorText}>{error}</Text>
    </View>
  );
}

export default Error;
