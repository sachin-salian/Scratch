export enum MotionsControls {
  "Move X(50)",
  "Move Y(50)",
  "Rotate 360",
  "Move To Start",
  "Move To Random Pos",
  "Show Message",
  "Increase Size",
  "Decrease Size",
  "Repeat",
}

export interface Action {
  id: string;
  control: MotionsControls;
}

export interface Sprite {
  id: string;
  name: string;
  image: NodeRequire;
  actions: Action[];
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  height: number;
  width: number;
}

export interface SelectedSprite {
  sprite: Sprite;
  position: Position;
}

export const Colors = {
  button: "#0362fc",
  white: "white",
  dark: "black",
  shadow: "#171717",
  border: "gray",
};

export interface Avatar {
  name: string;
  img: NodeRequire;
}

export const AVATAR: Avatar[] = [
  {
    name: "Cat",
    img: require("../assets/images/Cat.png"),
  },
  {
    name: "Ball",
    img: require("../assets/images/Ball.png"),
  },
  {
    name: "Bird",
    img: require("../assets/images/Bird.png"),
  },
  {
    name: "Car",
    img: require("../assets/images/Car.png"),
  },
  {
    name: "Deer",
    img: require("../assets/images/Deer.png"),
  },
  {
    name: "Elephant",
    img: require("../assets/images/Elephant.png"),
  },
];
