import React, {Component} from "react";
import {View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import {Icon} from "react-native-elements";
import {connect} from "react-redux";

import * as actions from "../../actions";
import styles, {OFF_WHITE} from "../../styles";
import titleBarStyles from "../../styles/titleBar";

const SearchButton = (props) => {
  const {toggle} = props;
  return(
    <TouchableOpacity onPress={() => toggle()}>
      <View style={titleBarStyles.searchWrapper}>
        <Icon name="search" iconStyle={titleBarStyles.searchIcon}/>
      </View>
    </TouchableOpacity>
  );
}

class TitleBar extends Component {

  constructor(){
    super();
    this.state = {

    }
  }

  componentDidMount(){
    this.props.getLocations(this.success, () => console.log("Could Not Connect To Server!"))
  }

  success = () => {
    console.log("Success geting locations");
  }

  toggleSearch = () => {
    const {searching} = this.state;
    this.props.setSearching(searching ? false : true);
    if(searching){
      this.props.setResults([]);
    }
    this.setState({
      searching: searching ? false : true,
      results: []
    });
  }

  updateSearch = (query) => {
    let newResults = this.props.locations.filter((l) => {
      let retVal = false;
      query.split(" ").forEach((w) => {
        if(this.foundInLocation(l, w)){
          retVal = true;
        }
      });
      return retVal;
    });
    if(query == ""){
      newResults = [];
    }
    this.props.setResults(newResults.slice(0,5));
  }

  foundInLocation = (l, w) => {
    const {title, city, state, country} = l;
    return title.toLowerCase().indexOf(w) != -1 || city.toLowerCase().indexOf(w) != -1 || state.toLowerCase().indexOf(w) != -1 || country.toLowerCase().indexOf(w) != -1;
  }

  render(){
    const {activated} = this.props;
    return(
      <View style={titleBarStyles.titleBar}>
        { !activated ?
          <View style={titleBarStyles.titleSection}>
            <View style={titleBarStyles.textWrapper}>
              <Image source={require('../../assets/images/geologo.png')} style={titleBarStyles.logo}/>
              <Text style={titleBarStyles.bolded}>Geo</Text>
              <Text style={titleBarStyles.lighter}>Focus</Text>
            </View>
          </View>
          :
          <View style={titleBarStyles.searchBarWrapper}>
            <TextInput style={titleBarStyles.searchBarInput} placeholder="Search..." underlineColorAndroid="transparent" autoCapitalize="none" onChangeText={(t) => this.updateSearch(t)}/>
          </View>
        }
        <SearchButton toggle={this.toggleSearch}/>
      </View>
    );
  }

}

function mapStateToProps(state) {
  const {locations} = state.locations;
  const {activated} = state.search;
  return{
    locations,
    activated
  }
}

export default connect(mapStateToProps, actions)(TitleBar);
