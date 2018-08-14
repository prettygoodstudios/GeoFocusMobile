import React, {Component} from "react";
import {View, Text} from "react-native";

import styles from "../../styles";

import FormGroup from "../form/group";
import Button from "../widgets/button";

export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: "",
      password: ""
    }
  }

  onChangeText = (l, t) => {
    let tempState = {}
    tempState[l.toLowerCase()] = t;
    this.setState({
      ...tempState
    });
  }

  render(){
    return(
      <View>
        <View style={styles.center}>
          <Text style={styles.h1}>Login</Text>
        </View>
        <FormGroup placeholder="Email" label="Email" value={this.state.email} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Password" label="Password" value={this.state.password} secure={true} onChangeText={this.onChangeText} />
        <Button onPress={() => console.log("Hello World!")} content="Sign In" />
      </View>
    );
  }
}
