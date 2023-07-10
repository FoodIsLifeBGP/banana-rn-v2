import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@elements';
import { NAVBAR_ICON_SIZE } from '@util/constants/icons';


export default function HamburgerPopupMenu() {
  const { toggleDrawer } = useNavigation() as any;

  return (
    <TouchableOpacity onPress={toggleDrawer}>
      <Icon name="menu" size={NAVBAR_ICON_SIZE} />
    </TouchableOpacity>
  );
}
