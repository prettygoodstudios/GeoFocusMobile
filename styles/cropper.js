import {StyleSheet, Dimensions} from "react-native";

import {PRIMARY_COLOR, OFF_WHITE} from "./index";

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  cropperOption: {
    width: 50,
    height: 50,
    backgroundColor: PRIMARY_COLOR,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  cropperOptionText: {
    color: OFF_WHITE,
    fontSize: 40
  },
  cropperOptionWrapper: {
    display: "flex",
    flexDirection: "row",
    flex: 2,
    marginBottom: 30
  },
  image: {

  },
  imageWrapper: {
    width: 300,
    height: 300,
    backgroundColor: OFF_WHITE,
    overflow: "hidden"
  },
  cropperWrapper: {
    display: "flex",
    flexDirection: "column"
  }
});

export default styles;
