import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from '@react-native-vector-icons/material-icons';

interface ThemeToggleProps {
  size?: number;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 24 }) => {
  const { theme, toggleTheme, colors } = useTheme();

  const getIconName = () => {
    return theme === 'light' ? 'dark-mode' : 'light-mode';
  };

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={styles.container}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Icon
        name={getIconName()}
        size={size}
        color={colors.TEXT_WHITE}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ThemeToggle;
