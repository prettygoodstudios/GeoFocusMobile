import React, {Component} from "react";
import {View, Text, Platform} from "react-native";
import {Icon} from "react-native-elements";
import {MapView} from "expo";
const {Marker, Callout} = MapView;

import {connect} from "react-redux";

import * as actions from "../../actions";
import mapStyles from "../../styles/map";
import baseStyles from "../../styles/";

import Button from "../widgets/button";

class LocationsIndex extends Component {

  constructor(){
    super();
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    this.props.getLocations(this.success, this.error);
  }

  success = () => {
    this.setState({
      loaded: true
    });
    this.props.setLoading(false);
  }

  error = () => {
    this.props.setLoading(false);
  }

  render(){
    return(
      <View>
      <MapView style={[mapStyles.map]}>
        {this.state.loaded && this.props.locations.map((l, i) => {
          return(
            <Marker title={l.city} coordinate={{latitude: l.latitude, longitude: l.longitude}} key={i} style={[mapStyles.marker]} onCalloutPress={Platform.OS != "ios" ? () => console.log("View Me!")  : () => console.log("Callout Click")}>
              <Icon name="place" iconStyle={mapStyles.markerIcon}/>
              <Callout style={mapStyles.callout} >
                <Text style={[baseStyles.h1]}>{l.title}</Text>
                <Text style={{width: 300}}>{l.full_address}</Text>
                {Platform.OS === "ios" ? <Button content="View" onPress={() => console.log("View me!")}/> : <Text style={{width: 300}}>Tap to View!</Text>}
              </Callout>
            </Marker>
          )
        })}
      </MapView>
        {this.state.loaded && this.props.locations.map((l, i) => {
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
  const {loading} = state.loading;
  return{
    user,
    locations,
    loading
  }
}

export default connect(mapStateToProps, actions)(LocationsIndex);
