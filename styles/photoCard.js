import {StyleSheet} from "react-native";
import hexRgb from "hex-rgb";

import {OFF_WHITE, PRIMARY_COLOR} from "./variables";

const photoCardStyles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 0
  },
  card: {
    flex: 1,
    flexBasis: "30%",
    height: 200,
    margin: 5,
    position: "relative"
  },
  cardImageWrapper: {
    height: 200,
    width: "100%",
    overflow: "hidden"
  },
  cardText: {
    color: OFF_WHITE,
    opacity: 1,
    zIndex: 99999
  },
  selected: {
    backgroundColor: `rgba(144, 19, 254, 0.5)`,
    width: "100%",
    height: "100%",
    zIndex: 999,
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default photoCardStyles;
