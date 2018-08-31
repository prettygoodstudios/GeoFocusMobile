import {StyleSheet} from "react-native";
import {OFF_WHITE} from "./variables";

const photoTitleStyles = StyleSheet.create({
  container: {
    height: 300,
    marginLeft: -20,
    marginRight: -20,
    marginTop: -20,
    position: "relative",
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5
  },
  title: {
    color: OFF_WHITE,
    fontSize: 50,
    textAlign: "center"
  },
  mask: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: 300,
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.3)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    minWidth: "100%",
    minHeight: "100%"
  }
});

export default photoTitleStyles;
