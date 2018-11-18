import React, {Component} from "react";
import {Text, View} from "react-native";
import {connect} from "react-redux";

import {OFF_WHITE} from "../../styles";
import styles from "../../styles/spinner";
import {BarIndicator} from 'react-native-indicators';

class Spinner extends Component {

  render(){
    if(!this.props.loading){
      return <View></View>;
    }
    return(
      <View style={styles.spinnerMask}>
        <BarIndicator color={OFF_WHITE} size={100}/>
      </View>
    );
  }

}

function mapStateToProps(state){
  return{
    ...state.loading
  }
}

export default connect(mapStateToProps, null)(Spinner);
