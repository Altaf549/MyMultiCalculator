import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { scale, moderateScale } from '../utils/scaling';
import { useTheme } from '../context/ThemeContext';
import { TEXT_STYLES, FONT_WEIGHTS } from '../styles/typography';
import { COMPONENT_SPACING, SPACING } from '../styles/spacing';
import { BMI_CALCULATOR, COMMON } from '../utils/constants';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import HeightUnitSelector from '../components/HeightUnitSelector';
import { SafeAreaView } from 'react-native-safe-area-context';

const BmiScreen: React.FC = () => {
  const { colors } = useTheme();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft/in'>(BMI_CALCULATOR.HEIGHT_UNITS.CM);
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = () => {
    const weightValue = parseFloat(weight);
    let heightValueInMeters: number;

    if (heightUnit === BMI_CALCULATOR.HEIGHT_UNITS.CM) {
      const heightCm = parseFloat(height);
      heightValueInMeters = heightCm / 100; // Convert cm to m
    } else {
      const feetValue = parseFloat(feet);
      const inchesValue = parseFloat(inches);
      const totalInches = feetValue * 12 + inchesValue;
      heightValueInMeters = totalInches * 0.0254; // Convert inches to m
    }

    if (weightValue > 0 && heightValueInMeters > 0) {
      const bmiValue = weightValue / (heightValueInMeters * heightValueInMeters);
      setBmi(Math.round(bmiValue * 10) / 10);

      let bmiCategory = '';
      if (bmiValue < 18.5) {
        bmiCategory = BMI_CALCULATOR.CATEGORIES.UNDERWEIGHT;
      } else if (bmiValue < 25) {
        bmiCategory = BMI_CALCULATOR.CATEGORIES.NORMAL;
      } else if (bmiValue < 30) {
        bmiCategory = BMI_CALCULATOR.CATEGORIES.OVERWEIGHT;
      } else {
        bmiCategory = BMI_CALCULATOR.CATEGORIES.OBESE;
      }
      setCategory(bmiCategory);
    }
  };

  const reset = () => {
    setWeight('');
    setHeight('');
    setFeet('');
    setInches('');
    setBmi(null);
    setCategory('');
  };

  const isHeightValid = () => {
    if (heightUnit === BMI_CALCULATOR.HEIGHT_UNITS.CM) {
      return height !== '' && parseFloat(height) > 0;
    } else {
      const feetValue = parseFloat(feet);
      const inchesValue = parseFloat(inches);
      return (feetValue > 0 || inchesValue > 0) && (feetValue >= 0 && inchesValue >= 0 && inchesValue < 12);
    }
  };

  const handleUnitChange = (unit: 'cm' | 'ft/in') => {
    setHeightUnit(unit);
    setHeight('');
    setFeet('');
    setInches('');
    setBmi(null);
    setCategory('');
  };

  const getCategoryColor = () => {
    switch (category) {
      case BMI_CALCULATOR.CATEGORIES.UNDERWEIGHT:
        return colors.BMI_UNDERWEIGHT;
      case BMI_CALCULATOR.CATEGORIES.NORMAL:
        return colors.BMI_NORMAL;
      case BMI_CALCULATOR.CATEGORIES.OVERWEIGHT:
        return colors.BMI_OVERWEIGHT;
      case BMI_CALCULATOR.CATEGORIES.OBESE:
        return colors.BMI_OBESE;
      default:
        return colors.TEXT_PRIMARY;
    }
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputSection}>
          <AppInput
            label={BMI_CALCULATOR.WEIGHT_LABEL}
            value={weight}
            onChangeText={setWeight}
            placeholder={BMI_CALCULATOR.WEIGHT_PLACEHOLDER}
            keyboardType="numeric"
            leftIcon="monitor-weight"
          />
          <HeightUnitSelector
            selectedUnit={heightUnit}
            onUnitChange={handleUnitChange}
          />
          {heightUnit === BMI_CALCULATOR.HEIGHT_UNITS.CM ? (
            <AppInput
              label={`${BMI_CALCULATOR.HEIGHT_LABEL} (${BMI_CALCULATOR.HEIGHT_UNITS.CM})`}
              value={height}
              onChangeText={setHeight}
              placeholder={BMI_CALCULATOR.HEIGHT_PLACEHOLDER}
              keyboardType="numeric"
              leftIcon="height"
            />
          ) : (
            <View style={styles.feetInchesContainer}>
              <AppInput
                label={BMI_CALCULATOR.FEET_LABEL}
                value={feet}
                onChangeText={setFeet}
                placeholder={BMI_CALCULATOR.FEET_PLACEHOLDER}
                keyboardType="numeric"
                leftIcon="height"
                containerStyle={styles.halfWidthInput}
              />
              <AppInput
                label={BMI_CALCULATOR.INCHES_LABEL}
                value={inches}
                onChangeText={setInches}
                placeholder={BMI_CALCULATOR.INCHES_PLACEHOLDER}
                keyboardType="numeric"
                leftIcon="height"
                containerStyle={styles.halfWidthInput}
              />
            </View>
          )}
        </View>

        <View style={styles.buttonSection}>
          <AppButton
            title={COMMON.CALCULATE}
            onPress={calculateBMI}
            disabled={!weight || !isHeightValid()}
          />
          <AppButton
            title={COMMON.RESET}
            onPress={reset}
            variant="outline"
          />
        </View>

        {bmi !== null && (
          <View style={[styles.resultSection, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER}]}>
            <View style={styles.resultHeader}>
              <Text style={[styles.resultLabel, { color: colors.TEXT_SECONDARY }]}>{COMMON.RESULT}</Text>
              <Text style={[styles.bmiValue, { color: colors.PRIMARY }]}>{bmi}</Text>
            </View>
            <View style={styles.bmiIndicator}>
              <View style={styles.bmiScale}>
                <View style={[styles.scaleSegment, { backgroundColor: colors.BMI_UNDERWEIGHT }]} />
                <View style={[styles.scaleSegment, { backgroundColor: colors.BMI_NORMAL }]} />
                <View style={[styles.scaleSegment, { backgroundColor: colors.BMI_OVERWEIGHT }]} />
                <View style={[styles.scaleSegment, { backgroundColor: colors.BMI_OBESE }]} />
              </View>
              <View 
                style={[
                  styles.bmiPointer, 
                  { 
                    backgroundColor: getCategoryColor(),
                    left: `${Math.min(Math.max((bmi - 15) * 5, 0), 80)}%` 
                  }
                ]} 
              />
            </View>
          </View>
        )}

        <View style={[styles.infoSection]}>
          <Text style={[styles.infoTitle, { color: colors.TEXT_PRIMARY }]}>BMI Categories:</Text>
          <Text style={[styles.infoItem, { color: colors.BMI_UNDERWEIGHT }]}>
            Underweight: {'< 18.5'}
          </Text>
          <Text style={[styles.infoItem, { color: colors.BMI_NORMAL }]}>
            Normal weight: 18.5 - 24.9
          </Text>
          <Text style={[styles.infoItem, { color: colors.BMI_OVERWEIGHT }]}>
            Overweight: 25 - 29.9
          </Text>
          <Text style={[styles.infoItem, { color: colors.BMI_OBESE }]}>
            Obese: {'≥ 30'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  content: {
    padding: COMPONENT_SPACING.SCREEN_PADDING,
  },
  inputSection: {
    marginBottom: SPACING.XXS,
  },
  buttonSection: {
    marginBottom: SPACING.MD,
  },
  resultSection: {
    padding: SPACING.SM,
    borderWidth: 1,
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
  },
  resultHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  bmiContainer: {
    alignItems: 'flex-start' as const,
    marginBottom: SPACING.XS,
  },
  bmiIndicator: {
    position: 'relative' as const,
    height: scale(6),
    marginBottom: SPACING.XS,
  },
  bmiScale: {
    flexDirection: 'row' as const,
    height: scale(6),
    borderRadius: scale(3),
    overflow: 'hidden' as const,
  },
  scaleSegment: {
    flex: 1,
    height: scale(6),
  },
  bmiPointer: {
    position: 'absolute' as const,
    top: scale(-3),
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
  },
  resultLabel: {
    ...TEXT_STYLES.LABEL,
    marginBottom: SPACING.XS,
  },
  bmiValue: {
    ...TEXT_STYLES.RESULT,
    marginBottom: SPACING.XS,
  },
  category: {
    ...TEXT_STYLES.H5,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
  infoSection: {
    padding: SPACING.XS,
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
  },
  infoTitle: {
    ...TEXT_STYLES.H6,
    marginBottom: SPACING.XS,
  },
  infoItem: {
    ...TEXT_STYLES.BODY,
    marginBottom: SPACING.XS,
  },
  feetInchesContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    gap: SPACING.SM,
  },
  halfWidthInput: {
    flex: 1,
  },
};

export default BmiScreen;
