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
    const {activated} = this.props;
    this.props.setSearching(activated ? false : true);
    if(activated){
      this.props.setResults([]);
    }
  }

  updateSearch = (query) => {
    let newResults = this.props.locations.filter((l) => {
      let retVal = false;
      query.split(" ").forEach((w) => {
        if(this.foundInLocation(l, w.toLowerCase()) && w != ""){
          retVal = true;
        }
      });
      return retVal;
    });
    newResults = newResults.sort((a, b) =>  {
      return this.locationPoints(a, query) > this.locationPoints(b, query) ? -1 : 1;
    });
    if(query == ""){
      newResults = [];
    }
    this.props.setResults(newResults.slice(0,5));
  }

  foundInLocation = (l, w) => {
    const {title, address, city, state, country} = l;
    return title.toLowerCase().indexOf(w) != -1 || city.toLowerCase().indexOf(w) != -1 || state.toLowerCase().indexOf(w) != -1 || country.toLowerCase().indexOf(w) != -1 || address.toLowerCase().indexOf(w) != -1;
  }

  locationPoints = (l, q) => {
    const {title, address, city, state, country} = l;
    let points = this.aggregatePoints(l, q, [10, 9, 8, 7, 6], 0);
    let t = false;
    let a = false;
    let s = false;
    let c = false;
    let ci = false;

    q.split(" ").forEach((w) => {
      if(w != ""){
        points = this.aggregatePoints(l, w, [5, 4, 3, 2, 1], points);
        if(title.toLowerCase().indexOf(w.toLowerCase()) != -1){
          t = true;
        }
        if(address.toLowerCase().indexOf(w.toLowerCase()) != -1){
          a = true;
        }
        if(city.toLowerCase().indexOf(w.toLowerCase()) != -1){
          ci = true;
        }
        if(state.toLowerCase().indexOf(w.toLowerCase()) != -1){
          s = true;
        }
        if(country.toLowerCase().indexOf(w.toLowerCase()) != -1){
          c = true;
        }
      }
    });

    if(t && a){
      points += 5;
    }
    if(t && a && ci){
      points += 6;
    }
    if(t && a && ci && s){
      points += 7;
    }
    if(t && a && ci && s && c){
      points += 8;
    }
    if(t && ci){
      points += 5;
    }
    if(t && s){
      points += 5;
    }
    if(a && ci){
      points += 5;
    }
    if(a && s){
      points += 5;
    }

    return points;
  }

  aggregatePoints = (l, str, r, p) => {
    const {title, address, city, state, country} = l;
    let points = p;
    const s  = str.toLowerCase();
    if(title.toLowerCase().indexOf(s) != -1){
      points += r[0];
    }
    if(address.toLowerCase().indexOf(s) != -1){
      points += r[1];
    }
    if(city.toLowerCase().indexOf(s) != -1){
      points += r[2];
    }
    if(state.toLowerCase().indexOf(s) != -1){
      points += r[3];
    }
    if(country.toLowerCase().indexOf(s) != -1){
      points += r[4];
    }
    return points;
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
