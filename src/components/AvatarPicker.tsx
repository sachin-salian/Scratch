import React, { useState } from "react";
import {
  Alert,
  Modal,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { AVATAR, Colors } from "../model/Constants";

const AvatarPicker = ({ show, onSelect, onClose }) => {
  const renderItem = ({ item, index }) => {
    const onPressItem = () => {
      onSelect(AVATAR[index]);
    };

    return (
      <TouchableOpacity onPress={onPressItem} style={styles.imageView}>
        <Image style={styles.image} source={item.img} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Modal
        animationType="slide"
        visible={show}
        presentationStyle="pageSheet"
        style={{ backgroundColor: "red", opacity: 0.5 }}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={AVATAR}
              nestedScrollEnabled
              keyExtractor={(item) => `${item.name}`}
              renderItem={renderItem}
              scrollEnabled={false}
              numColumns={3}
              style={{
                flexGrow: 0,
                overflow: "visible",
              }}
              contentContainerStyle={{ justifyContent: "space-between" }}
            />
          </View>
          <View style={styles.bar} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 40,
    width: "100%",
    overflow: "hidden",
    shadowColor: Colors.dark,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: Colors.white,
  },
  bar: {},
  modalView: {
    justifyContent: "center",

    height: 260,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageView: {
    height: 80,
    marginVertical: 10,
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "transparent",
  },
  image: {
    height: 70,
    width: 70,
    resizeMode: "contain",
  },
});

export default AvatarPicker;
