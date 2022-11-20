import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../model/Constants";
import Icon from "react-native-vector-icons/MaterialIcons";

const AddItem = ({ onPressAdd }) => {
  return (
    <TouchableOpacity onPress={onPressAdd} style={styles.container}>
      <Icon
        name="add"
        size={80}
        iconStyle={styles.addIcon}
        color={Colors.button}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 141,
    width: 110,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.border,
    shadowColor: Colors.dark,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: Colors.white,
    marginRight: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  addIcon: {},
});

export default AddItem;
