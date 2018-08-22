import {StyleSheet} from "react-native";

import {OFF_WHITE, PRIMARY_COLOR} from "./variables";

const navStyles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    height: 50,
    justifyContent: "flex-start",
    width: "100%"
  },
  option: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PRIMARY_COLOR
  },
  icon: {
    color: OFF_WHITE,
    fontSize: 30
  }
});

export default navStyles;
