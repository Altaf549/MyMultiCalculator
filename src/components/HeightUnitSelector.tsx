import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { scale, moderateScale } from '../utils/scaling';
import { useTheme } from '../context/ThemeContext';
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
  const { colors } = useTheme();

  return (
    <View style={[
      styles.container,
      { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER }
    ]}>
      <TouchableOpacity
        style={[
          styles.unitButton,
          selectedUnit === BMI_CALCULATOR.HEIGHT_UNITS.CM && { backgroundColor: colors.PRIMARY },
          selectedUnit === BMI_CALCULATOR.HEIGHT_UNITS.CM ? styles.cmRadius : styles.ftInRadius
        ]}
        onPress={() => onUnitChange(BMI_CALCULATOR.HEIGHT_UNITS.CM)}
      >
        <Text
          style={[
            styles.unitText,
            { color: selectedUnit === BMI_CALCULATOR.HEIGHT_UNITS.CM ? colors.BACKGROUND : colors.TEXT_SECONDARY },
          ]}
        >
          {BMI_CALCULATOR.HEIGHT_UNITS.CM}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.unitButton,
          selectedUnit === BMI_CALCULATOR.HEIGHT_UNITS.FEET_INCHES && { backgroundColor: colors.PRIMARY },
          selectedUnit === BMI_CALCULATOR.HEIGHT_UNITS.CM ? styles.cmRadius : styles.ftInRadius
        ]}
        onPress={() => onUnitChange(BMI_CALCULATOR.HEIGHT_UNITS.FEET_INCHES)}
      >
        <Text
          style={[
            styles.unitText,
            { color: selectedUnit === BMI_CALCULATOR.HEIGHT_UNITS.FEET_INCHES ? colors.BACKGROUND : colors.TEXT_SECONDARY },
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
    borderRadius: COMPONENT_SPACING.INPUT_BORDER_RADIUS,
    borderWidth: 1,
  },
  unitButton: {
    flex: 1,
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  unitText: {
    ...TEXT_STYLES.BUTTON,
    fontWeight: FONT_WEIGHTS.MEDIUM,
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
