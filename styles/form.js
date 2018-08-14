import {StyleSheet} from "react-native";

import {OFF_WHITE, PRIMARY_COLOR, SECONDARY_COLOR} from "./variables";

const formGroupFontStyles = {
  fontSize: 30,
  color: PRIMARY_COLOR,
}

const formStyles = StyleSheet.create({
  formGroup: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 40
  },
  formLabel: {
    ...formGroupFontStyles
  },
  formInput: {
    ...formGroupFontStyles,
    backgroundColor: SECONDARY_COLOR,
    padding: 10,
    borderRadius: 3
  },
});

export default formStyles;
