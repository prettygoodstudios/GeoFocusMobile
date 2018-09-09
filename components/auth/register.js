import React, {Component} from "react";
import {View, Text, AsyncStorage} from "react-native";
import {connect} from "react-redux";

import styles from "../../styles";
import * as actions from "../../actions";
import history from "../../history";
import {USER} from "../../storageKeys";

import FormGroup from "../form/group";
import FormTitle from '../form/title';
import Button from "../widgets/button";
import Error from "../widgets/error";

class Register extends Component {

  constructor(){
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      error: ""
    }
  }

  componentDidMount(){
  }

  onChangeText = (l, t) => {
    let tempState = {}
    tempState[l] = t;
    this.setState({
      ...tempState
    });
  }

  submit = () => {
    const {email, password, displayName, passwordConfirmation} = this.state;
    const params = {
      email,
      password,
      display: displayName,
      password_confirmation: passwordConfirmation
    }
    this.props.setLoading(true);
    this.props.createUser(params, this.success, this.error);
  }

  success = (user) => {
    this.props.setLoading(false);
    this.storeUser(user);
    history.push("/locations");
  }

  storeUser = async (user) => {
    try {
      await AsyncStorage.setItem(USER, `${user.authentication_token}, ${user.email}`);
    } catch (error) {
      console.log("Error Storing", error);
    }
  }


  error = (e) => {
    this.setState({
      error: e
    });
    this.props.setLoading(false);
  }

  render(){
    return(
      <View>
        <FormTitle title="Register" />
        <FormGroup placeholder="Display Name" label="Display Name" value={this.state.display} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Email" label="Email" value={this.state.email} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Password" label="Password" value={this.state.password} secure={true} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Password Confirmation" label="Password Confirmation" value={this.state.passwordConfirmation} secure={true} onChangeText={this.onChangeText} />
        <Button onPress={() => this.submit()} content="Register" />
        <Button onPress={() => history.push("/")} content="Sign In" />
        <Error error={this.state.error} />
      </View>
    );
  }
}

function mapStateToProps(state){
  return{

  }
}

export default connect(mapStateToProps, actions)(Register);
