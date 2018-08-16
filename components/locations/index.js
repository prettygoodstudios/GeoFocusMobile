import React, {Component} from "react";
import {View, Text} from "react-native";
import {MapView} from "expo";
import {connect} from "react-redux";

import * as actions from "../../actions";

class LocationsIndex extends Component {

  componentDidMount(){
    this.props.getLocations(this.success, this.error);
  }

  success = () => {

  }

  error = () => {

  }

  render(){
    return(
      <View>
        { this.props.locations.map((l, i) => {
          return(
            <Text key={i}>{l.city}</Text>
          )
        })}
      </View>
    );
  }
}

function mapStateToProps(state){
  const {user} = state.auth;
  const {locations} = state.locations;
  return{
    user,
    locations
  }
}

export default connect(mapStateToProps, actions)(LocationsIndex);
