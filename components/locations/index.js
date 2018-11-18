import React, {Component} from "react";
import {View, Text, Platform, Image} from "react-native";
import {Icon} from "react-native-elements";
import {MapView, Location, Permissions} from "expo";
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
      loaded: false,
      location: {
        longitude: -111.8910,
        latitude: 40.7608
      }
    }
  }

  componentDidMount(){
    this.props.setLoading(true);
    this.props.getLocations(this.success, this.error);
    this.props.setPadding(0);
    if(!this.props.myLocation.latitude){
      this.getLocationAsync();
    }else{
      this.setState({
        location: this.props.myLocation
      });
    }
  }

  componentWillUnmount(){
    this.props.setPadding(20);
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

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      alert("The map will not automatically select your geographic area and distance estimates will be based off of your distance from Salt Lake City, Utah.");
      this.props.setMyLocation(this.state.location);
    }

    let location = await Location.getCurrentPositionAsync({});
    const parsedLocation = { latitude: location.coords.latitude,  longitude: location.coords.longitude };
    this.setState({ location: parsedLocation });
    this.props.setMyLocation(parsedLocation);
  };

  goToLocation = (id) => {
    this.props.setLoading(true);
    this.props.getLocation(id, (id) => this.goToLocationSuccess(id), this.props.error);
  }

  goToLocationSuccess = (id) => {
    this.props.setLoading(false);
    history.push(`/locations/${id}`);
  }

  render(){
    const {loaded, location} = this.state;
    const {user} = this.props;
    return(
      <View>
        <MapView style={[mapStyles.map]} region={{...location, latitudeDelta: 0.1322, longitudeDelta: 0.0821}}>
          {loaded && this.props.locations.map((l, i) => {
            return(
              <Marker title={l.city} image={require('../../assets/images/pinicon.png')} coordinate={{latitude: l.latitude, longitude: l.longitude}} key={i} style={[mapStyles.marker]} onCalloutPress={Platform.OS !== "ios" ? () => this.goToLocation(l.id) : () => console.log("Callout Click")}>
                <Callout style={mapStyles.callout} >
                  <Text style={[baseStyles.h1]}>{l.title}</Text>
                  <Text style={{width: 300}}>{l.full_address}</Text>
                  {Platform.OS === "ios" ? <Button content="View" onPress={() => this.goToLocation(l.id)}/> : <Text style={{width: 300}}>Tap to View!</Text>}
                </Callout>
              </Marker>
            )
          })}
        </MapView>
          <View style={mapStyles.createButtonWrapper}>
            { user.verified ?
              <Button content="Create Location" onPress={() => history.push("/locations/new/create")} />
              :
              <View style={mapStyles.notVerifiedBubble}>
                <Text>You must verify your email indorder to create a location. An email was already sent to the email you used during registration. Press the button below to refresh your verification status if you have recently verified your email.</Text>
                <Button onPress={() => this.props.authenticate({email: user.email, token: user.authentication_token}, () => console.log("Success!"), () => console.log("Failure!"))} content="Refresh!"/>
              </View>
            }
          </View>
      </View>
    );
  }
}

function mapStateToProps(state){
  const {user} = state.auth;
  const {locations, myLocation} = state.locations;
  const {loading} = state.loading;
  return{
    user,
    locations,
    loading,
    myLocation
  }
}

export default connect(mapStateToProps, actions)(LocationsIndex);
