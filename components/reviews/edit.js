import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";

import ReviewsForm from "./form";
import Button from "../widgets/button";

class ReviewsEdit extends Component {
  constructor(){
    super();
    this.state = {
      show: false
    }
  }

  toggleShow = () => {
    this.setState({
      show: this.state.show ? false : true
    });
  }

  success = () => {
    this.setState({
      show: false
    });
  }

  render(){
    const {id, editReview, user, userId, score, message} = this.props;
    const {show} = this.state;
    return(
      <View>
        { user.id == userId &&
          <Button content={show ? "Cancel" : "Edit"} onPress={() => this.toggleShow()}/>
        }
        { show &&
          <ReviewsForm title="Edit Review" submit={editReview} id={id} success={this.success} score={score.toString()} message={message}/>
        }
      </View>
    );
  }
}

function mapStateToProps(state){
  const {user} = state.auth;
  return{
    user
  }
}

export default connect(mapStateToProps, actions)(ReviewsEdit);
