/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
const successColor = '#4dff4f';
const warningColor = '#ffff4f';
const errorColor = '#ff4d4f';

export const Colors = {
  light: {
    text: '#3D3D3D',
    BackgroundPrimary: '#f5f1ebff',
    BackgroundSecondary: '#e8efe6ff',
    Primary: '#9caf88ff',
    Secondary: '#c9876bff',
    success: successColor,
    warning: warningColor,
    error: errorColor,
    tintDark: tintColorDark,
    tintLight: tintColorLight,
  },
  dark: {
    text: '#eceff4',
    BackgroundPrimary: '#5e81ac',
    BackgroundSecondary: '#81a1c1',
    Primary: '#88c0d0',
    Secondary: '#8fbcbb',
    success: successColor,
    warning: warningColor,
    error: errorColor,
    tintDark: tintColorDark,
    tintLight: tintColorLight,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});