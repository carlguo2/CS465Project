import { Dimensions } from "react-native";

const { height } = Dimensions.get('window');
const offset = 100;

export enum DrawerState {
  Open = height - offset,
  Peek = 230,
  Closed = 0,
}