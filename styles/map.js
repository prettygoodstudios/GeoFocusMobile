import {StyleSheet, Platform, Dimensions} from "react-native";

import {PRIMARY_COLOR} from "./variables";

const {height, width} = Dimensions.get('window');
const mapHeight = height - 150;
const mapWidth = width + 40;

const markerAndroid = {

}
const markerIos = {
  position: "absolute",
  top: -20,
  left: 0
}
const markerPlatform = Platform.OS === 'ios' ? markerIos : markerAndroid;

const styles = StyleSheet.create({
  map: {
    width: mapWidth,
    height: mapHeight,
    margin: -20,
    flex: 1
  },
  marker: {
    width: 50,
    height: 50,
    position: "relative"
  },
  callout: {
    width: 300,
    backgroundColor: "white"
  },
  markerIcon: {
    color: PRIMARY_COLOR,
    fontSize: 50,
    ...markerIos
  },
  createButtonWrapper: {
    position: "absolute",
    top: 0,
    right: 20,
    width: 300
  }
});

export default styles;
