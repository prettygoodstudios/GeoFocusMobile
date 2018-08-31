import React, {Component} from "react";
import {View, Text, TextInput} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";

import FormGroup from "../form/group";
import FormTitle from "../form/title";
import Button from "../widgets/button";
import Error from "../widgets/error";

class LocationsForm extends Component {

  constructor(){
    super();
    this.state = {
      title: "",
      address: "",
      city: "",
      state: "",
      country: "",
      error: ""
    }
  }

  submit = () => {
    const {authentication_token, email} = this.props;
    const params = {
      ...this.state,
      token: authentication_token,
      email
    }
    this.props.setLoading(true);
    this.props.submit(params, (id) =>  this.success(id), (e) =>  this.error(e));
  }

  success = (id) => {
    this.props.setLoading(false);
    history.push("/locations/"+id);
  }

  error = (e) => {
    this.props.setLoading(false);
    this.setState({
      error: e
    });
  }

  onChangeText = (l, t) => {
    let tempState = {}
    tempState[l.toLowerCase()] = t;
    this.setState({
      ...tempState
    });
  }

  render(){
    const {title, address, city, state, country, error} = this.state;
    return(
      <View>
        <FormTitle title={this.props.title} />
        <FormGroup placeholder="Title" label="Title" value={title} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Address" label="Address" value={address} onChangeText={this.onChangeText} />
        <FormGroup placeholder="City" label="City" value={city} onChangeText={this.onChangeText} />
        <FormGroup placeholder="State" label="State" value={state} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Country" label="Country" value={country} onChangeText={this.onChangeText} />
        <Error error={error}/>
        <Button content="Create" onPress={() => this.submit()}/>
      </View>
    );
  }
}

function mapStateToProps(state){
  const {user} = state.auth;
  return {
    ...user
  }
}

export default connect(mapStateToProps, actions)(LocationsForm);
