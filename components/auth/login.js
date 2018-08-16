import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import styles from "../../styles";
import * as actions from "../../actions";
import history from "../../history";

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

  success = () => {
    history.push("/locations");
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
