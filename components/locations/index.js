import React, {Component} from "react";
import {View, Text, Platform, Image} from "react-native";
import {Icon} from "react-native-elements";
import {MapView} from "expo";
const {Marker, Callout} = MapView;

import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";
import mapStyles from "../../styles/map";
import baseStyles, {PRIMARY_COLOR} from "../../styles/";

import Button from "../widgets/button";

class LocationsIndex extends Component {

  constructor(){
    super();
    this.state = {
      loaded: false
    }
  }

  componentDidMount(){
    this.props.setLoading(true);
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
              <Marker title={l.city} coordinate={{latitude: l.latitude, longitude: l.longitude}} key={i} style={[mapStyles.marker]} onCalloutPress={Platform.OS !== "ios" ? () => this.props.getLocation(l.id, () => history.push(`/locations/${l.id}`), () => console.log("Failure!"))  : () => console.log("Callout Click")}>
                <Icon name="place" iconStyle={mapStyles.markerIcon}/>
                {Platform.OS !== "ios" && <View style={{width: 70, height: 70, borderRadius: 35, backgroundColor: PRIMARY_COLOR}}><Image source={require('../../assets/images/pinicon.png')} style={{width: 70, height: 70}}/></View>}
                <Callout style={mapStyles.callout} >
                  <Text style={[baseStyles.h1]}>{l.title}</Text>
                  <Text style={{width: 300}}>{l.full_address}</Text>
                  {Platform.OS === "ios" ? <Button content="View" onPress={() => this.props.getLocation(l.id, () => history.push(`/locations/${l.id}`), () => console.log("Failure!"))}/> : <Text style={{width: 300}}>Tap to View!</Text>}
                </Callout>
              </Marker>
            )
          })}
        </MapView>
        <View style={mapStyles.createButtonWrapper}>
          <Button content="Create Location" onPress={() => history.push("/locations/new/create")} />
        </View>
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
