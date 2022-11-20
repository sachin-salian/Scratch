import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Editor from "../screens/Editor";
import AddActions from "../screens/AddActions";
import {
  Action,
  Avatar,
  Position,
  SelectedSprite,
  Sprite,
} from "../model/Constants";

const Stack = createNativeStackNavigator();
export const SpritesContext = React.createContext(null);

function AppRoutes() {
  const [sprites, setSprites] = React.useState<Sprite[]>([]);
  const [selectedSprite, setSelectedSprite] = React.useState<
    SelectedSprite | undefined
  >(undefined);

  const onAddAvatar = (avatar: Avatar) => {
    const newSprite: Sprite = {
      id: Math.random().toString(36).substring(7),
      actions: [],
      name: avatar.name,
      image: avatar.img,
    };

    setSprites([...sprites, newSprite]);
  };

  const onDeleteAvatar = (id: string) => {
    setSprites((prev) => prev.filter((item) => item?.id !== id));
  };

  const onAddActions = (index: number, actions: Action[]) => {
    sprites[index].actions = actions;
    setSprites([...sprites]);
  };

  const resetActions = () => {
    const updatedSpites = sprites.map((sprite: Sprite) => ({
      ...sprite,
      actions: [],
    }));
    setSprites([...updatedSpites]);
  };

  const updatedSelectedSprite = (sprite: Sprite, position: Position) => {
    setSelectedSprite({
      sprite,
      position,
    });
  };

  const contextSetters = {
    onAddAvatar,
    onDeleteAvatar,
    onAddActions,
    resetActions,
    updatedSelectedSprite,
  };

  return (
    <NavigationContainer>
      <SpritesContext.Provider
        value={{ sprites, selectedSprite, ...contextSetters }}
      >
        <Stack.Navigator>
          <Stack.Screen name="Editor" component={Editor} />
          <Stack.Screen name="AddActions" component={AddActions} />
        </Stack.Navigator>
      </SpritesContext.Provider>
    </NavigationContainer>
  );
}

export default AppRoutes;
