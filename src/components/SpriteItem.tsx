import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../model/Constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";

const SpriteItem = ({ index, image, id, onPressDelete, actions }) => {
  const navigation = useNavigation();

  const onPressAdd = () => {
    navigation.navigate("AddActions", { index });
  };

  const onDeletePress = () => {
    onPressDelete(id);
  };

  return (
    <Animated.View style={styles.container}>
      <TouchableOpacity style={styles.imageView}>
        <Image style={styles.image} source={image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDeletePress} style={styles.deleteIcon}>
        <Icon name="delete" size={30} color="#900" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressAdd} style={styles.addActionBtn}>
        <Text style={styles.addActionText}>
          {actions.length > 0 ? "Edit Actions" : "Add Actions"}
        </Text>
      </TouchableOpacity>
    </Animated.View>
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
  },
  deleteIcon: {
    borderRadius: 20,
    borderColor: Colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    width: 40,
    position: "absolute",
    right: -20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  imageView: {
    height: 100,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderColor: "transparent",
  },
  image: {
    height: 70,
    width: 70,
    resizeMode: "contain",
  },
  addActionBtn: {
    backgroundColor: Colors.button,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  addActionText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default SpriteItem;
