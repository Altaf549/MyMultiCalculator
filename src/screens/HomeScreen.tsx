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
// No need to import individual routes anymore

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { colors } = useTheme();

  const calculators = Object.values(CALCULATORS).map((calculator) => ({
    key: calculator.NAME.toLowerCase().replace(/\s+/g, '-'),
    title: calculator.NAME,
    description: calculator.DESCRIPTION,
    iconName: calculator.ICON,
    onPress: () => navigation.navigate(calculator.ROUTE as keyof RootStackParamList),
    color: colors[calculator.COLOR_KEY as keyof typeof colors] || colors.PRIMARY,
  }));

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
