import {StyleSheet} from "react-native";

import {OFF_WHITE, PRIMARY_COLOR, MAIN_FONT, SECONDARY_FONT} from "./variables";

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
    ...titleText,
    fontFamily: MAIN_FONT
  },
  lighter: {
    fontWeight: "200",
    ...titleText,
    fontFamily: SECONDARY_FONT
  },
  textWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 44,
    height: 50,
    marginRight: 5
  }
});

export default titleBarStyles;
