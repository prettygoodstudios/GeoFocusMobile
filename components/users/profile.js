import React, {Component} from "react";
import {View, Text, Image, AsyncStorage} from "react-native";
import {Icon} from "react-native-elements";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";
import {USER} from "../../storageKeys";
import baseStyles from "../../styles";

import Button from "../widgets/button";
import Error from "../widgets/error";
import PhotoGrid from "../photos/grid";
import UsersHeader from "./header";

class Profile extends Component {

  constructor(){
    super();
    this.state = {
      loading: true,
      error: ""
    }
  }

  componentDidMount(){
    this.props.setLoading(true);
    this.props.getUser(this.props.id, this.success, this.error);
    this.props.setPadding(0);
  }

  componentWillUnmount(){
    this.props.setPadding(20);
  }

  success = () => {
    this.props.setLoading(false);
    this.setState({loading: false});
  }

  error = (e) => {
    this.props.setLoading(false);
    this.setState({
      loading: false,
      error: e
    });
  }

  logOut = () => {
    this.clearData();
    this.props.setResults([]);
    this.props.setSearching(false);
    this.props.clearUser();
    history.push("/");
  }

  clearData = async () => {
    AsyncStorage.removeItem(USER);
  }

  render(){
    const {display, profile_img, email, user_id, photos, loading, zoom, height, width, offsetX, offsetY, bio} = this.props;
    const {error} = this.state;
    const mapedPhotos = photos ? photos.map((p) => {
      return {
        ...p,
        user_display: display,
        img_url: p.img_url.url,
        user_profile: profile_img.url,
        email,
        user_id,
        user_zoom: zoom,
        user_width: width,
        user_height: height,
        user_offsetX: offsetX,
        user_offsetY: offsetY
      }
    }) : [];

    return(

      <View>
        { !this.state.loading &&
          <UsersHeader profileImg={profile_img ? profile_img.url : ""} display={display} email={email} bio={bio} backgroundPhoto={ photos[0] ? photos[0].img_url.url : "https://s3-us-west-2.amazonaws.com/staticgeofocus/john-westrock-638048-unsplash.jpg"} zoom={zoom} width={width} height={height} offsetX={offsetX} offsetY={offsetY}/>
        }
        <View style={{padding: 20}}>
          <Button content="Log Out" onPress={() => this.logOut()} />
          <Button content="Edit Profile" onPress={() => history.push("/users/edit")} />
          <Error error={error}/>
          { !this.state.loading && <PhotoGrid photos={mapedPhotos} /> }
          <View style={{width: "100%", height: 50}}></View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state){
  //const {user} = state.auth;
  const {photos, user} = state.users.selectedUser;
  const {id} = state.auth.user;
  return{
    photos,
    ...user,
    id
  }
}

export default connect(mapStateToProps , actions)(Profile);
