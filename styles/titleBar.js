import {StyleSheet} from "react-native";

import {OFF_WHITE, PRIMARY_COLOR} from "./variables";

const titleText = {
  color: OFF_WHITE,
  fontSize: 40
}

const titleBarStyles = StyleSheet.create({
  titleBar: {
    backgroundColor: PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
    flexBasis: 100
  },
  bolded: {
    fontWeight: "700",
    ...titleText
  },
  lighter: {
    fontWeight: "200",
    ...titleText
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default titleBarStyles;
