import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import { scale, moderateScale } from '../utils/scaling';
import { useTheme } from '../context/ThemeContext';
import { TEXT_STYLES } from '../styles/typography';
import { COMPONENT_SPACING } from '../styles/spacing';

interface CalculatorCardProps {
  title: string;
  description: string;
  iconName: string;
  onPress: () => void;
  color?: string;
  style?: ViewStyle;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({
  title,
  description,
  iconName,
  onPress,
  color,
  style,
}) => {
  const { colors } = useTheme();
  const cardColor = color || colors.PRIMARY;

  return (
    <TouchableOpacity
      style={[styles.container, { borderColor: cardColor, backgroundColor: colors.CARD_BACKGROUND }, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.BACKGROUND_DARK }]}>
        <Icon
          name={iconName as any}
          size={scale(32)}
          color={cardColor}
          style={styles.icon}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: cardColor }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.TEXT_SECONDARY }]}>{description}</Text>
      </View>
      <Icon
        name="chevron-right"
        size={scale(20)}
        color={colors.TEXT_TERTIARY}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
    padding: COMPONENT_SPACING.CARD_PADDING,
    marginVertical: COMPONENT_SPACING.CARD_MARGIN,
    marginHorizontal: COMPONENT_SPACING.CARD_MARGIN,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderLeftWidth: 5,
    shadowColor: '#000000',
    shadowOffset: COMPONENT_SPACING.CARD_SHADOW_OFFSET,
    shadowOpacity: 0.1,
    shadowRadius: COMPONENT_SPACING.CARD_SHADOW_RADIUS,
    elevation: 3,
  },
  iconContainer: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: COMPONENT_SPACING.CARD_MARGIN,
  },
  icon: {
    // Icon styles are handled by the Icon component
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...TEXT_STYLES.H6,
    marginBottom: scale(4),
    fontWeight: '600',
  },
  description: {
    ...TEXT_STYLES.BODY_SMALL,
  },
  chevron: {
    marginLeft: COMPONENT_SPACING.CARD_MARGIN,
  },
});

export default CalculatorCard;
