import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";


import * as actions from "../../actions";
import history from "../../history";
import baseStyles from "../../styles";

import FormGroup from "../form/group";
import FormTitle from '../form/title';
import Button from "../widgets/button";
import Error from "../widgets/error";
import PhotosCropper from "../photos/cropper";

class RegistrationForm extends Component {

  constructor(){
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      currentPassword: "",
      bio: "",
      error: "",
      cropData: {},
      profile_img: {}
    }
  }

  componentDidMount(){
    const {create, display, email, bio, offsetX, offsetY, zoom, profile_img, width, height} = this.props;
    if(!create){
      this.setState({
        displayName: display,
        email,
        bio,
        cropData: {
          zoom,
          marginLeft: offsetX,
          marginTop: offsetY
        },
        profile_img: {
          uri: profile_img.url,
          width: width,
          height: height
        }
      });
    }
    this.props.setPadding(20);
  }

  onChangeText = (l, t) => {
    let tempState = {}
    tempState[l] = t;

    this.setState({
      ...tempState
    });
    //console.log(l, t);
  }

  error = (e) => {
    this.setState({
      error: e
    });
    this.props.setLoading(false);
  }

  setImage = (image) => {
    this.setState({
      profile_img: image
    });
  }

  updateCropData = (data) => {
    console.log("My Crop Data:",data);
    this.setState({
      cropData: data
    });
  }

  render(){
    const {profile_img, email, password, passwordConfirmation, currentPassword, displayName, bio, error} = this.state;
    const {create, submit, zoom, offsetX, offsetY, width, height} = this.props;
    return(
      <View>
        <FormTitle title={create ? "Register" : "Edit Profile"} />
        <FormGroup placeholder="Display Name" label="Display Name" value={displayName} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Bio" label="Bio" value={bio} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Email" label="Email" value={email} onChangeText={this.onChangeText} />
        <FormGroup placeholder={create ? "Password" : "Current Password"} label={create ? "Password" : "Current Password"} value={create ? password : currentPassword} secure={true} onChangeText={this.onChangeText} />
        { !create && <Text style={baseStyles.p}>(Leave black to keep your current password. If you would like to change your password enter your new desired password.)</Text>}
        <FormGroup placeholder={create ? "Password Confirmation" : "Password"} label={create ? "Password Confirmation" : "Password"} value={create ? passwordConfirmation : password} secure={true} onChangeText={this.onChangeText} />
        { create  ?
          <PhotosCropper image={profile_img.uri} width={profile_img.width} height={profile_img.height} updateCropData={this.updateCropData} setImage={this.setImage}/>
          :
          <PhotosCropper image={profile_img.uri} width={profile_img.width} height={profile_img.height} updateCropData={this.updateCropData} setImage={this.setImage} setCropData={true} profileImg={this.props.profile_img} zoom={zoom} offsetX={offsetX} offsetY={offsetY}/>
        }
        <Error error={error} />
        <Button onPress={() => submit(this.state, this.error)} content={create ? "Register" : "Update"} />
        {create && <Button onPress={() => history.push("/")} content="Sign In" />}
        <View style={{height: 50}}></View>
      </View>
    );
  }
}

function mapStateToProps(state){
  const {user} = state.users.selectedUser;
  return{
    ...user
  }
}

export default connect(mapStateToProps, actions)(RegistrationForm);
