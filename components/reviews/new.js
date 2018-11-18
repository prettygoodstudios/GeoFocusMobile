import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import baseStyles from "../../styles";
import reviewStyles from "../../styles/review";

import ReviewsForm from "./form";

class ReviewsNew extends Component {

  render(){

    const {reviews, user} = this.props;

    const averageScore = reviews[0] ? reviews.reduce((average, r) => {
      return average + (r.score/reviews.length);
    }, 0) : -5;

    let canPost = true;
    reviews.forEach((r) => {
      if(r.user_id == user.id){
        canPost = false;
      }
    });

    return(
      <View>
        {averageScore != -5 && <Text style={reviewStyles.averageScore}>Average Review: {averageScore}</Text>}
        {canPost &&
          <View>
            { user.verified ?
              <ReviewsForm submit={this.props.createReview} title="Leave a Review"/>
              :
              <Text style={[baseStyles.p, {marginBottom: 10}]}>You must verify your email in order to leave a review.</Text>
            }
          </View>
        }
      </View>
    );
  }

}

function mapStateToProps(state){
  const {reviews} = state.locations.location;
  const {user} = state.auth;
  return{
    reviews,
    user
  }
}

export default connect(mapStateToProps, actions)(ReviewsNew);
