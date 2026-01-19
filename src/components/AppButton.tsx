import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { scale, moderateScale } from '../utils/scaling';
import { COLORS } from '../styles/colors';
import { TEXT_STYLES } from '../styles/typography';
import { COMPONENT_SPACING } from '../styles/spacing';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      minHeight: COMPONENT_SPACING.BUTTON_MIN_HEIGHT,
    };

    // Size styles
    const sizeStyles = {
      small: {
        paddingHorizontal: COMPONENT_SPACING.BUTTON_PADDING_HORIZONTAL - scale(8),
        paddingVertical: COMPONENT_SPACING.BUTTON_PADDING_VERTICAL - scale(4),
        minHeight: 40,
      },
      medium: {
        paddingHorizontal: COMPONENT_SPACING.BUTTON_PADDING_HORIZONTAL,
        paddingVertical: COMPONENT_SPACING.BUTTON_PADDING_VERTICAL,
        minHeight: COMPONENT_SPACING.BUTTON_MIN_HEIGHT,
      },
      large: {
        paddingHorizontal: COMPONENT_SPACING.BUTTON_PADDING_HORIZONTAL + scale(8),
        paddingVertical: COMPONENT_SPACING.BUTTON_PADDING_VERTICAL + scale(4),
        minHeight: 56,
      },
    };

    // Variant styles
    const variantStyles = {
      primary: {
        backgroundColor: disabled ? COLORS.TEXT_DISABLED : COLORS.PRIMARY,
      },
      secondary: {
        backgroundColor: disabled ? COLORS.TEXT_DISABLED : COLORS.SECONDARY,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: disabled ? COLORS.TEXT_DISABLED : COLORS.PRIMARY,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...styles.text,
    };

    // Size text styles
    const sizeTextStyles = {
      small: TEXT_STYLES.BUTTON_SMALL,
      medium: TEXT_STYLES.BUTTON,
      large: TEXT_STYLES.BUTTON_LARGE,
    };

    // Variant text styles
    const variantTextStyles = {
      primary: {
        color: disabled ? COLORS.TEXT_WHITE : COLORS.TEXT_WHITE,
      },
      secondary: {
        color: disabled ? COLORS.TEXT_WHITE : COLORS.TEXT_WHITE,
      },
      outline: {
        color: disabled ? COLORS.TEXT_DISABLED : COLORS.PRIMARY,
      },
      ghost: {
        color: disabled ? COLORS.TEXT_DISABLED : COLORS.PRIMARY,
      },
    };

    return {
      ...baseStyle,
      ...sizeTextStyles[size],
      ...variantTextStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? COLORS.PRIMARY : COLORS.TEXT_WHITE}
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[getTextStyle(), textStyle, icon ? { marginLeft: scale(8) } : {}]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: COMPONENT_SPACING.BUTTON_BORDER_RADIUS,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: COMPONENT_SPACING.BUTTON_MARGIN,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default AppButton;
