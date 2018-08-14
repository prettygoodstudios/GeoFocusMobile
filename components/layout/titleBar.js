import React, {Component} from "react";
import {View, Text} from "react-native";

import styles from "../../styles";
import titleBarStyles from "../../styles/titleBar";

export default class TitleBar extends Component {

  render(){
    return(
      <View style={titleBarStyles.titleBar}>
        <View style={titleBarStyles.textWrapper}>
          <Text style={titleBarStyles.bolded}>Geo</Text>
          <Text style={titleBarStyles.lighter}>Focus</Text>
        </View>
      </View>
    );
  }

}
