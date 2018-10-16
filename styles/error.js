import {StyleSheet} from "react-native";
import {PRIMARY_COLOR, SECONDARY_COLOR, OFF_WHITE, MAIN_FONT} from "./variables";

const errorStyles = StyleSheet.create({
  errorBubble: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 50,
    padding: 20,
    marginTop: 20,
    marginBottom: 20
  },
  errorText: {
    color: OFF_WHITE,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: MAIN_FONT
  }
});

export default errorStyles;
