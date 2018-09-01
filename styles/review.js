import {StyleSheet} from "react-native";
import {OFF_WHITE} from "./index";


const reviewStyles = StyleSheet.create({
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  profileText: {
    fontSize: 30
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  scoreText: {
    fontSize: 40,
    fontWeight: "700",
    marginLeft: 50,
    textAlign: "right"
  },
  review: {
    backgroundColor: OFF_WHITE,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20
  }

});

export default reviewStyles;
