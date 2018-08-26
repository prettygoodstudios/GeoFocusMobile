import {StyleSheet, Dimensions} from "react-native";

import {OFF_WHITE, PRIMARY_COLOR} from "./variables";

const {height, width} = Dimensions.get('window');


const navStyles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    height: 50,
    justifyContent: "flex-start",
    width: width
  },
  option: {
    width: Math.floor(width/2),
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PRIMARY_COLOR
  },
  icon: {
    color: OFF_WHITE,
    fontSize: 30,
  }
});

export default navStyles;
