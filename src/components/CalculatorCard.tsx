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
import { COLORS } from '../styles/colors';
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
  color = COLORS.PRIMARY,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { borderLeftColor: color }, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Icon
          name={iconName as any}
          size={scale(32)}
          color={color}
          style={styles.icon}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color }]}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Icon
        name="chevron-right"
        size={scale(20)}
        color={COLORS.TEXT_TERTIARY}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
    padding: COMPONENT_SPACING.CARD_PADDING,
    marginVertical: COMPONENT_SPACING.CARD_MARGIN,
    marginHorizontal: COMPONENT_SPACING.CARD_MARGIN,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: COLORS.SHADOW,
    shadowOffset: COMPONENT_SPACING.CARD_SHADOW_OFFSET,
    shadowOpacity: 0.1,
    shadowRadius: COMPONENT_SPACING.CARD_SHADOW_RADIUS,
    elevation: 3,
  },
  iconContainer: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: COLORS.BACKGROUND_DARK,
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
    color: COLORS.TEXT_SECONDARY,
  },
  chevron: {
    marginLeft: COMPONENT_SPACING.CARD_MARGIN,
  },
});

export default CalculatorCard;
