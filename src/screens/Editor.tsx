import React, { useContext, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import AddItem from "../components/AddItem";
import AvatarPicker from "../components/AvatarPicker";
import SpriteItem from "../components/SpriteItem";
import { Action, Colors, Sprite } from "../model/Constants";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MovableItem from "../components/MovableItem";
import { SpritesContext } from "../routes/Routes";

const Editor = ({ navigation }) => {
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [resetPos, setResetPos] = useState(false);
  const editorMaxPoint = useRef({
    x: 0,
    y: 0,
  });
  const { sprites, onAddAvatar, onDeleteAvatar, resetActions, selectedSprite } =
    useContext(SpritesContext);

  const getDimesions = ({ x, y, width, height }) => {
    editorMaxPoint.current.x = width;
    editorMaxPoint.current.y = height;
  };

  const onAddSprite = (avatar: string) => {
    setShowAvatarPicker(false);
    onAddAvatar(avatar);
  };

  const onCloseAvatarPicker = () => {
    setShowAvatarPicker(false);
  };

  const onCompleteReset = () => {
    setResetPos(false);
  };

  const onPressReset = () => {
    resetActions();
    setResetPos(true);
  };

  const onPressPlay = () => {
    setShouldPlay(true);
  };

  const onAnimationComplete = () => {
    setShouldPlay(false);
  };

  const onPressAddSprite = () => {
    setShowAvatarPicker(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.spritesView}>
          <View
            onLayout={(event) => {
              getDimesions(event.nativeEvent.layout);
            }}
            style={styles.spriteActionView}
          >
            {sprites.map((sprite) => (
              <MovableItem
                key={sprite.id}
                shouldPlay={shouldPlay}
                resetPos={resetPos}
                onCompleteReset={onCompleteReset}
                sprite={sprite}
                maxPositions={editorMaxPoint.current}
                onAnimationComplete={onAnimationComplete}
              >
                <View style={styles.movableView}>
                  <Image style={styles.image} source={sprite?.image} />
                </View>
              </MovableItem>
            ))}
          </View>
          <View style={styles.footerView}>
            <View style={styles.positionView}>
              <Text style={styles.positionTextBold}>{`Sprite:`}</Text>
              <Text style={styles.positionText}>{`${
                selectedSprite?.sprite?.name || "NA"
              }`}</Text>
              <Text style={styles.positionTextBold}>{`X:`}</Text>
              <Text style={styles.positionText}>{`${
                selectedSprite?.position?.x || "0"
              }`}</Text>
              <Text style={styles.positionTextBold}>{`Y:`}</Text>
              <Text
                style={{
                  ...styles.positionText,
                  marginRight: 5,
                }}
              >{`${selectedSprite?.position?.y || "0"}`}</Text>
            </View>
            <View style={styles.actionBtnView}>
              <TouchableOpacity onPress={onPressReset} style={styles.button}>
                <MaterialIcon name="replay" size={26} color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressPlay} style={styles.button}>
                <MaterialIcon
                  name="play-arrow"
                  size={30}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FlatList
          data={sprites}
          horizontal
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => (
            <SpriteItem
              {...item}
              index={index}
              onPressDelete={onDeleteAvatar}
            />
          )}
          style={styles.actionList}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() => <AddItem onPressAdd={onPressAddSprite} />}
        />
        <AvatarPicker
          show={showAvatarPicker}
          onSelect={onAddSprite}
          onClose={onCloseAvatarPicker}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: { flex: 1, padding: 15 },
  spritesView: {
    flex: 1,
    borderRadius: 20,
    borderColor: Colors.border,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
    shadowColor: Colors.dark,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: Colors.white,
  },
  spriteActionView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  movableView: {},
  footerView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  positionView: {
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
    marginBottom: 15,
    marginLeft: 15,
    shadowColor: Colors.dark,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: Colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  positionText: {
    fontSize: 18,
    marginRight: 20,
  },
  positionTextBold: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
    marginLeft: 5,
  },
  actionBtnView: {
    flexDirection: "row",
  },
  image: {
    height: 70,
    width: 70,
    resizeMode: "contain",
  },
  button: {
    height: 36,
    width: 36,
    backgroundColor: Colors.button,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginBottom: 15,
  },
  actionList: {
    flexGrow: 0,
    overflow: "visible",
  },
});

export default Editor;
