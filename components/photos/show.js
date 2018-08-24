import React, {Component} from "react" ;
import {View, Text, Image} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";

import Button from "../widgets/button";

class PhotosShow extends Component {

  render(){
    const {img_url, caption, views, display} = this.props;
    return(
      <View>
        <Image source={{uri: img_url.url}} style={{maxWidth: "100%", height: 200}}/>
        <Text>{display} - {caption} - {views} Views</Text>
      </View>
    );
  }
}

function mapStateToProps(state){
  const {photo, user} = state.photos.photo;
  return{
    ...photo,
    ...user
  }
}

export default connect(mapStateToProps, actions)(PhotosShow);
