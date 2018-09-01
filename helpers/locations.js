import React, {Component} from "react";
import {View} from "react-native";
import {connect} from 'react-redux';


export const fullAddress = ({address ,city, state, country}) => {
  return `${address}, ${city}, ${state}, ${country}`;
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
