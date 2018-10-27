import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";

import RegistrationForm from "./registrationForm";

class EditRegistration extends Component {

  submit = (credentials, error) => {
    const {email, password, displayName, currentPassword, cropData, profile_img, bio} = credentials;
    const uri = profile_img ? profile_img.uri : "";
    const name = profile_img ? profile_img.uri.split("/")[profile_img.uri.split("/").length-1].split(".")[0] : "";
    const fileType = profile_img ? profile_img.uri.split(".")[profile_img.uri.split(".").length - 1] : "";
    const params = new FormData();
    params.append('id', this.props.id);
    params.append('display', displayName);
    params.append('bio', bio);
    params.append('email', email);
    params.append('password', password);
    params.append('current_password', currentPassword);
    if(uri != ""){
      params.append('offsetX', cropData.marginLeft);
      params.append('offsetY', cropData.marginTop);
      params.append('zoom', cropData.zoom);
      params.append('profile_img', {
        uri,
        name: `${name}.${fileType}`,
        type: `image/${fileType}`
      });
    }
    this.props.setLoading(true);
    this.props.editRegistration(params, this.success, error);
  }

  success = (user) => {
    this.props.setLoading(false);
    this.storeUser(user);
    history.push("/locations");
  }

  storeUser = async (user) => {
    try {
      await AsyncStorage.setItem(USER, `${user.authentication_token}, ${user.email}`);
    } catch (error) {
      console.log("Error Storing", error);
    }
  }

  render(){
    return(
      <View>
        <RegistrationForm create={false} submit={this.submit}/>
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

export default connect(mapStateToProps, actions)(EditRegistration);
