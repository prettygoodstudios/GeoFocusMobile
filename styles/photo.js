import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  photo: {
    marginBottom: 20,
    maxWidth: "100%",
    minHeight: 300
  },
  profile: {
    flexDirection: "row",
    alignItems: "center"
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 4
  },
  profileText: {
    fontSize: 35,
    fontWeight: "600"
  },
  caption: {
    fontSize: 20,
    marginTop: 10
  },
  location: {
    flexDirection: "row",
    alignItems: "center"
  },
  locationIcon: {
    fontSize: 50
  },
  locationText: {
    fontSize: 35,
    fontWeight: "600"
  },
  textWrapper: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default styles;
