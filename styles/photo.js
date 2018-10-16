import {StyleSheet} from "react-native";
import {MAIN_FONT} from "./index";

const styles = StyleSheet.create({
  photo: {
    marginBottom: 20,
    width: "100%",
    minHeight: 300,
    maxHeight: "100%"
  },
  profile: {
    flexDirection: "row",
    alignItems: "center"
  },
  profileText: {
    marginLeft: 4,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: MAIN_FONT
  },
  caption: {
    fontSize: 20,
    marginTop: 2,
    fontFamily: MAIN_FONT
  },
  location: {
    flexDirection: "row",
    alignItems: "center"
  },
  locationIcon: {
    fontSize: 50
  },
  locationText: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: MAIN_FONT
  },
  textWrapper: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default styles;
