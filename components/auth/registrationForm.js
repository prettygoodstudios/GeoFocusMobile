import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";

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
      bio: "",
      error: "",
      cropData: {},
      profile_img: {}
    }
  }

  componentDidMount(){
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
    this.setState({
      cropData: data
    });
  }

  render(){
    const {profile_img, email, password, passwordConfirmation, displayName, bio} = this.state;
    return(
      <View>
        <FormTitle title="Register" />
        <FormGroup placeholder="Display Name" label="Display Name" value={displayName} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Bio" label="Bio" value={bio} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Email" label="Email" value={email} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Password" label="Password" value={password} secure={true} onChangeText={this.onChangeText} />
        <FormGroup placeholder="Password Confirmation" label="Password Confirmation" value={passwordConfirmation} secure={true} onChangeText={this.onChangeText} />
        <PhotosCropper image={profile_img.uri} width={profile_img.width} height={profile_img.height} updateCropData={this.updateCropData} setImage={this.setImage}/>
        <Error error={this.state.error} />
        <Button onPress={() => this.props.submit(this.state)} content="Register" />
        {this.props.create && <Button onPress={() => history.push("/")} content="Sign In" />}
        <View style={{height: 50}}></View>
      </View>
    );
  }
}

export default connect(null, actions)(RegistrationForm);
