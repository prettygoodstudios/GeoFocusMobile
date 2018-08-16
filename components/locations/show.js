import React, {Component} from "react";
import {View, Text, Image} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history";
import baseStyles from "../../styles";

import Button from "../widgets/button";

class LocationsShow extends Component {
  render(){
    const {photos, location} = this.props;
    const {city} = location;
    return(
      <View>
        <Text style={baseStyles.h1}>{city}</Text>
        <View>
          {photos.map((p, i) => {
            const {caption, img_url, offsetX, offsetY, width, height, zoom, user_id} = p;
            return(
              <View key={i}>
                <Image
                  style={{minWidth: "100%", height: 300}}
                  source={{uri: img_url.url}}
                />
                <Text>{caption}</Text>
              </View>
            )
          })}
        </View>
        <Button content="Go Home" onPress={() => history.push("/locations")}/>
        <View style={{height: 200}}></View>
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
