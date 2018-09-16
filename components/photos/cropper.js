import React, {Component} from "react";
import {View, Text, TouchableOpacity, Image, PanResponder} from "react-native";
import {ImagePicker, Permissions} from 'expo';
import {connect} from "react-redux";

import * as actions from "../../actions";

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
      zoom: 1,
      gestures: true,
      touched: false
    }

    this.panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
          // The gesture has started. Show visual feedback so the user knows
          // what is happening!

          // gestureState.d{x,y} will be set to zero now
          this.props.setScroll(false);
          if(!this.state.touched){
            this.setState({
              touched: true
            });
          }
        },
        onPanResponderMove: (evt, gestureState) => {
          // The most recent move distance is gestureState.move{X,Y}

          // The accumulated gesture distance since becoming responder is
          // gestureState.d{x,y}
          if(this.state.gestures){
            if(gestureState.numberActiveTouches == 1){
              this.panX(gestureState.vx*100);
              this.panY(gestureState.vy*100);
            }else{
              this.zoom(gestureState.vx);
            }
          }
          if(evt){
            const {touches, changedTouches} = evt;
            console.log("event", evt.touches);
            if(touches){
              let deltaTouches = [];
              changedTouches.forEach((t) => {
                console.log("Touch",t);
              });
            }
          }
        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded
          this.props.setScroll(true);
        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        },
      });
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
    const realWidth = width*zoom;
    const realHeight = height*zoom;
    const positionX = marginLeft/realWidth;
    const positionY = marginTop/realHeight;
    const relativeSizeX = 300/realWidth;
    const relativeSizeY = 300/realHeight;
    const centerX = positionX + relativeSizeX*0.5;
    const centerY = positionY + relativeSizeY*0.5;
    const newZoom = zoom + delta;
    const newX = centerX*newZoom*width-(relativeSizeX*0.5*newZoom*width);
    const newY = centerY*newZoom*height-(relativeSizeY*0.5*newZoom*height);
    if(newZoom >= 0 && newX + width*newZoom > 300 && newY + height*newZoom > 300 && newX <= 0 && newY <= 0){
      this.setState({
        zoom: newZoom,
        marginLeft: newX,
        marginTop: newY
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

  toggleGestures = () => {
    this.setState({
      gestures: this.state.gestures ? false : true
    });
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

    const wholeRatio = (200/width);
    const zoomRatio = (1/zoom);
    const selectedSize = wholeRatio*300*zoomRatio;

    const wholeImageStyle = {
      width: 200,
      height: wholeRatio*height
    }

    const selectedArea = {
      width: selectedSize,
      height: selectedSize,
      marginLeft: -wholeRatio*marginLeft*zoomRatio,
      marginTop: -wholeRatio*marginTop*zoomRatio
    }

    return (
      <View style={cropperStyles.cropperWrapper}>
        {image &&
          <View style={cropperStyles.images}>
            <View style={cropperStyles.imageWrapper} {...this.panResponder.panHandlers} >
              <Image source={{uri: image}} style={[cropperStyles.image, imageStyle]}/>
              <View style={!this.state.touched ? cropperStyles.info : {display: "none"}}>
                <Text style={!this.state.touched ? cropperStyles.infoText : {display: "none"}}>Drag one finger to pan and two to zoom.</Text>
              </View>
            </View>
            { /*
            <View style={cropperStyles.cropperOptionWrapper}>
              <CropperOption content="^" onPress={() => this.panY(-10)}/>
              <CropperOption content="\/" onPress={() => this.panY(10)}/>
              <CropperOption content="<" onPress={() => this.panX(-10)}/>
              <CropperOption content=">" onPress={() => this.panX(10)}/>
              <CropperOption content="+" onPress={() => this.zoom(0.1)}/>
              <CropperOption content="-" onPress={() => this.zoom(-0.1)}/>
            </View>
            */
            }
            <View style={[cropperStyles.wholeImageWrapper, wholeImageStyle]}>
              <Image source={{uri: image}} style={[cropperStyles.wholeImage, wholeImageStyle]}/>
              <View style={[cropperStyles.selectedArea, selectedArea]}></View>
            </View>
          </View>
        }
        <Button content="Select Photo" onPress={() => this.pickImage()}/>
      </View>
    );
  }
}

export default connect(null, actions)(PhotosCropper);
