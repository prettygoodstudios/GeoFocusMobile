import React, {Component} from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import {ImagePicker, Permissions} from 'expo';

import Button from "../widgets/button";

import cropperStyles from "../../styles/cropper";

const CropperOption = (props) => {
  const {onPress, content} = props;
  return(
    <TouchableOpacity onPress={() => onPress()}>
      <View style={cropperStyles.cropperOption}>
        <Text style={cropperStyles.cropperOptionText}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
}

class PhotosCropper extends Component {

  constructor(){
    super();
    this.state = {
      marginLeft: 0,
      marginTop: 0,
      zoom: 1
    }
  }

  componentDidMount(){
    this.getCameraRollPermissions();
  }

  getCameraRollPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('The camera roll permissions are required inorder to upload a photo.');
      history.push("/locations");
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true
    });
    if (!result.cancelled) {
      this.props.setImage(result);
      this.clearData();
    }
  };

  panX = (delta) => {
    const {marginLeft, zoom} = this.state;
    const {width} = this.props;
    if(marginLeft + delta <= 0 && marginLeft + width*zoom > 300 - delta){
      this.setState({
        marginLeft: marginLeft + delta
      });
      this.cropData();
    }
  }

  panY = (delta) => {
    const {marginTop, zoom} = this.state;
    const {height} = this.props;
    if(marginTop + delta <= 0 && marginTop + height*zoom > 300 - delta){
      this.setState({
        marginTop: this.state.marginTop + delta
      });
      this.cropData();
    }
  }

  zoom = (delta) => {
    const {marginLeft, marginTop, zoom} = this.state;
    const {width, height} = this.props;
    if(zoom + delta >= 0 && marginLeft + width*(zoom+delta) > 300 && marginTop + height*(zoom+delta) > 300){
      this.setState({
        zoom: zoom + delta
      });
    }
    this.cropData();
  }

  clearData = () => {
    this.setState({
      marginLeft: 0,
      marginTop: 0,
      zoom: 1
    });
    this.cropData();
  }

  cropData = () => {
    const {marginLeft, marginTop, zoom} = this.state;
    const {updateCropData} = this.props;
    const scaleRatio = 400/300;
    const finalLeft = marginLeft*scaleRatio;
    const finalTop = marginTop*scaleRatio;
    const finalZoom = zoom*scaleRatio;
    const data =  {
      marginLeft: finalLeft,
      marginTop: finalTop,
      zoom: finalZoom
    }
    updateCropData(data);
  }

  render(){
    const {image, width, height} = this.props;
    const {marginLeft, marginTop, zoom} = this.state;
    const imageStyle = {
      marginLeft,
      marginTop,
      width: width*zoom,
      height: height*zoom
    }

    return (
      <View style={cropperStyles.cropperWrapper}>
        {image &&
          <View>
            <View style={cropperStyles.imageWrapper}>
              <Image source={{uri: image}} style={[cropperStyles.image, imageStyle]}/>
            </View>
            <View style={cropperStyles.cropperOptionWrapper}>
              <CropperOption content="^" onPress={() => this.panY(-10)}/>
              <CropperOption content="\/" onPress={() => this.panY(10)}/>
              <CropperOption content="<" onPress={() => this.panX(-10)}/>
              <CropperOption content=">" onPress={() => this.panX(10)}/>
              <CropperOption content="+" onPress={() => this.zoom(0.1)}/>
              <CropperOption content="-" onPress={() => this.zoom(-0.1)}/>
            </View>
          </View>
        }
        <Button content="Select Photo" onPress={() => this.pickImage()}/>
      </View>
    );
  }
}

export default PhotosCropper;
