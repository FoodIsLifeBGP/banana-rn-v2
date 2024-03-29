import React from "react";
import { View } from "react-native";
import { Button } from "@elements";
// import { Button, Icon } from "@elements";
import { ButtonStyle } from "@elements/Button";
import * as colors from "@util/constants/colors";
import Selector from "@elements/NavBar/Selector";
import useGlobalStore from "@state";
// import { NAVBAR_ICON_SIZE } from "@util/constants/icons";
import HamburgerPopupMenu from "@elements/HamburgerPopupMenu";
import styles from "./NavBar.styles";

interface NavBarProps {
  backDestination?: string;
  showMenu?: boolean;
  showBackButton?: boolean;
  leftButton?: "qrCode" | "back";
  showSelector?: boolean;
  position?: "map" | "list";
  onMap?: () => any;
  onList?: () => any;
  backButtonFn?: () => void;
  navigation?: any;
  goBack: () => void;
}

export default function NavBar({
  showMenu = true,
  showBackButton = true,
  leftButton = "back",
  backDestination,
  showSelector,
  position,
  onMap,
  onList,
  backButtonFn,
  navigation,
  goBack,
}: NavBarProps) {
  const buttonStyle: ButtonStyle = {
    default: {
      background: colors.LIGHT_GRAY,
      foreground: colors.NAVY_BLUE,
    },
  };

  const updateAlert = useGlobalStore((state) => state.updateAlert);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.backContainer}>
        {/* TODO: add this icon back */}
        {/* <Icon size={NAVBAR_ICON_SIZE} color='blue' name="back" /> */}
        {leftButton === "back" && showBackButton && (
          <Button
            buttonStyle={buttonStyle}
            onPress={
              backButtonFn ||
              (backDestination
                ? () => navigation.navigate(backDestination)
                : () => goBack())
            }
          />
        )}
        {/* TODO: add this icon back */}
        {/* <Icon size={NAVBAR_ICON_SIZE} color="blue" name="qrCode" /> */}
        {leftButton === "qrCode" && (
          <Button
            buttonStyle={buttonStyle}
            onPress={() => navigation.navigate("QRCodeScannerScreen")}
          />
        )}
      </View>
      {showSelector && position && (
        <Selector position={position} onMap={onMap} onList={onList} />
      )}
      {/* TODO: add this icon back */}
      {/* <Icon size={NAVBAR_ICON_SIZE} color={foregroundColor} name="bell" /> */}
      <View style={styles.notificationContainer}>
        <Button
          buttonStyle={buttonStyle}
          style={{
            marginTop: 4,
            marginRight: 8,
          }}
          onPress={() => {
            updateAlert({
              title: "Coming Soon",
              type: "coming soon",
              message: "coming soon",
              dismissible: false,
            });
          }}
        />
        {showMenu && <HamburgerPopupMenu />}
      </View>
    </View>
  );
}
