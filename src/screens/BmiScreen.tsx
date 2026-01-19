import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { scale, moderateScale } from '../utils/scaling';
import { COLORS } from '../styles/colors';
import { TEXT_STYLES, FONT_WEIGHTS } from '../styles/typography';
import { COMPONENT_SPACING, SPACING } from '../styles/spacing';
import { BMI_CALCULATOR, COMMON } from '../utils/constants';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const BmiScreen: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height) / 100; // Convert cm to m

    if (weightValue > 0 && heightValue > 0) {
      const bmiValue = weightValue / (heightValue * heightValue);
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
    setBmi(null);
    setCategory('');
  };

  const getCategoryColor = () => {
    switch (category) {
      case BMI_CALCULATOR.CATEGORIES.UNDERWEIGHT:
        return COLORS.BMI_UNDERWEIGHT;
      case BMI_CALCULATOR.CATEGORIES.NORMAL:
        return COLORS.BMI_NORMAL;
      case BMI_CALCULATOR.CATEGORIES.OVERWEIGHT:
        return COLORS.BMI_OVERWEIGHT;
      case BMI_CALCULATOR.CATEGORIES.OBESE:
        return COLORS.BMI_OBESE;
      default:
        return COLORS.TEXT_PRIMARY;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <AppInput
            label={BMI_CALCULATOR.HEIGHT_LABEL}
            value={height}
            onChangeText={setHeight}
            placeholder={BMI_CALCULATOR.HEIGHT_PLACEHOLDER}
            keyboardType="numeric"
            leftIcon="height"
          />
        </View>

        <View style={styles.buttonSection}>
          <AppButton
            title={COMMON.CALCULATE}
            onPress={calculateBMI}
            disabled={!weight || !height}
          />
          <AppButton
            title={COMMON.RESET}
            onPress={reset}
            variant="outline"
          />
        </View>

        {bmi !== null && (
          <View style={styles.resultSection}>
            <Text style={styles.resultLabel}>{COMMON.RESULT}</Text>
            <Text style={styles.bmiValue}>{bmi}</Text>
            <Text style={[styles.category, { color: getCategoryColor() }]}>
              {category}
            </Text>
          </View>
        )}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>BMI Categories:</Text>
          <Text style={[styles.infoItem, { color: COLORS.BMI_UNDERWEIGHT }]}>
            Underweight: {'< 18.5'}
          </Text>
          <Text style={[styles.infoItem, { color: COLORS.BMI_NORMAL }]}>
            Normal weight: 18.5 - 24.9
          </Text>
          <Text style={[styles.infoItem, { color: COLORS.BMI_OVERWEIGHT }]}>
            Overweight: 25 - 29.9
          </Text>
          <Text style={[styles.infoItem, { color: COLORS.BMI_OBESE }]}>
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
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    padding: COMPONENT_SPACING.SCREEN_PADDING,
  },
  inputSection: {
    marginBottom: SPACING.LG,
  },
  buttonSection: {
    marginBottom: SPACING.LG,
  },
  resultSection: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    padding: SPACING.LG,
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
    alignItems: 'center' as const,
    marginBottom: SPACING.LG,
    shadowColor: COLORS.SHADOW,
    shadowOffset: COMPONENT_SPACING.CARD_SHADOW_OFFSET,
    shadowOpacity: 0.1,
    shadowRadius: COMPONENT_SPACING.CARD_SHADOW_RADIUS,
    elevation: 3,
  },
  resultLabel: {
    ...TEXT_STYLES.LABEL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SM,
  },
  bmiValue: {
    ...TEXT_STYLES.RESULT,
    color: COLORS.PRIMARY,
    marginBottom: SPACING.SM,
  },
  category: {
    ...TEXT_STYLES.H5,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
  infoSection: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    padding: SPACING.LG,
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
    shadowColor: COLORS.SHADOW,
    shadowOffset: COMPONENT_SPACING.CARD_SHADOW_OFFSET,
    shadowOpacity: 0.1,
    shadowRadius: COMPONENT_SPACING.CARD_SHADOW_RADIUS,
    elevation: 3,
  },
  infoTitle: {
    ...TEXT_STYLES.H6,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.MD,
  },
  infoItem: {
    ...TEXT_STYLES.BODY,
    marginBottom: SPACING.XS,
  },
};

export default BmiScreen;
