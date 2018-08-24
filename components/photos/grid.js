import React, {Component} from "react";
import {View, Text, Image, TouchableWithoutFeedback} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from '../../history';
import photoCardStyles from "../../styles/photoCard";
import baseStyles from "../../styles";

import Button from "../widgets/button";

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

  render(){
    const {photos} = this.props;
    if(photos.length == 0){
      return <Text style={baseStyles.h1}>No Photos Available</Text>;
    }
    return(
      <View style={photoCardStyles.container}>
        {photos.map((p, i) => {
          const {caption, img_url, offsetX, offsetY, width, views, height, zoom, user_id, user_display, user_profile, id} = p;
          return(
            <TouchableWithoutFeedback key={i} onPress={() => this.setState({ selected: this.state.selected == i ? -1 : i })}>
              <View style={photoCardStyles.card}>
                <View style={photoCardStyles.cardImageWrapper}>
                  <Image
                    style={{minWidth: "100%", height: 200}}
                    source={{uri: img_url}}
                  />
                </View>
                <View style={this.state.selected == i ? photoCardStyles.selected : {display: "none"}}>
                  <Text style={photoCardStyles.cardText}>{caption}</Text>
                  <Text style={photoCardStyles.cardText}>{views} Views</Text>
                  <TouchableWithoutFeedback  onPress={() => this.visitUser(user_id)}>
                    <View style={{flexDirection: "row"}}>
                      <Image
                        style={{width: 20, height: 20, borderRadius: 10}}
                        source={{uri: user_profile}}
                      />
                      <Text style={photoCardStyles.cardText}>{user_display}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.showPhoto(id)}>
                    <View>
                      <Text style={photoCardStyles.cardText}>View Image</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </View>
    );
  }
}

export default connect(null, actions)(PhotoGrid);
