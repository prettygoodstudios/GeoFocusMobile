import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";
import {fullAddress} from "../../helpers/locations";
import {ShowIfMine} from "../../helpers/locations"
import baseStyles from "../../styles";
import photoTitleStyles from "../../styles/photoTitle";

import Button from "../widgets/button";
import PhotoGrid from "../photos/grid";
import ReviewStream from "../reviews/stream";
import ReviewsNew from "../reviews/new";

class LocationsShow extends Component {

  componentDidMount(){
    this.props.setPadding(0);
  }

  componentWillUnmount(){
    this.props.setPadding(20);
  }

  render(){
    const {photos, location, user} = this.props;
    const {city, title, id} = location;
    return(
      <View>
        <View style={photoTitleStyles.container}>
          <View style={photoTitleStyles.imageHolder}>
            <Image
              style={photoTitleStyles.image}
              source={{uri: photos[0] ? photos[0].img_url : 'https://s3-us-west-2.amazonaws.com/staticgeofocus/john-westrock-638048-unsplash.jpg'}}
            />
          </View>
          <View style={photoTitleStyles.mask}>
            <Text style={photoTitleStyles.title}>{title}</Text>
          </View>
        </View>
        <View style={{padding: 20}}>
          <Text style={[baseStyles.p, { marginTop: 10}]}>{fullAddress(location)}</Text>
          <ShowIfMine>
            <Button content="Edit Location" onPress={() => history.push(`/locations/${id}/update`)}/>
          </ShowIfMine>
          { user.verified ?
            <Button content="Add Photo" onPress={() => history.push(`/photos/new/upload`)}/>
            :
            <Text style={[baseStyles.p, {marginBottom: 10}]}>You must verify your email in order to upload photos to this location.</Text>
          }
          <PhotoGrid photos={photos} />
          <View style={{height: 20}}></View>
          <ReviewsNew />
          <ReviewStream />
          <Button content="Go Home" onPress={() => history.push("/locations")}/>
          <View style={{height: 20}}></View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state){
  const {location} = state.locations;
  const {user} = state.auth;
  return{
    ...location,
    user
  }
}

export default connect(mapStateToProps, actions)(LocationsShow);
