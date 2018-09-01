import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";
import {fullAddress} from "../../helpers/locations";
import {ShowIfMine} from "../../helpers/locations"
import baseStyles from "../../styles";
import reviewStyles from "../../styles/review";
import photoTitleStyles from "../../styles/photoTitle";

import Button from "../widgets/button";
import PhotoGrid from "../photos/grid";
import ProfileImage from "../users/profileImage";

class LocationsShow extends Component {

  visitUser = (id) => {
    this.props.setLoading(true);
    this.props.getUser(id, () => this.success(id), (e) =>  this.props.setLoading(false));
  }

  success = (id) => {
    this.props.setLoading(false);
    history.push("/users/show/"+id);
  }

  render(){
    const {photos, location, reviews} = this.props;
    const {city, title, id} = location;
    const averageScore = reviews[0] ? reviews.reduce((average, r) => {
      return average + (r.score/reviews.length);
    }, 0) : "There are currently no reviews.";
    console.log("Avg Score", averageScore);
    return(
      <View>
        <View style={photoTitleStyles.container}>
          <Image
            style={photoTitleStyles.image}
            source={{uri: photos[0] ? photos[0].img_url : 'https://s3-us-west-2.amazonaws.com/staticgeofocus/john-westrock-638048-unsplash.jpg'}}
          />
          <View style={photoTitleStyles.mask}>
            <Text style={photoTitleStyles.title}>{title}</Text>
          </View>
        </View>
        <Text style={[baseStyles.p, { marginTop: 10}]}>{fullAddress(location)}</Text>
        <ShowIfMine>
          <Button content="Edit Location" onPress={() => history.push(`/locations/${id}/update`)}/>
        </ShowIfMine>
        <PhotoGrid photos={photos} />
        <View style={{height: 20}}></View>
        <Text style={baseStyles.h1}>Average Score: {averageScore}</Text>
        <View style={{height: 20}}></View>
        {reviews.map((r, i) => {
          const {score, message, id, user_display, user_profile, user_offsetX, user_offsetY, user_width, user_height, user_zoom, user_id} = r;
          return(
            <View key={i} style={reviewStyles.review}>
              <View style={reviewStyles.headerWrapper}>
                <TouchableOpacity onPress={() => this.visitUser(user_id)}>
                  <View style={reviewStyles.profileWrapper}>
                    <ProfileImage url={user_profile} size={40} offsetX={user_offsetX} offsetY={user_offsetY} width={user_width} height={user_height} zoom={user_zoom}/>
                    <Text style={reviewStyles.profileText}>{user_display}</Text>
                  </View>
                </TouchableOpacity>
                <Text style={reviewStyles.scoreText}>{score}</Text>
              </View>
              <Text style={baseStyles.p}>{message}</Text>
            </View>
          )
        })}
        <Button content="Go Home" onPress={() => history.push("/locations")}/>
        <View style={{height: 20}}></View>
      </View>
    );
  }
}

function mapStateToProps(state){
  const {location} = state.locations;
  return{
    ...location
  }
}

export default connect(mapStateToProps, actions)(LocationsShow);
