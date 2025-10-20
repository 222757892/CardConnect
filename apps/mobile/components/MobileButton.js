import React from 'react';
import { Button as PaperButton } from 'react-native-paper';

export function AppButton({ style, children, onPress, ...props }) {
  return (
    <PaperButton
      mode="contained"
      buttonColor="#145DA0"
      textColor="#ffffff"
      rippleColor="#4A90E2"
      onPress={onPress}
      contentStyle={{ paddingVertical: 8 }} // button height
      style={[{ borderRadius: 10 }, style]}
      {...props}
    >
      {children}
    </PaperButton>
  );
}
