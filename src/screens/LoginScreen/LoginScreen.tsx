import React, {
  RefObject,
  createRef,
  useEffect,
  useState,
} from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useGlobalStore from "@state";
import {
  FormTextInput, LinkButton, Title,
} from "@elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import styles from "./LoginScreen.styles";
import ResetPassword from "./ResetPassword";
import { PasswordResetStage } from "./ResetPassword/ResetPassword";

export default function LoginScreen(props) {
  const responseStatus = useGlobalStore((state) => state.responseStatus);
  const userIdentity = useGlobalStore((state) => state.userIdentity);
  const loginUrl = useGlobalStore((state) => state.loginUrl);

  const email = (props.route.params && props.route.params.email) ?? useGlobalStore((state) => state.email);
  const password = (props.route.params && props.route.params.password) ?? useGlobalStore((state) => state.password);

  const logIn = useGlobalStore((state) => state.logIn);
  const setEmail = useGlobalStore((state) => state.setEmail);
  const setPassword = useGlobalStore((state) => state.setPassword);
  const clearEmailAndPassword = useGlobalStore((state) => state.clearEmailAndPassword);

  const passwordInputRef: RefObject<TextInput> = createRef();
  const handleEmailInputSubmit = () => passwordInputRef.current?.focus();

  const [showModal, setShowModal] = useState(false);
  const [passwordResetStage, setPasswordResetStage] = useState(PasswordResetStage.NONE);

  useEffect(() => {
    const reactToStatusCode = async () => {
      console.log("fired");
      Alert.alert("responseStatus", JSON.stringify(responseStatus));

      if (responseStatus && responseStatus.code === 202) {
        clearEmailAndPassword();
        clearPasswordResetStage();
        props.navigation.navigate("Drawer", { screen:"LoginSuccessScreen" });
      }
    };
    reactToStatusCode();

    const retrievePasswordResetStage = async () => {
      try {
        const value = await AsyncStorage.getItem("PASSWORD RESET STAGE");
        if (value === "VERIFY") {
          setPasswordResetStage(PasswordResetStage[value]);
        }
      } catch (error) {
        // Not important error
      }
    };
    retrievePasswordResetStage();
  }, [responseStatus]);

  const storePasswordResetStage = async (newStage) => {
    try {
      await AsyncStorage.setItem("PASSWORD RESET STAGE", newStage);
      setPasswordResetStage(newStage);
    } catch (error) {
      // Not important error
    }
  };

  const clearPasswordResetStage = () => {
    setPasswordResetStage(PasswordResetStage.NONE);
    AsyncStorage.removeItem("PASSWORD RESET STAGE");
  };

  const handleForgotPassword = () => {
    setShowModal(true);
  };

  const handleDismissModal = () => {
    setShowModal(false);
  };

  const handleSetEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleSetPassword = (newPassword: string) => {
    setPassword(newPassword);
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        {/* TODO: use ContentHeader component when available */}
        <Title text={`banana \n${userIdentity}`} />
      </View>

      <ScrollView
        style={styles.bodyContainer}
        contentContainerStyle={styles.bodyContentContainer}
      >
        <View style={styles.form}>
          <FormTextInput
            label="email"
            placeholder="info@bananaapp.org"
            value={email}
            setValue={handleSetEmail}
            style={styles.inputEmail}
            onSubmitEditing={handleEmailInputSubmit}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            autoCapitalize="none"
            textContentType="username"
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={true}
          />

          <FormTextInput
            label="password"
            type="password"
            value={password}
            setValue={handleSetPassword}
            ref={passwordInputRef}
            onSubmitEditing={() => logIn(
              loginUrl, userIdentity, email, password,
            )}
            enablesReturnKeyAutomatically={true}
            returnKeyType="go"
            blurOnSubmit={false}
          />

          <View style={styles.forgotPassword}>
            {/* View wrapper required to constrain clickable area of button */}
            <TouchableWithoutFeedback onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>
                Forgot Password?
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <LinkButton
            text="Log In"
            onPress={() => logIn(
              loginUrl, userIdentity, email, password,
            )}
          />
          <LinkButton
            text="Register"
            destination="RegistrationScreen"
          />
        </View>
      </ScrollView>
      {showModal && (
        <ResetPassword
          onSuccess={clearPasswordResetStage}
          onDismiss={handleDismissModal}
          initialStage={passwordResetStage}
          onRequest={storePasswordResetStage}
          onBack={clearPasswordResetStage}
        />
      )}
    </KeyboardAvoidingView>
  );
}
