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

class Register extends Component {

  constructor(){
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      error: "",
      cropData: {},
      profile_img: {}
    }
  }

  componentDidMount(){
  }

  onChangeText = (l, t) => {
    let tempState = {}
    tempState[l] = t;

    this.setState({
      ...tempState
    });
    console.log(l, t);
  }

  submit = () => {
    const {email, password, displayName, passwordConfirmation, cropData, profile_img} = this.state;
    if(profile_img.uri){
      const uri = profile_img.uri;
      const name = profile_img.uri.split("/")[profile_img.uri.split("/").length-1].split(".")[0];
      const fileType = profile_img.uri.split(".")[profile_img.uri.split(".").length - 1];
      const params = new FormData();
      params.append('display', displayName);
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
    this.setState({
      cropData: data
    });
  }

  render(){
    const {profile_img, email, password, passwordConfirmation, displayName} = this.state;
    return(
      <View>
        <FormTitle title="Register" />
        <FormGroup placeholder="Display Name" label="Display Name" value={displayName} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Email" label="Email" value={email} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Password" label="Password" value={password} secure={true} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Password Confirmation" label="Password Confirmation" value={passwordConfirmation} secure={true} onChangeText={this.onChangeText} />
        <PhotosCropper image={profile_img.uri} width={profile_img.width} height={profile_img.height} updateCropData={this.updateCropData} setImage={this.setImage}/>
        <Error error={this.state.error} />
        <Button onPress={() => this.submit()} content="Register" />
        <Button onPress={() => history.push("/")} content="Sign In" />
      </View>
    );
  }
}

function mapStateToProps(state){
  return{

  }
}

export default connect(mapStateToProps, actions)(Register);
