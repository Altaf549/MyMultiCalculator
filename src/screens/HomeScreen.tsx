import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import CalculatorCard from '../components/CalculatorCard';
import { scale, moderateScale } from '../utils/scaling';
import { useTheme } from '../context/ThemeContext';
import { TEXT_STYLES } from '../styles/typography';
import { COMPONENT_SPACING } from '../styles/spacing';
import { CALCULATORS, HOME_SCREEN } from '../utils/constants';
import { RootStackParamList } from '../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SIMPLE_CALCULATOR, SCIENTIFIC_CALCULATOR, BMI, EMI, AGE, GST, DISCOUNT, CURRENCY_CONVERTER,UNIT_CONVERTER } from '../navigation/Routes';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { colors } = useTheme();

  const calculators = [
    {
      key: 'simple',
      title: CALCULATORS.SIMPLE.NAME,
      description: CALCULATORS.SIMPLE.DESCRIPTION,
      iconName: CALCULATORS.SIMPLE.ICON,
      onPress: () => navigation.navigate(SIMPLE_CALCULATOR),
      color: colors.SIMPLE_CALCULATOR,
    },
    {
      key: 'scientific',
      title: CALCULATORS.SCIENTIFIC.NAME,
      description: CALCULATORS.SCIENTIFIC.DESCRIPTION,
      iconName: CALCULATORS.SCIENTIFIC.ICON,
      onPress: () => navigation.navigate(SCIENTIFIC_CALCULATOR),
      color: colors.SCIENTIFIC_CALCULATOR,
    },
    {
      key: 'bmi',
      title: CALCULATORS.BMI.NAME,
      description: CALCULATORS.BMI.DESCRIPTION,
      iconName: CALCULATORS.BMI.ICON,
      onPress: () => navigation.navigate(BMI),
      color: colors.BMI_CALCULATOR,
    },
    {
      key: 'emi',
      title: CALCULATORS.EMI.NAME,
      description: CALCULATORS.EMI.DESCRIPTION,
      iconName: CALCULATORS.EMI.ICON,
      onPress: () => navigation.navigate(EMI),
      color: colors.EMI_CALCULATOR,
    },
    {
      key: 'age',
      title: CALCULATORS.AGE.NAME,
      description: CALCULATORS.AGE.DESCRIPTION,
      iconName: CALCULATORS.AGE.ICON,
      onPress: () => navigation.navigate(AGE),
      color: colors.AGE_CALCULATOR,
    },
    {
      key: 'gst',
      title: CALCULATORS.GST.NAME,
      description: CALCULATORS.GST.DESCRIPTION,
      iconName: CALCULATORS.GST.ICON,
      onPress: () => navigation.navigate(GST),
      color: colors.GST_CALCULATOR,
    },
    {
      key: 'discount',
      title: CALCULATORS.DISCOUNT.NAME,
      description: CALCULATORS.DISCOUNT.DESCRIPTION,
      iconName: CALCULATORS.DISCOUNT.ICON,
      onPress: () => navigation.navigate(DISCOUNT),
      color: colors.DISCOUNT_CALCULATOR,
    },
    {
      key: 'currency',
      title: CALCULATORS.CURRENCY.NAME,
      description: CALCULATORS.CURRENCY.DESCRIPTION,
      iconName: CALCULATORS.CURRENCY.ICON,
      onPress: () => navigation.navigate(CURRENCY_CONVERTER),
      color: colors.CURRENCY_CALCULATOR,
    },
    {
      key: 'unit-converter',
      title: CALCULATORS.UNIT_CONVERTER.NAME,
      description: CALCULATORS.UNIT_CONVERTER.DESCRIPTION,
      iconName: CALCULATORS.UNIT_CONVERTER.ICON,
      onPress: () => navigation.navigate(UNIT_CONVERTER),
      color: colors.UNIT_CONVERTER,
    },
  ];

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView
        style={[styles.scrollView, { backgroundColor: colors.BACKGROUND }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {calculators.map((calculator) => (
          <CalculatorCard
            key={calculator.key}
            title={calculator.title}
            description={calculator.description}
            iconName={calculator.iconName}
            onPress={calculator.onPress}
            color={calculator.color}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...TEXT_STYLES.H2,
    marginBottom: scale(8),
  },
  subtitle: {
    ...TEXT_STYLES.BODY,
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: COMPONENT_SPACING.CARD_PADDING,
  },
});

export default HomeScreen;
