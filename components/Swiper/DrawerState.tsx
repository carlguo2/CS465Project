import { Dimensions } from "react-native";

const { height } = Dimensions.get('window');
const openOffset = 100;
const peekAmount = 200;

export enum DrawerState {
  Open = height - openOffset,
  Peek = peekAmount,
  Closed = 0
}