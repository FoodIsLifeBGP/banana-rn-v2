import React from 'react';
import { Text,
  View } from 'react-native';
import useGlobal from '@state';
import { TextButton,
  Modal } from '@elements';
import { Alert } from '@state/index.types';
import { useScheme } from '@util/colorSchemes';
import typography from '@util/typography';
import styles from './IncompleteFormAlert.styles';

interface IncompleteFormAlertProps {
  onYes?: () => void;
  onNo?: () => void;
}

export default function IncompleteFormAlert({
  onYes = () => {},
  onNo = () => {},
}: IncompleteFormAlertProps) {
  const [ globalState, globalActions ] = useGlobal() as any;
  const { alert: alertObj }: { alert: Alert } = globalState;
  const { clearAlert } = globalActions;
  const scheme = useScheme();

  const handleNo = () => {
    clearAlert();
    onNo();
    alertObj.cancelFn && alertObj.cancelFn();
  };

  const handleYes = () => {
    clearAlert();
    onYes();
    alertObj.confirmFn && alertObj.confirmFn();
  };

  const handleCloseButtonPress = () => {
    clearAlert();
  };

  const handleDismiss = () => {
    if (alertObj.dismissable) {
      clearAlert();
    }
  };

  if (!alertObj) return null;
  if (!alertObj.type || alertObj.type === 'default') {
    return (
      <Modal
        style={styles.container}
        title={alertObj?.title || 'Alert'}
        palette="accent"
        open={alertObj !== undefined}
        onDismiss={handleDismiss}
      >
        <View style={styles.body}>
          <View style={styles.textContainer}>
            <Text style={typography.body1}>
              {alertObj?.message || 'Uh oh, an unknown error occurred!'}
            </Text>
          </View>

          <TextButton
            text="OK"
            style={{ width: 104 }}
            buttonStyle={{
              default: scheme.primary,
              pressed: scheme.secondary,
              disabled: scheme.disabled,
            }}
            onPress={handleCloseButtonPress}
          />
        </View>
      </Modal>
    );
  }
  if (alertObj.type === 'incomplete form') {
    return (
      <Modal
        style={styles.container}
        title={alertObj?.title || 'ARE YOU SURE?'}
        palette="secondary"
        open={alertObj !== undefined}
        onDismiss={handleDismiss}
      >
        <View style={styles.body}>
          <View style={styles.textContainer}>
            <Text style={typography.body1}>
              {alertObj?.message || 'This is incomplete and will be canceled if you leave this page.'}
            </Text>
          </View>

          <View style={styles.buttonWrapper}>
            <View style={styles.leftButton}>
              <TextButton
                text="NO, KEEP IT"
                style={{ width: 120 }}
                buttonStyle={{
                  default: scheme.tertiary,
                  pressed: scheme.secondary,
                  disabled: scheme.disabled,
                }}
                onPress={handleNo}
              />
            </View>
            <View style={styles.rightButton}>
              <TextButton
                text="YES, CANCEL"
                style={{ width: 120 }}
                buttonStyle={{
                  default: scheme.primary,
                  pressed: scheme.secondary,
                  disabled: scheme.disabled,
                }}
                onPress={handleYes}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  return null;
}
