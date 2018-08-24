import React, {Component} from "react" ;
import {View, Text, Image, TouchableWithoutFeedback} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from '../../history';

import Button from "../widgets/button";

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
    const {img_url, caption, views, display, profile_img, location_title} = this.props;
    return(
      <View>
        <Image source={{uri: img_url.url}} style={{maxWidth: "100%", height: 200}}/>
        <TouchableWithoutFeedback onPress={() => this.goToUser()}>
          <View>
            <Image source={{uri: profile_img.url }} style={{width: 20, height: 20, borderRadius: 10, overflow: "hidden"}}/>
            <Text>{display}</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text> - {caption} - {views} Views</Text>
        <TouchableWithoutFeedback onPress={() => this.goToLocation()}>
          <View>
            <Text>{location_title}</Text>
          </View>
        </TouchableWithoutFeedback>
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
