import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from '../../history';
import reviewStyles from "../../styles/review";
import baseStyles from "../../styles";

import ProfileImage from "../users/profileImage";

class ReviewStream extends Component {

  visitUser = (id) => {
    this.props.setLoading(true);
    this.props.getUser(id, () => this.success(id), (e) =>  this.props.setLoading(false));
  }

  success = (id) => {
    this.props.setLoading(false);
    history.push("/users/show/"+id);
  }

  render(){
    const {reviews} = this.props;
    return(
      <View>
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
      </View>
    );
  }
}

function mapStateToProps(state){
  const {reviews} = state.locations.location;
  return{
    reviews
  }
}

export default connect(mapStateToProps, actions)(ReviewStream);
