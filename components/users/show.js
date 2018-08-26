import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";

import Button from "../widgets/button";
import PhotoGrid from "../photos/grid";
import UsersHeader from "./header";

class UsersShow extends Component {
  render(){
    const {profile_img, email, display, photos, id, zoom, height, width, offsetX, offsetY} = this.props;

    const mapedPhotos = photos ? photos.map((p) => {
      return {
        ...p,
        user_display: display,
        img_url: p.img_url.url,
        user_profile: profile_img.url,
        email,
        user_id: id,
        user_zoom: zoom,
        user_width: width,
        user_height: height,
        user_offsetX: offsetX,
        user_offsetY: offsetY
      }
    }) : [];

    return(
      <View>
        <UsersHeader profileImg={profile_img.url} display={display} email={email} backgroundPhoto={photos[0].img_url.url} zoom={zoom} width={width} height={height} offsetX={offsetX} offsetY={offsetY}/>
        <PhotoGrid photos={mapedPhotos} />
        <View style={{width: "100%", height: 50}}></View>
      </View>
    );
  }
}

function mapStateToProps(state){
  const {photos, user} = state.users.selectedUser;
  return{
    photos,
    ...user
  }
}

export default connect(mapStateToProps, actions)(UsersShow);
