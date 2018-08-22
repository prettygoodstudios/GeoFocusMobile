import {StyleSheet} from "react-native";

import {OFF_WHITE, PRIMARY_COLOR} from "./variables";

const navStyles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    height: "10%",
    width: "100%",
    flex: 2,
    flexDirection: "row"
  },
  option: {
    flex: 2,
    flexBasis: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    width: "100%"
  },
  icon: {
    color: OFF_WHITE,
    fontSize: 50
  }
});

export default navStyles;
