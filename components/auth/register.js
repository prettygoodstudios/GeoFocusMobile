import React, {Component} from "react";
import {View, Text, AsyncStorage} from "react-native";
import {connect} from "react-redux";

import styles from "../../styles";
import * as actions from "../../actions";
import history from "../../history";
import {USER} from "../../storageKeys";

import FormGroup from "../form/group";
import FormTitle from '../form/title';
import Button from "../widgets/button";
import Error from "../widgets/error";
import PhotosCropper from "../photos/cropper";
import RegistrationForm from "./registrationForm";

class Register extends Component {


  submit = (credentials) => {
    const {email, password, displayName, passwordConfirmation, cropData, profile_img, bio} = credentials;
    if(profile_img.uri){
      const uri = profile_img.uri;
      const name = profile_img.uri.split("/")[profile_img.uri.split("/").length-1].split(".")[0];
      const fileType = profile_img.uri.split(".")[profile_img.uri.split(".").length - 1];
      const params = new FormData();
      params.append('display', displayName);
      params.append('bio', bio);
      params.append('email', email);
      params.append('password', password);
      params.append('password_confirmation', passwordConfirmation);
      params.append('offsetX', cropData.marginLeft);
      params.append('offsetY', cropData.marginTop);
      params.append('zoom', cropData.zoom);
      params.append('profile_img', {
        uri: uri,
        name: `${name}.${fileType}`,
        type: `image/${fileType}`
      });
      console.log("My Image URl", {
        uri: uri,
        name: `${name}.${fileType}`,
        type: `image/${fileType}`,
      });

      this.props.setLoading(true);
      this.props.createUser(params, this.success, this.error);
    }else{
      this.error("You must upload a profile picture.");
    }
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
      <RegistrationForm create={true} submit={this.submit}/>
    );
  }
}

function mapStateToProps(state){
  return{

  }
}

export default connect(mapStateToProps, actions)(Register);
