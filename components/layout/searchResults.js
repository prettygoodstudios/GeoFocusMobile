import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history"
import {getDistanceFromLatLonInKm} from "../../helpers/locations";
import styles, {OFF_WHITE} from "../../styles";
import titleBarStyles from "../../styles/titleBar";


class SearchResults extends Component{

  goToLocation = (id) => {
    history.push(`/locations/${id}`);
    this.props.setSearching(false);
    this.props.setResults([]);
  }


  render(){
    const {results, activated, myLocation} = this.props;
    if(!activated){
      return <View></View>;
    }
    return(
      <View style={[titleBarStyles.resultsContainer]}>
        { results.map((r ,i) => {
          const {title, id, city, state, latitude, longitude} = r;
          const backgroundColor = (i % 2 == 0) ? OFF_WHITE : "#FFFFFF";
          const distance = Math.ceil(getDistanceFromLatLonInKm(latitude, longitude, myLocation.latitude, myLocation.longitude));
          return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.getLocation(id, () => this.goToLocation(id), () => console.log("Failure!"))} key={i}>
              <View style={[titleBarStyles.results, {backgroundColor}]}>
                <Text style={titleBarStyles.resultsTitle}>{title}</Text>
                <Text style={titleBarStyles.resultsAddress}>{city}, {state} - {distance} km</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    );
  }
}

function mapStateToProps(state){
  const {results, activated} = state.search;
  const {myLocation} = state.locations;
  return{
    results,
    activated,
    myLocation
  }
}

export default connect(mapStateToProps, actions)(SearchResults);
