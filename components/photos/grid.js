import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions} from "react-native";
import {connect} from "react-redux";
import { Viewport } from '@skele/components';

import * as actions from "../../actions";
import history from '../../history';
import photoCardStyles from "../../styles/photoCard";
import baseStyles from "../../styles";

import Button from "../widgets/button";
import ProfileImage from "../users/profileImage";


const {height, width} = Dimensions.get('window');
const cardHeight = Math.floor((width-52)/3);
const scaleRatio = cardHeight/400;


const PhotoCard = (props) => {
    const {caption, img_url, offsetX, offsetY, width, views, height, zoom, user_id, user_display, user_profile, id, user_zoom, user_width, user_height, user_offsetX, user_offsetY, i, setSelected, selected} = props;
    const finalWidth = zoom != null ? Math.ceil(width*zoom*scaleRatio) : Math.ceil(width*scaleRatio);
    const finalHeight = zoom != null ? Math.ceil(height*zoom*scaleRatio) : Math.ceil(height*scaleRatio);
    const finalOffsetX = offsetX != null ? Math.ceil(offsetX*scaleRatio) : 0;
    const finalOffsetY = offsetY != null ? Math.ceil(offsetY*scaleRatio) : 0;
    return(
      <TouchableWithoutFeedback onPress={() => setSelected(i)}>
        <View style={photoCardStyles.card}>
          <View style={photoCardStyles.cardImageWrapper}>
            <Image
              style={finalWidth != 0 ? {position: "absolute", height: finalHeight, width: finalWidth, left: finalOffsetX, top: finalOffsetY} : { minWidth: "100%", minHeight: cardHeight}}
              source={{uri: img_url}}
            />
          </View>
          <View style={selected == i ? photoCardStyles.selected : {display: "none"}}>
            <Text style={photoCardStyles.cardText}>{caption}</Text>
            <Text style={photoCardStyles.cardText}>{views} Views</Text>
            <TouchableOpacity  onPress={() => this.visitUser(user_id)}>
              <View style={photoCardStyles.profileGroup}>
                <ProfileImage url={user_profile} size={25} zoom={user_zoom} width={user_width} height={user_height} offsetX={user_offsetX} offsetY={user_offsetY} />
                <Text style={photoCardStyles.profileText}>{user_display}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.showPhoto(id)}>
              <View style={photoCardStyles.viewImage}>
                <Text style={photoCardStyles.cardText}>View Image</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
}

const PlaceHolder = () => {
  return (
    <View style={photoCardStyles.placeholder}></View>
  );
}

const ViewportAwarePhotoCard = Viewport.Aware(Viewport.WithPlaceholder(PhotoCard, PlaceHolder));

class PhotoGrid extends Component{
  constructor(){
    super();
    this.state = {
      selected: -1
    }
  }

  visitUser = (id) => {
    this.props.getUser(id, () => this.success(id), (e) =>  console.log("Error", e));
  }

  success = (id) => {
    history.push("/users/show/"+id);
  }

  showPhoto = (id) => {
    this.props.getPhoto(id, () => history.push("/photos/"+id), () => console.log("Error", e));
  }

  setSelected = (i) => {
    this.setState({
      selected: i == this.state.selected ? -1 : i
    });
  }

  render(){
    const {photos} = this.props;
    if(photos.length == 0){
      return <Text style={baseStyles.h1}>No Photos Available</Text>;
    }
    return(
      <View style={photoCardStyles.container}>
        { photos.map((p, i) => {
            const {caption, img_url, offsetX, offsetY, width, views, height, zoom, user_id, user_display, user_profile, id, user_zoom, user_width, user_height, user_offsetX, user_offsetY} = p;
            return(
              <ViewportAwarePhotoCard {...p} setSelected={this.setSelected} selected={this.state.selected} key={i} i={i} preTriggerRatio={0.5}/>
            );
          })
        }
      </View>
    );
  }
}

export default connect(null, actions)(PhotoGrid);
