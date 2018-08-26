import React, {Component} from "react" ;
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Icon} from "react-native-elements";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from '../../history';
import photoStyles from "../../styles/photo";

import Button from "../widgets/button";
import ProfileImage from "../users/profileImage";

class PhotosShow extends Component {

  goToUser = () => {
    const {user_id} = this.props;
    this.props.getUser(user_id, () => history.push("/users/show/"+user_id), (e) => console.log("Error", e));
  }

  goToLocation = () => {
    const {location_id, location_title} = this.props;
    this.props.getLocation(location_id, () => history.push("/locations/"+location_id, (e) => console.log("Error", e)));
  }

  render(){
    const {img_url, caption, views, display, profile_img, location_title, user_zoom, user_width, user_height, user_offsetX, user_offsetY} = this.props;
    return(
      <View>
        <Image source={{uri: img_url.url}} style={photoStyles.photo}/>
        <View style={photoStyles.textWrapper}>
          <TouchableOpacity onPress={() => this.goToUser()}>
            <View style={photoStyles.profile}>
              <ProfileImage url={profile_img.url} zoom={user_zoom} width={user_width} height={user_height} offsetX={user_offsetX} offsetY={user_offsetY} size={40}/>
              <Text style={photoStyles.profileText}>{display}</Text>
            </View>
          </TouchableOpacity>
          <Text style={photoStyles.caption}> - {caption} - {views} Views - </Text>
          <TouchableOpacity onPress={() => this.goToLocation()}>
            <View style={photoStyles.location}>
              <Icon name="place"  style={photoStyles.locationIcon} />
              <Text style={photoStyles.locationText}>{location_title}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state){
  const {photo, user, location} = state.photos.photo;
  return{
    ...photo,
    ...user,
    location_title: location.title
  }
}

export default connect(mapStateToProps, actions)(PhotosShow);
