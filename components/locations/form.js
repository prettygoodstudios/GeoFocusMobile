import React, {Component} from "react";
import {View, Text, TextInput} from "react-native";

import FormGroup from "../form/group";
import FormTitle from "../form/title";
import Button from "../widgets/button";

class LocationsForm extends Component {

  constructor(){
    super();
    this.state = {
      title: "",
      address: "",
      city: "",
      state: "",
      country: ""
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
        <FormTitle title={this.props.title} />
        <FormGroup placeholder="Title" label="Title" value={this.state.title} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Address" label="Address" value={this.state.address} onChangeText={this.onChangeText} />
        <FormGroup placeholder="City" label="City" value={this.state.city} onChangeText={this.onChangeText} />
        <FormGroup placeholder="State" label="State" value={this.state.state} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Country" label="Country" value={this.state.country} onChangeText={this.onChangeText} />
        <Button content="Create" onPress={() => console.log("Hello World!")}/>
      </View>
    );
  }
}

export default LocationsForm;
