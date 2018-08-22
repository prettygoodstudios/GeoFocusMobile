import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import {connect} from "react-redux";

import history from "../../history";
import navStyles from "../../styles/nav";

const NavOption = (icon, route, key) => {
  console.log("Icon:", icon);
  return(
    <TouchableOpacity onPress={() => history.push(route)} key={key}>
      <View style={navStyles.option}>
        <Icon name={icon} iconStyle={navStyles.icon} />
      </View>
    </TouchableOpacity>
  );
}

class Nav extends Component {
  constructor(){
    super();
    this.state = {
      options: [
        {
          icon: "place",
          route: "/locations"
        },
        {
          icon: "face",
          route: "/users/profile/show"
        }
      ]
    }
  }
  render(){
    if(!this.props.authenticated){
      return(
        <View></View>
      );
    }
    return(
      <View style={navStyles.wrapper}>
        {this.state.options.map((o, i) => {
          return NavOption(o.icon, o.route, i);
        })}
      </View>
    );
  }
}

function mapStateToProps(state){
  const {user} = state.auth;
  return{
    ...user
  }
}

export default connect(mapStateToProps, null)(Nav);
