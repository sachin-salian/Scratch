import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  FadeOut,
  runOnJS,
} from "react-native-reanimated";
import { Action, Colors, MotionsControls, Position } from "../model/Constants";
import { SpritesContext } from "../routes/Routes";

type CustomViewProps = {
  style?: TextStyle | TextStyle[];
};

type ContextType = {
  x: number;
  y: number;
};

const getNextPoint = (
  increment: Position,
  current: Position,
  maxPoints: Position
) => {
  const newPosition = {
    x: current.x + increment.x,
    y: current.y + increment.y,
  };

  if (newPosition.x >= maxPoints.x / 2) {
    newPosition.x = 0;
  }
  if (newPosition.y >= maxPoints.y / 2) {
    newPosition.y = 0;
  }

  return newPosition;
};

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const MovableItem: React.FC<CustomViewProps> = ({
  children,
  style,
  sprite,
  onAnimationComplete,
  shouldPlay,
  resetPos,
  maxPositions,
  onCompleteReset,
}) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const rotAngle = useSharedValue(0);
  const scale = useSharedValue(1);
  const itemYPosition = useRef(0);
  const { actions } = sprite;

  const [showMsg, setShowMsg] = useState(false);
  const { updatedSelectedSprite } = useContext(SpritesContext);

  // Perform all the listed actions
  const performActions = () => {
    actions?.forEach((item, i) => {
      // Make use of setTimeout to perform each action with 1sec delay.
      setTimeout(() => {
        let newPosition;
        switch (item) {
          case MotionsControls[MotionsControls["Move X(50)"]]:
            newPosition = getNextPoint(
              { x: 50, y: 0 },
              { x: x.value, y: y.value },
              maxPositions
            );
            x.value = withTiming(newPosition.x);
            break;
          case MotionsControls[MotionsControls["Move Y(50)"]]:
            newPosition = getNextPoint(
              { x: 0, y: 50 },
              { x: x.value, y: y.value },
              maxPositions
            );
            y.value = withTiming(newPosition.y);
            break;
          case MotionsControls[MotionsControls["Rotate 360"]]:
            rotAngle.value = withTiming(rotAngle.value + 360, {
              duration: 500,
            });
            break;
          case MotionsControls[MotionsControls["Move To Start"]]:
            x.value = withTiming(0);
            y.value = withTiming(0);
            break;
          case MotionsControls[MotionsControls["Move To Random Pos"]]:
            const sideOffset = 30;
            const randX = getRandomNum(
              -maxPositions.x / 2 - sideOffset,
              maxPositions.x / 2 - sideOffset
            );
            const randY = getRandomNum(
              -maxPositions.y / 2 + itemYPosition.current - sideOffset,
              maxPositions.y / 2 - itemYPosition.current - sideOffset
            );
            x.value = withTiming(randX);
            y.value = withTiming(randY);
            break;
          case MotionsControls[MotionsControls["Show Message"]]:
            setShowMsg(true);
            setTimeout(() => setShowMsg(false), 1000);

            break;
          case MotionsControls[MotionsControls["Increase Size"]]:
            scale.value = withSpring(scale.value + 1);
            break;

          case MotionsControls[MotionsControls["Decrease Size"]]:
            scale.value = withSpring(scale.value - 1);
            break;

          case MotionsControls[MotionsControls["Repeat"]]:
            return actions && performActions();
          default:
            break;
        }
      }, 1000 * i);
      onAnimationComplete(false);
    });
  };

  // When actions need to be performed.
  useEffect(() => {
    shouldPlay && performActions();
  }, [shouldPlay, actions]);

  // To reset the positions and actions.
  useEffect(() => {
    if (resetPos) {
      x.value = withTiming(0);
      y.value = withTiming(0);
    }
    onCompleteReset();
  }, [resetPos]);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onFinish(event, context, isCanceledOrFailed) {},
    onStart: (_, context) => {
      context.x = x.value;
      context.y = y.value;
    },
    onActive: (event, context) => {
      x.value = event.translationX + context.x;
      y.value = event.translationY + context.y;
    },
    onEnd: (_, context) => {
      // Update current positions on JS thread.
      runOnJS(updatedSelectedSprite)(sprite, { x: x.value, y: y.value });
    },
  });

  let panStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
        {
          translateY: y.value,
        },
        { rotateZ: `${rotAngle.value}deg` },
        { scale: scale.value },
      ],
    };
  }, [x, y]);

  const getDimesions = ({ y }) => {
    itemYPosition.current = maxPositions.y / 2 - y;
  };

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View
        style={[styles.imageView, panStyle, { ...style }]}
        onLayout={(event) => {
          getDimesions(event.nativeEvent.layout);
        }}
      >
        <View style={styles.msgOuterView}>
          {showMsg && (
            <Animated.View
              exiting={FadeOut.duration(1000)}
              style={styles.msgView}
            >
              <Text style={styles.msgText}>Hello</Text>
            </Animated.View>
          )}
        </View>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  imageView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  msgOuterView: {
    height: 36,
    width: 60,
  },
  msgView: {
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.dark,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: Colors.white,
    marginBottom: 5,
  },
  msgText: {},
});

export default MovableItem;
