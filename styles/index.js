import {StyleSheet} from "react-native";

import {MAIN_FONT, SECONDARY_FONT, PRIMARY_COLOR, SECONDARY_COLOR, OFF_WHITE} from "./variables";

const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    fontWeight: "700",
    fontFamily: MAIN_FONT
  },
  p: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: MAIN_FONT
  },
  body: {
    flex: 1
  },
  center: {
    flexDirection: "row",
    justifyContent: "center"
  },
  container: {
    padding: 20,
    flexBasis: "80%"
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    height: 50,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 25,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: OFF_WHITE,
    fontSize: 30,
    fontFamily: MAIN_FONT
  }
});

export default styles;
export {MAIN_FONT, SECONDARY_FONT, PRIMARY_COLOR, SECONDARY_COLOR, OFF_WHITE} ;
