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

  render(){
    const {photos, location} = this.props;
    const {city, title, id} = location;
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
        <ReviewsNew />
        <ReviewStream />
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
