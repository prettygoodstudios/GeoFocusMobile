import {StyleSheet, Dimensions} from "react-native";
import hexRgb from "hex-rgb";

import {OFF_WHITE, PRIMARY_COLOR} from "./variables";

let {height, width} = Dimensions.get('window');
let cardHeight = Math.floor((width-52)/3);


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
    maxWidth: "33%",
    height: cardHeight,
    margin: 2,
    position: "relative"
  },
  cardImageWrapper: {
    height: cardHeight,
    width: "100%",
    overflow: "hidden",
    position: "relative"
  },
  cardText: {
    color: OFF_WHITE,
    opacity: 1,
    zIndex: 99999,
    textAlign: "center"
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
