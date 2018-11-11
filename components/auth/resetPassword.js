import React, {Component} from "react";
import {View, Text} from  "react-native";
import axios from "axios";

import history from "../../history";
import baseStyles from '../../styles';
import {ROOT_URL} from '../../backend';
import {parseNetworkErrors} from "../../helpers/errors";

import FormGroup from '../form/group';
import Button from '../widgets/button';
import Error from '../widgets/error';

class ResetPassword extends Component{

  constructor(){
    super();
    this.state = {
      email: "",
      message: ""
    }
  }

  onChangeText = (l, t) => {
    let tempState = {}
    tempState[l] = t;

    this.setState({
      ...tempState
    });
    //console.log(l, t);
  }

  submit = () => {
    axios.post(`${ROOT_URL}/users/password/reset`,{email: this.state.email}).then((r) => {
      const {message, errors} = r.data;
      if(!errors){
        this.setState({
          message
        });
      }else{
        this.setState({
          message: errors[0]
        });
      }
    }).catch((e) => {
      this.setState({
        message: parseNetworkErrors(e)
      });
    });
  }

  render(){
    const {message, email} = this.state;
    return(
      <View>
        <Text style={baseStyles.h1}>Reset Password</Text>
        <Text style={baseStyles.p}>Enter the email associated with the acount you would like to reset the password for. You will recieve an email containing instructions after submiting your email.</Text>
        <FormGroup placeholder="Email" label="Email" value={email} onChangeText={this.onChangeText} />
        <Error error={message}/>
        <Button onPress={this.submit} content="Reset Password"/>
        <Button onPress={() => history.push("/")} content="Login"/>
        <View style={{height: 20}}></View>
      </View>
    );
  }
}

export default ResetPassword;
