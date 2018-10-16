import React, {Component} from "react";
import {View, Text, Image} from "react-native";

import styles from "../../styles";
import titleBarStyles from "../../styles/titleBar";

export default class TitleBar extends Component {

  render(){
    return(
      <View style={titleBarStyles.titleBar}>
        <View style={titleBarStyles.textWrapper}>
          <Image source={require('../../assets/images/geologo.png')} style={titleBarStyles.logo}/>
          <Text style={titleBarStyles.bolded}>Geo</Text>
          <Text style={titleBarStyles.lighter}>Focus</Text>
        </View>
      </View>
    );
  }

}
