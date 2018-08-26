import {StyleSheet} from "react-native";
import {OFF_WHITE} from "./variables";

const profileStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 300,
    overflow: "hidden",
    position: "relative"
  },
  headerInfo: {
    zIndex: 9999999999
  },
  headerTitle: {
    fontSize: 40,
    color: OFF_WHITE
  },
  headerEmail: {
    fontSize: 20,
    color: OFF_WHITE
  },
  headerImage: {
    marginLeft: 10,
    marginRight: 10,
    zIndex: 9999999999
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  headerBackgroundImage: {
    top: 0,
    left: 0,
    position: "absolute",
    zIndex: -2,
    width: "100%",
    minHeight: 300
  },
  headerBackgroundMask: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)"
  }
});

export default profileStyles;
