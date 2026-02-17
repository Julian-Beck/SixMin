import { useThemeColor } from '@/style/color/use-theme-color';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;

  lightBackground?: string;
  darkBackground?: string;

  lightBorder?: string;
  darkBorder?: string;

  error?: string;
  variant?: 'default' | 'title' | 'subtitle';
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  lightBackground,
  darkBackground,
  lightBorder,
  darkBorder,
  error,
  variant = 'default',
  ...rest
}: ThemedTextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const backgroundColor = useThemeColor(
    { light: lightBackground, dark: darkBackground },
    'background'
  );
  const borderColor = useThemeColor(
    { light: lightBorder, dark: darkBorder },
    'text'
  );

  const focusBorderColor = useThemeColor({}, 'tint');
  const errorColor = useThemeColor({}, 'error');

  const computedBorderColor = error
    ? errorColor
    : isFocused
    ? focusBorderColor
    : borderColor;

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[
          styles.base,
          { color: textColor },
          { backgroundColor },
          { borderColor: computedBorderColor },
          variant === 'default' && styles.default,
          variant === 'title' && styles.title,
          variant === 'subtitle' && styles.subtitle,
          style,
        ]}
        placeholderTextColor={textColor + '99'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {error && <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },

  base: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  default: {
    fontSize: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  errorText: {
    marginTop: 6,
    fontSize: 12,
  },
});
