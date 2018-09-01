import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";

import LocationsForm from "./form";

class LocationsEdit extends Component {
  render(){
    return(
      <LocationsForm title="Edit Location" button="Update" submit={this.props.updateLocation} initialValues={this.props}/>
    );
  }
}

function mapStateToProps(state){
  const {location} = state.locations;
  return{
    ...location.location
  }
}

export default connect(mapStateToProps, actions)(LocationsEdit);
