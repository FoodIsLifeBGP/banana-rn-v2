import {CommonActions, useNavigation} from '@react-navigation/native';

let navigation = useNavigation();

function setTopLevelNavigator(navigationRef) {
  navigation = navigationRef;
}

function navigate(name, params) {
  navigation.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}

function goBack() {
  navigation.dispatch(CommonActions.goBack());
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
};
