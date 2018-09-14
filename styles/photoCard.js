import {StyleSheet, Dimensions} from "react-native";
import hexRgb from "hex-rgb";

import {OFF_WHITE, PRIMARY_COLOR} from "./variables";

let {height, width} = Dimensions.get('window');
let containerWidth = width - 36;
let cardHeight = Math.floor((width-48)/3);


const photoCardStyles = StyleSheet.create({
  container: {
    width: containerWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 0,
    marginLeft: -2,
    marginRight: -2
  },
  card: {
    flex: 1,
    flexBasis: "30%",
    maxWidth: cardHeight,
    height: cardHeight,
    margin: 2,
    position: "relative"
  },
  placeholder: {
    flex: 1,
    flexBasis: "30%",
    maxWidth: cardHeight,
    height: cardHeight,
    margin: 2,
    position: "relative",
    backgroundColor: OFF_WHITE
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
  profileGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10
  },
  profileText: {
    fontSize: 15,
    color: OFF_WHITE,
    opacity: 1,
    zIndex: 99999
  },
  viewImage: {
    backgroundColor: PRIMARY_COLOR,
    height: 30,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
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
