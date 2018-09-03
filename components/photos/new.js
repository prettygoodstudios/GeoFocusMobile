import React, {Component} from "react";
import {View, Text} from "react-native";
import {ImagePicker, Permissions} from "expo";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";
import baseStyles from "../../styles";

import FormGroup from "../form/group";
import Button from "../widgets/button";

class PhotosNew extends Component {
  constructor(){
    super();
    this.state = {
      caption: "",
      image: ""
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


  onChangeText = (l, t) => {
    let tempState = {}
    tempState[l.toLowerCase()] = t;
    this.setState({
      ...tempState
    });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      base64: true
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render(){
    const {caption} = this.state;
    return(
      <View>
        <Text style={baseStyles.h1}>Upload a Photo</Text>
        <FormGroup placeholder="Caption" label="Caption" value={caption} onChangeText={this.onChangeText} />
        <Button content="Select Photo" onPress={() => this.pickImage()}/>
      </View>
    );
  }
}

function mapStateToProps(state){
  return{

  }
}

export default connect(mapStateToProps, actions)(PhotosNew);
