import {StyleSheet, Dimensions} from "react-native";

import {PRIMARY_COLOR, OFF_WHITE, MAIN_FONT} from "./index";

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  cropperOption: {
    width: 50,
    height: 50,
    backgroundColor: PRIMARY_COLOR,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  cropperOptionText: {
    color: OFF_WHITE,
    fontSize: 40,
    fontFamily: MAIN_FONT
  },
  cropperOptionWrapper: {
    display: "flex",
    flexDirection: "row",
    flex: 2,
    marginBottom: 30
  },
  image: {

  },
  imageWrapper: {
    width: 300,
    height: 300,
    backgroundColor: OFF_WHITE,
    overflow: "hidden",
    position: "relative"
  },
  info:{
    width: 300,
    height: 300,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  profileCutOut: {
    top: -100,
    left: -100,
    width: 500,
    height: 500,
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "rgba(0,0,0,0.8)",
    borderRadius: 250,
    borderWidth: 100,
  },
  infoText: {
    color: OFF_WHITE,
    fontSize: 30,
    textAlign: "center",
    fontFamily: MAIN_FONT
  },
  cropperWrapper: {
    display: "flex",
    flexDirection: "column"
  },
  images:{
    display: "flex",
    flexDirection: "column"
  },
  wholeImage: {

  },
  wholeImageWrapper: {

  },
  selectedArea:{
    position: "absolute",
    backgroundColor: "transparent",
    borderColor: PRIMARY_COLOR,
    borderWidth: 2
  }
});

export default styles;
