import React, { FunctionComponent } from 'react';
import { Text } from 'react-native';
import styles from './Paragraph.styles';

interface ParagraphProps {
  fontSize: number;
  emphasized?: boolean;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  children: any; /* TODO: add actual type */
}

const Paragraph: FunctionComponent<ParagraphProps> = ({
  fontSize,
  emphasized,
  textAlign,
  children,
}) => {
  const style = emphasized
    ? [ styles.paragraphText, styles.emphasizedParagraphText, {fontSize, textAlign} ]
    : [ styles.paragraphText ];
  return <Text style={style}>{children}</Text>;
};

export default Paragraph;
