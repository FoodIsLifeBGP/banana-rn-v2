import React, {
  Ref,
  RefObject,
  forwardRef 
} from 'react';
import {
  Image,
  StyleProp,
  Text,
  View,
  ViewStyle 
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

import {
  Icon,
  InputLabel 
} from '@elements';
import { sourceImage } from '@util/ImageSourcer';
import styles from './FormImageInput.styles';

type UploadStatus = 'none' | 'pending' | 'success' | 'failure';

interface FormImageInputProps {
  /** Label for the input. */
  label: string;

  /** ImageInfo chosen from the image picker. */
  value: ImageInfo | null;

  /** Callback for when an image is chosen from the image picker. */
  setValue: (img: ImageInfo) => void;

  /* Status message of the image upload. */
  status?: UploadStatus;

  /** Optional style of the component */
  style?: StyleProp<ViewStyle>;

  /** Whether or not there is an error associated with the given input value. */
  error?: boolean;

  /** User-facing message associated with an error. */
  errorMessage?: string;

  /** Shape of the image input */
  shape?: 'rectangular' | 'circular';
}

const MessageFromStatus = {
  none: 'No file uploaded',
  pending: 'Pending file upload',
  success: 'File uploaded',
  failure: 'File upload failed',
};

/**
 * Input component for a form to select an image from storage to upload.
 */
function FormImageInput(
  {
    label,
    value,
    setValue,
    status = 'none',
    style,
    error = false,
    errorMessage,
    shape = 'rectangular',
  }: FormImageInputProps,
  ref: Ref<TouchableWithoutFeedback>,
) {
  const pickImage = async () => {
    const imageResult = await sourceImage('cameraRoll');
    if (imageResult && !imageResult.cancelled) {
      setValue(imageResult as ImageInfo);
    }
  };
  return (
    <View style={style}>
      <InputLabel text={label} />


      {status !== 'none' ? (
        <Text style={styles.statusRowText}>
          <Text style={styles.statusLabelText}>
            {'Status : '}
          </Text>
          {MessageFromStatus[status] || 'Unknown status'}
        </Text>
      ) : null}

      <TouchableWithoutFeedback
        onPress={pickImage}
        ref={ref}
      >
        { value?.uri != null
          ? (
            <Image
              style={shape === 'rectangular' ? styles.image : styles.circularImage}
              source={{ uri: value.uri }}
            />
          )
          : (
            <View style={shape === 'rectangular' ? styles.iconContainer : styles.iconCircularContainer}>
              <Icon name="image" size={24} />
            </View>
          )}
      </TouchableWithoutFeedback>

      { error && (
        <View style={styles.errorMessage}>
          <Text style={styles.errorMessageText}>
            {errorMessage}
          </Text>
        </View>
      ) }
    </View>
  );
}

export default forwardRef<TouchableWithoutFeedback, FormImageInputProps & { ref?: RefObject<TouchableWithoutFeedback> }>(FormImageInput);
