import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, MotionsControls } from "../model/Constants";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SpritesContext } from "../routes/Routes";

const getActionItems = () =>
  Object.keys(MotionsControls).filter((item: string) => isNaN(item));

const AddActions = ({ onPressDelete, onPressAdd, navigation, route }) => {
  const { index } = route.params;
  const { sprites, onAddActions } = useContext(SpritesContext);
  const [selectedActions, setSelectedActions] = useState(
    sprites[index]?.actions
  );

  const onPressDone = () => {
    onAddActions(index, selectedActions);
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={onPressDone} title="Done" />,
    });
  }, [navigation, selectedActions]);

  const renderActionItems = ({ item }) => {
    const onPressItem = () => {
      setSelectedActions((prev) => [...prev, item]);
    };

    return (
      <TouchableOpacity onPress={onPressItem} style={styles.actionItem}>
        <Text style={styles.actionText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderSelectedActionItems = ({ item, index }) => {
    const onPressDeleteItem = () => {
      setSelectedActions((prev) =>
        prev.filter((_, itemIndex) => index !== itemIndex)
      );
    };

    return (
      <View style={styles.actionItem}>
        <View style={styles.itemTextView}>
          <Text numberOfLines={1} style={styles.actionText}>
            {item}
          </Text>
        </View>
        <TouchableOpacity onPress={onPressDeleteItem} style={styles.removeIcon}>
          <Icon name="highlight-remove" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.actionView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Actions</Text>
          </View>
          <FlatList
            data={getActionItems()}
            renderItem={renderActionItems}
            keyExtractor={(item, index) => item + index}
          />
        </View>
        <View style={styles.selectedactionView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Added Actions</Text>
          </View>
          <FlatList
            data={selectedActions}
            renderItem={renderSelectedActionItems}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  actionView: {
    flex: 1 / 2,
    padding: 15,
    margin: 10,
    borderRadius: 20,
    shadowColor: Colors.dark,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: Colors.white,
  },
  selectedactionView: {
    flex: 1 / 2,
    padding: 15,
    margin: 10,
    borderRadius: 20,
    shadowColor: Colors.dark,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: Colors.white,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  header: {
    borderBottomColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 30,
    marginBottom: 20,
  },
  actionItem: {
    flexDirection: "row",
    borderRadius: 10,
    height: 36,
    backgroundColor: Colors.button,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  actionText: {
    color: Colors.white,
    paddingHorizontal: 10,
  },
  itemTextView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  removeIcon: {
    marginRight: 5,
  },
});

export default AddActions;
