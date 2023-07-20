import React, { FunctionComponent, useState } from "react";
import { Text, View } from "react-native";
import {
  FormTextInput, LinkButton, SpacerInline,
} from "@elements";
import useGlobalStore from "@state";
import { submitResetToken } from "@state/actions";
import styles from "../ResetPassword.styles";

interface CodeFormProps {
  onComplete: () => void;
  setToken: (value: string) => void;
  onBack: () => void;
}

const CodeForm: FunctionComponent<CodeFormProps> = ({
  onComplete,
  setToken,
  onBack,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState("");
  const [error, setError] = useState("");
  const userIdentity = useGlobalStore((state) => state.userIdentity);

  const submitTokenProps = {
    formInput: formData,
    userIdentity,
    setIsSubmitting,
    onComplete,
    setError,
    setToken,
  };

  const handleSubmit = async () => {
    if (formData && !isSubmitting) {
      setError("");
      setIsSubmitting(true);
      submitResetToken(submitTokenProps);
    } else {
      setError("Please enter a value.");
    }
  };

  return (
    <View>
      <SpacerInline height={20} />
      <Text style={styles.text}>
        Enter the token sent to your email address:
      </Text>
      <SpacerInline height={20} />
      <FormTextInput
        label="Token"
        value={formData}
        setValue={(text) => {
          setError("");
          setFormData(text);
        }}
      />
      <View>
        <Text style={styles.errors}>{error || null}</Text>
        <SpacerInline height={20} />
        <View style={styles.buttonContainer}>
          <LinkButton text="Back" onPress={onBack} />
          <LinkButton
            disabled={isSubmitting}
            text="Submit"
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default CodeForm;
