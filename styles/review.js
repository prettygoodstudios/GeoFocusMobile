import {StyleSheet} from "react-native";
import {OFF_WHITE, MAIN_FONT} from "./index";


const reviewStyles = StyleSheet.create({
  averageScore: {
    fontSize: 25,
    fontFamily: MAIN_FONT,
    fontWeight: "500",
    marginBottom: 10
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  profileText: {
    fontSize: 20,
    fontFamily: MAIN_FONT
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
    textAlign: "right",
     fontFamily: MAIN_FONT
  },
  review: {
    backgroundColor: OFF_WHITE,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20
  }

});

export default reviewStyles;
