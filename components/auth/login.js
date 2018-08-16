import React, {Component} from "react";
import {View, Text, AsyncStorage} from "react-native";
import {connect} from "react-redux";

import styles from "../../styles";
import * as actions from "../../actions";
import history from "../../history";
import {USER} from "../../storageKeys";

import FormGroup from "../form/group";
import Button from "../widgets/button";
import Error from "../widgets/error";

class Login extends Component {

  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      error: ""
    }
  }

  componentDidMount(){
    this.props.setLoading(true);
    this.retrieveUser();
  }

  onChangeText = (l, t) => {
    let tempState = {}
    tempState[l.toLowerCase()] = t;
    this.setState({
      ...tempState
    });
  }

  submit = () => {
    this.props.logIn(this.state, this.success, this.error);
  }

  success = (user) => {
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

  retrieveUser = async () => {
    try {
      const value = await AsyncStorage.getItem(USER);
      if (value !== null) {
        const user = {
          token: value.split(", ")[0],
          email: value.split(", ")[1]
        }
        this.props.authenticate(user, this.success, this.error);
      }else{
        this.props.setLoading(false);
      }
     } catch (error) {
       console.log("Error Retrieving User:", error);
       this.props.setLoading(false);
     }
  }

  error = (e) => {
    let eMessage = "";
    switch(e.toString()){
      case "Error: Request failed with status code 401":
        eMessage = "Incorrect password or email."
        break;
      default:
        eMessage = "Could not establish a connection to the server."
        break;
    }
    this.setState({
      error: eMessage
    });
    this.props.setLoading(false);
  }

  render(){
    return(
      <View>
        <View style={styles.center}>
          <Text style={styles.h1}>Login</Text>
        </View>
        <FormGroup placeholder="Email" label="Email" value={this.state.email} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Password" label="Password" value={this.state.password} secure={true} onChangeText={this.onChangeText} />
        <Button onPress={() => this.submit()} content="Sign In" />
        <Error error={this.state.error} />
      </View>
    );
  }
}

function mapStateToProps(state){
  return{

  }
}

export default connect(mapStateToProps, actions)(Login);
