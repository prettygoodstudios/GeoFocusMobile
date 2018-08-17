import {StyleSheet} from "react-native";
import {OFF_WHITE, PRIMARY_COLOR} from "./variables";

const photoCardStyles = StyleSheet.create({
  container: {
    flex: 3,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap"
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
    overflow: "hidden",
    marginTop: 50,
    marginBottom: 100
  },
  cardText: {
    color: OFF_WHITE,
    opacity: 1,
    zIndex: 99999
  },
  selected: {
    backgroundColor: PRIMARY_COLOR,
    opacity: 0.5,
    width: "100%",
    height: "100%",
    zIndex: 999,
    position: "absolute",
    top: 50,
    left: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default photoCardStyles;
