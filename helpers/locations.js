import React, {Component} from "react";
import {View} from "react-native";
import {connect} from 'react-redux';


export const fullAddress = ({address ,city, state, country}) => {
  return `${address}, ${city}, ${state}, ${country}`;
}

export const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

class SM extends Component{
  render(){
    if(this.props.user.id != this.props.location.user_id){
      return <View></View>
    }
    return (
      <View>{this.props.children}</View>
    );
  }
}

function mapStateToProps(state){
  const {user} = state.auth;
  const {location} = state.locations.location;
  return{
    user,
    location
  }
}

export const ShowIfMine = connect(mapStateToProps)(SM);
