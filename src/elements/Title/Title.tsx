import React from "react";
import { Text, View } from "react-native";
import styles from "./Title.styles";

export default function Title({ text }: { text: string }) {
  return (
    <View>
      <Text style={styles.text}>{text.toUpperCase()}</Text>
    </View>
  );
}
