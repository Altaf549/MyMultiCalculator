import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { scale, moderateScale } from '../utils/scaling';
import { COLORS } from '../styles/colors';
import { TEXT_STYLES, FONT_WEIGHTS } from '../styles/typography';
import { COMPONENT_SPACING } from '../styles/spacing';
import { BMI_CALCULATOR } from '../utils/constants';

interface HeightUnitSelectorProps {
  selectedUnit: 'cm' | 'ft/in';
  onUnitChange: (unit: 'cm' | 'ft/in') => void;
}

const HeightUnitSelector: React.FC<HeightUnitSelectorProps> = ({
  selectedUnit,
  onUnitChange,
}) => {
  return (
    <View style={[
      styles.container,
      
    ]}>
      <TouchableOpacity
        style={[
          styles.unitButton,
          selectedUnit === BMI_CALCULATOR.HEIGHT_UNITS.CM && styles.activeButton,
          selectedUnit === BMI_CALCULATOR.HEIGHT_UNITS.CM ? styles.cmRadius : styles.ftInRadius
        ]}
        onPress={() => onUnitChange(BMI_CALCULATOR.HEIGHT_UNITS.CM)}
      >
        <Text
          style={[
            styles.unitText,
            selectedUnit === BMI_CALCULATOR.HEIGHT_UNITS.CM && styles.activeText,
          ]}
        >
          {BMI_CALCULATOR.HEIGHT_UNITS.CM}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.unitButton,
          selectedUnit === BMI_CALCULATOR.HEIGHT_UNITS.FEET_INCHES && styles.activeButton,
          selectedUnit === BMI_CALCULATOR.HEIGHT_UNITS.CM ? styles.cmRadius : styles.ftInRadius
        ]}
        onPress={() => onUnitChange(BMI_CALCULATOR.HEIGHT_UNITS.FEET_INCHES)}
      >
        <Text
          style={[
            styles.unitText,
            selectedUnit === BMI_CALCULATOR.HEIGHT_UNITS.FEET_INCHES && styles.activeText,
          ]}
        >
          {BMI_CALCULATOR.HEIGHT_UNITS.FEET_INCHES}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderRadius: COMPONENT_SPACING.INPUT_BORDER_RADIUS,
    borderColor: COLORS.BORDER,
    borderWidth: 1,
  },
  unitButton: {
    flex: 1,
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  unitText: {
    ...TEXT_STYLES.BUTTON,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: FONT_WEIGHTS.MEDIUM,
  },
  activeText: {
    color: COLORS.BACKGROUND,
  },
  cmRadius: {
    borderTopLeftRadius: COMPONENT_SPACING.INPUT_BORDER_RADIUS,
    borderBottomLeftRadius: COMPONENT_SPACING.INPUT_BORDER_RADIUS,
  },
  ftInRadius: {
    borderTopRightRadius: COMPONENT_SPACING.INPUT_BORDER_RADIUS,
    borderBottomRightRadius: COMPONENT_SPACING.INPUT_BORDER_RADIUS,
  },
  ftInMargins: {
    marginTop: COMPONENT_SPACING.INPUT_MARGIN,
    marginBottom: COMPONENT_SPACING.INPUT_MARGIN,
  },
});

export default HeightUnitSelector;
