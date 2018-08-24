import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";

import Button from "../widgets/button";
import PhotoGrid from "../photos/grid";
import UsersHeader from "./header";

class UsersShow extends Component {
  render(){
    const {profile_img, email, display, photos, id} = this.props;

    const mapedPhotos = photos ? photos.map((p) => {
      return {
        ...p,
        user_display: display,
        img_url: p.img_url.url,
        user_profile: profile_img.url,
        email,
        user_id: id
      }
    }) : [];

    return(
      <View>
        <UsersHeader profileImg={profile_img.url} display={display} email={email} backgroundPhoto={photos[0].img_url.url}/>
        <PhotoGrid photos={mapedPhotos} />
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
