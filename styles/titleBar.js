import {StyleSheet} from "react-native";

import {OFF_WHITE, PRIMARY_COLOR, MAIN_FONT, SECONDARY_FONT} from "./variables";

const titleText = {
  color: OFF_WHITE,
  fontSize: 30
}

const titleBarStyles = StyleSheet.create({
  titleBar: {
    backgroundColor: PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "space-between",
    flexBasis: 100,
    height: 100,
    flexDirection: "row",
    padding: 10
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
  titleSection: {
    marginTop: 25
  },
  textWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
  },
  logo: {
    width: 45,
    height: 50,
    marginRight: 5
  },
  searchWrapper: {
    marginTop: 30
  },
  searchIcon: {
    fontSize: 40,
    fontWeight: "700",
    color: OFF_WHITE
  },
  searchBarInput: {
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: "transparent",
    borderBottomWidth: 5,
    borderBottomColor: OFF_WHITE,
    color: OFF_WHITE,
    fontSize: 30,
    height: 50,
    width: "80%"
  },
  searchBarWrapper: {
    marginTop: 40,
    height: 75,
    width: "80%"
  },
  results: {
    width: "100%",
    height: 50,
    backgroundColor: OFF_WHITE,
    paddingLeft: 10,
    paddingTop: 10
  },
  resultsTitle: {
    color: PRIMARY_COLOR,
    fontSize: 20
  },
  resultsContainer: {
    position: "absolute",
    top: 100,
    left: 0,
    width: "100%"
  }
});

export default titleBarStyles;
