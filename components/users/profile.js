import React, {Component} from "react";
import {View, Text, Image, AsyncStorage} from "react-native";
import {Icon} from "react-native-elements";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";
import {USER} from "../../storageKeys";
import baseStyles from "../../styles";

import Button from "../widgets/button";
import PhotoGrid from "../photos/photoGrid";
import UsersHeader from "./header";

class Profile extends Component {

  constructor(){
    super();
    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    this.props.setLoading(true);
    this.props.getUser(this.props.id, this.success, this.error);
  }

  success = () => {
    this.props.setLoading(false);
    this.setState({loading: false});
  }

  error = (e) => {
    console.log(e);
    this.props.setLoading(false);
    this.setState({loading: false});
  }

  logOut = () => {
    this.clearData();
  }

  clearData = async () => {
    history.push("/");
    AsyncStorage.removeItem(USER);
  }

  render(){
    const {display, profile_img, email, user_id, photos, loading} = this.props;

    const mapedPhotos = photos ? photos.map((p) => {
      return {
        ...p,
        display,
        img_url: p.img_url.url,
        user_profile: profile_img.url,
        email,
        user_id
      }
    }) : [];

    return(

      <View>
        { !this.state.loading &&
          <UsersHeader profileImg={profile_img.url} display={display} email={email} backgroundPhoto={photos[0].img_url.url}/>
        }
        <Button content="Log Out" onPress={() => this.logOut()} />
        <PhotoGrid photos={mapedPhotos} />
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
