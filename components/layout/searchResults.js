import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {connect} from "react-redux";

import * as actions from "../../actions";
import history from "../../history"
import styles, {OFF_WHITE} from "../../styles";
import titleBarStyles from "../../styles/titleBar";


class SearchResults extends Component{

  goToLocation = (id) => {
    history.push(`/locations/${id}`);
    this.props.setSearching(false);
    this.props.setResults([]);
  }


  render(){
    const {results, activated} = this.props;
    if(!activated){
      return <View></View>;
    }
    return(
      <View style={[titleBarStyles.resultsContainer]}>
        { results.map((r ,i) => {
          const {title, id} = r;
          const backgroundColor = (i % 2 == 0) ? OFF_WHITE : "#FFFFFF";
          return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.getLocation(id, () => this.goToLocation(id), () => console.log("Failure!"))}>
              <View key={i} style={[titleBarStyles.results, {backgroundColor}]}>
                <Text style={titleBarStyles.resultsTitle}>{title}</Text>
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
  return{
    results,
    activated
  }
}

export default connect(mapStateToProps, actions)(SearchResults);
