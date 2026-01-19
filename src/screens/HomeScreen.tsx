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
import { COLORS } from '../styles/colors';
import { TEXT_STYLES } from '../styles/typography';
import { COMPONENT_SPACING } from '../styles/spacing';
import { CALCULATORS, HOME_SCREEN } from '../utils/constants';
import { RootStackParamList } from '../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const calculators = [
    {
      key: 'simple',
      title: CALCULATORS.SIMPLE.NAME,
      description: CALCULATORS.SIMPLE.DESCRIPTION,
      iconName: CALCULATORS.SIMPLE.ICON,
      onPress: () => navigation.navigate('SimpleCalculator'),
      color: COLORS.PRIMARY,
    },
    {
      key: 'scientific',
      title: CALCULATORS.SCIENTIFIC.NAME,
      description: CALCULATORS.SCIENTIFIC.DESCRIPTION,
      iconName: CALCULATORS.SCIENTIFIC.ICON,
      onPress: () => navigation.navigate('ScientificCalculator'),
      color: COLORS.SECONDARY,
    },
    {
      key: 'bmi',
      title: CALCULATORS.BMI.NAME,
      description: CALCULATORS.BMI.DESCRIPTION,
      iconName: CALCULATORS.BMI.ICON,
      onPress: () => navigation.navigate('BMI'),
      color: COLORS.SUCCESS,
    },
    {
      key: 'emi',
      title: CALCULATORS.EMI.NAME,
      description: CALCULATORS.EMI.DESCRIPTION,
      iconName: CALCULATORS.EMI.ICON,
      onPress: () => navigation.navigate('EMI'),
      color: COLORS.WARNING,
    },
    {
      key: 'age',
      title: CALCULATORS.AGE.NAME,
      description: CALCULATORS.AGE.DESCRIPTION,
      iconName: CALCULATORS.AGE.ICON,
      onPress: () => navigation.navigate('Age'),
      color: COLORS.INFO,
    },
    {
      key: 'gst',
      title: CALCULATORS.GST.NAME,
      description: CALCULATORS.GST.DESCRIPTION,
      iconName: CALCULATORS.GST.ICON,
      onPress: () => navigation.navigate('GST'),
      color: COLORS.SECONDARY_LIGHT,
    },
    {
      key: 'discount',
      title: CALCULATORS.DISCOUNT.NAME,
      description: CALCULATORS.DISCOUNT.DESCRIPTION,
      iconName: CALCULATORS.DISCOUNT.ICON,
      onPress: () => navigation.navigate('Discount'),
      color: COLORS.SUCCESS_LIGHT,
    },
    {
      key: 'currency',
      title: CALCULATORS.CURRENCY.NAME,
      description: CALCULATORS.CURRENCY.DESCRIPTION,
      iconName: CALCULATORS.CURRENCY.ICON,
      onPress: () => navigation.navigate('CurrencyConverter'),
      color: COLORS.PRIMARY_DARK,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
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
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    padding: COMPONENT_SPACING.SCREEN_PADDING,
    backgroundColor: COLORS.PRIMARY,
    paddingBottom: scale(24),
  },
  title: {
    ...TEXT_STYLES.H2,
    color: COLORS.TEXT_WHITE,
    marginBottom: scale(8),
  },
  subtitle: {
    ...TEXT_STYLES.BODY,
    color: COLORS.TEXT_WHITE,
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollContent: {
    paddingVertical: COMPONENT_SPACING.SCREEN_PADDING,
  },
});

export default HomeScreen;
