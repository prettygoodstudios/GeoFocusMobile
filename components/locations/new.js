import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";

import LocationsForm from "./form";

class LocationsNew extends Component {

  render() {
    return(
      <View>
        <LocationsForm title="New Location"/>
      </View>
    );
  }

}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps, actions)(LocationsNew);
