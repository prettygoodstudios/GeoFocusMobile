import React, {Component} from 'react';
import {View, Text} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import baseStyles from "../../styles";

import FormGroup from "../form/group";
import Button from "../widgets/button";
import Error from "../widgets/error";

class ReviewsForm extends Component {

  constructor(){
    super();
    this.state = {
      score: "0",
      message: "",
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
    const {id} = this.props.location;
    const user_id = this.props.user.id;
    const {email, authentication_token} = this.props.user;
    this.props.setLoading(true);
    const params = {
      ...this.state,
      location_id: id,
      user_id,
      email,
      token: authentication_token
    }
    this.props.submit(params, this.success, this.error);
  }

  success = () => {
    this.props.setLoading(false);
  }

  error = (e) => {
    console.log(`Error: ${e}`);
    this.setState({
      error: e
    });
    this.props.setLoading(false);
  }

  render(){
    const {score, message, error} = this.state;
    const {title} = this.props;

    return(
      <View>
        <Text style={baseStyles.h1}>{title}</Text>
        <FormGroup placeholder="Score" label="Score" value={score} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Message" label="Message" value={message} onChangeText={this.onChangeText} />
        <Error error={error} />
        <Button content="Submit" onPress={() => this.submit()}/>
      </View>
    );
  }

}

function mapStateToProps(state){
  const {location} = state.locations.location;
  const {user} = state.auth;
  return{
    user,
    location
  }
}

export default connect(mapStateToProps, actions)(ReviewsForm);
