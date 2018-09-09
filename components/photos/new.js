import React, {Component} from "react";
import {View, Text, Image} from "react-native";
import {ImagePicker, ImageManipulator, Permissions} from "expo";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";
import baseStyles from "../../styles";

import FormGroup from "../form/group";
import Button from "../widgets/button";
import Error from "../widgets/error";
import PhotosCropper from "./cropper";

class PhotosNew extends Component {
  constructor(){
    super();
    this.state = {
      caption: "",
      image: {},
      error: "",
      cropData: {}
    }
  }

  onChangeText = (l, t) => {
    let tempState = {}
    tempState[l.toLowerCase()] = t;
    this.setState({
      ...tempState
    });
  }

  setImage = (image) => {
    this.setState({ image });
  }

  submit = () => {
    this.props.setLoading(true);
    const {location, user} = this.props;
    const {image, caption, cropData} = this.state;
    const name = image.uri.split("/")[image.uri.split("/").length-1].split(".")[0];
    const fileType = image.uri.split(".")[image.uri.split(".").length - 1];

    let formData = new FormData();
    formData.append('caption', caption);
    formData.append('email', user.email);
    formData.append('token', user.authentication_token);
    formData.append('location', location.id);
    formData.append('offsetX', cropData.marginLeft);
    formData.append('offsetY', cropData.marginTop);
    formData.append('zoom', cropData.zoom);
    formData.append('img_url', {
      uri: image.uri,
      name: `${name}.${fileType}`,
      type: `image/${fileType}`,
    });
    console.log("My Image URl", {
      uri: image.uri,
      name: `${name}.${fileType}`,
      type: `image/${fileType}`,
    });
    this.props.uploadPhoto(formData, this.success, this.error);
  }

  success = (id) => {
    this.props.setLoading(false);
    history.push(`/photos/${id}`);
  }

  error = (e) => {
    console.log("My Error",e);
    this.props.setLoading(false);
    this.setState({
      error: e
    });
  }

  updateCropData = (data) => {
    console.log("My Crop Data",data);
    this.setState({
      cropData: data
    });
  }

  render(){
    const {caption, image} = this.state;
    return(
      <View>
        <Text style={baseStyles.h1}>Upload a Photo</Text>
        <FormGroup placeholder="Caption" label="Caption" value={caption} onChangeText={this.onChangeText} />
        <PhotosCropper image={image.uri} width={image.width} height={image.height} updateCropData={this.updateCropData} setImage={this.setImage}/>}
        <Error error={this.state.error} />
        <Button content="Upload" onPress={() => this.submit()}/>
        <View style={{height: 50}}></View>
      </View>
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

export default connect(mapStateToProps, actions)(PhotosNew);
