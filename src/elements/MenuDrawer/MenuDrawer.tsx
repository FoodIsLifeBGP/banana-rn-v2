import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View 
} from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import useGlobal from '@state';
import MainOption from './MainOption/MainOption';
import styles from './MenuDrawer.styles';

function MenuDrawer(props) {
  const [ state, actions ] = useGlobal() as any;
  const { toggleDrawer } = useNavigation() as any;
  const { logOut } = actions;
  const name = state.user.organization_name ? state.user.organization_name : state.user.first_name;

  return (
    <ScrollView>
      <View style={styles.drawerHeader}>
        <Text style={{...styles.username, marginBottom: 0}}>
          Hello,
        </Text>
        <Text style={styles.username}>{name}</Text>
      </View>
      <SafeAreaView
        style={styles.container}
      >
        <DrawerItem
          {...props}
          labelStyle={styles.labelText}
          itemStyle={styles.menuItem}
          onItemPress={async ({ route }) => {
            toggleDrawer();
            props.navigation.navigate(route.routeName);
          }}
        />
      </SafeAreaView>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={async () => {
          toggleDrawer();
          props.navigation.navigate('LogoutScreen');
          await logOut();
        }}
      >
        <MainOption
          icon="logout"
          text="Log Out"
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

export default MenuDrawer;
