import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import { scale, moderateScale } from '../utils/scaling';
import { COLORS } from '../styles/colors';
import { TEXT_STYLES } from '../styles/typography';
import { COMPONENT_SPACING } from '../styles/spacing';

interface AppInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  value,
  onChangeText,
  onFocus,
  onBlur,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const getInputContainerStyle = (): ViewStyle => {
    return {
      ...styles.inputContainer,
      borderColor: error
        ? COLORS.ERROR
        : isFocused
        ? COLORS.PRIMARY
        : COLORS.BORDER,
      borderWidth: error ? 2 : 1,
    };
  };

  const getInputStyle = (): TextStyle => {
    return {
      ...styles.input,
      ...TEXT_STYLES.INPUT,
      paddingLeft: leftIcon ? scale(50) : COMPONENT_SPACING.INPUT_PADDING_HORIZONTAL,
      paddingRight: rightIcon ? scale(50) : COMPONENT_SPACING.INPUT_PADDING_HORIZONTAL,
    };
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <Icon
            name={leftIcon as any}
            size={scale(20)}
            color={COLORS.TEXT_TERTIARY}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          style={[getInputStyle(), inputStyle]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={COLORS.TEXT_TERTIARY}
          {...textInputProps}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIcon}
            disabled={!onRightIconPress}
          >
            <Icon
              name={rightIcon as any}
              size={scale(20)}
              color={onRightIconPress ? COLORS.PRIMARY : COLORS.TEXT_TERTIARY}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={[styles.errorText, errorStyle]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: COMPONENT_SPACING.INPUT_MARGIN,
  },
  label: {
    ...TEXT_STYLES.LABEL,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: scale(8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: COMPONENT_SPACING.INPUT_BORDER_RADIUS,
    backgroundColor: COLORS.BACKGROUND,
    minHeight: COMPONENT_SPACING.INPUT_MIN_HEIGHT,
  },
  input: {
    flex: 1,
    color: COLORS.TEXT_PRIMARY,
    textAlignVertical: 'center',
  },
  leftIcon: {
    position: 'absolute',
    left: COMPONENT_SPACING.INPUT_PADDING_HORIZONTAL,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: COMPONENT_SPACING.INPUT_PADDING_HORIZONTAL,
    zIndex: 1,
    padding: scale(8),
  },
  errorText: {
    ...TEXT_STYLES.ERROR,
    color: COLORS.ERROR,
    marginTop: scale(4),
  },
});

export default AppInput;
