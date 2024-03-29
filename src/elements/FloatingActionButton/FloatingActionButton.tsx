import React from "react";
import { View } from "react-native";
import {
  Button,
  // Icon,
} from "@elements";
import { ButtonStyle } from "@elements/Button";
import * as colors from "@util/constants/colors";
import styles from "./FloatingActionButton.styles";
import { IconName } from "../Icon/Icon.types";

interface FloatingActionProps {
  iconName: IconName;
  top?: number;
  left?: number;
  size?: number;
  onPress?: (any) => void;
}

export default function FloatingActionButton({
  // iconName,
  top = 525,
  left = 273,
  // size = 28.5,
  onPress = () => {},
}: FloatingActionProps) {
  const buttonFunction = onPress && ((func) => onPress(func));
  const buttonStyle: ButtonStyle = {
    default: {
      background: colors.BANANA_YELLOW,
      foreground: colors.BANANA_YELLOW,
    },
    pressed: {
      background: colors.LIGHT_YELLOW,
      foreground: colors.LIGHT_YELLOW,
    },
  };
  return (
    <View
      style={[
        styles.floatingContainer,
        {
          top,
          left,
        },
      ]}
    >
      <View style={styles.ellipseContainer}>
        {/* <Button buttonStyle={buttonStyle} onPress={buttonFunction} style={styles.iconContainer}>
          {(foregroundColor) => (<Icon name={iconName} size={size} color={foregroundColor} />)}
        </Button> */}
        {/* TODO: add back nested Icon */}
        <Button
          buttonStyle={buttonStyle}
          onPress={buttonFunction}
          style={styles.iconContainer}
        />
      </View>
    </View>
  );
}
