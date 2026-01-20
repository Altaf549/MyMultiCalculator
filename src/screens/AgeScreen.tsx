import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scale } from '../utils/scaling';
import { useTheme } from '../context/ThemeContext';
import { TEXT_STYLES, FONT_WEIGHTS } from '../styles/typography';
import { COMPONENT_SPACING, SPACING } from '../styles/spacing';
import { AGE_CALCULATOR, COMMON } from '../utils/constants';
import AppButton from '../components/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const AgeScreen: React.FC = () => {
  const { colors } = useTheme();
  const [birthDate, setBirthDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
    totalDays: 0,
  });

  const calculateAge = () => {
    const today = new Date();
    const birth = new Date(birthDate);
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    setAge({ years, months, days, totalDays });
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  return (
    <SafeAreaView  edges={['bottom', 'left', 'right']} style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={[styles.datePickerButton, { backgroundColor: colors.CARD_BACKGROUND }]} onPress={showDatePicker}>
          <Text style={[styles.datePickerLabel, { color: colors.TEXT_SECONDARY }]}>{AGE_CALCULATOR.BIRTH_DATE_LABEL}</Text>
          <Text style={[styles.selectedDate, { color: colors.PRIMARY }]}>
            {birthDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            maximumDate={new Date()}
          />
        )}

        <View style={styles.buttonSection}>
          <AppButton
            title={COMMON.CALCULATE}
            onPress={calculateAge}
          />
        </View>

        {age.years > 0 && (
          <View style={[styles.resultSection, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Text style={[styles.resultLabel, { color: colors.TEXT_SECONDARY }]}>{COMMON.RESULT}</Text>
            
            <View style={styles.ageRow}>
              <View style={styles.ageItem}>
                <Text style={[styles.ageValue, { color: colors.PRIMARY }]}>{age.years}</Text>
                <Text style={[styles.ageLabel, { color: colors.TEXT_SECONDARY }]}>{AGE_CALCULATOR.YEARS}</Text>
              </View>
              <View style={styles.ageItem}>
                <Text style={[styles.ageValue, { color: colors.PRIMARY }]}>{age.months}</Text>
                <Text style={[styles.ageLabel, { color: colors.TEXT_SECONDARY }]}>{AGE_CALCULATOR.MONTHS}</Text>
              </View>
              <View style={styles.ageItem}>
                <Text style={[styles.ageValue, { color: colors.PRIMARY }]}>{age.days}</Text>
                <Text style={[styles.ageLabel, { color: colors.TEXT_SECONDARY }]}>{AGE_CALCULATOR.DAYS}</Text>
              </View>
            </View>
            
            <Text style={[styles.totalDays, { color: colors.TEXT_PRIMARY }]}>
              {AGE_CALCULATOR.TOTAL_DAYS}: {age.totalDays}
            </Text>
          </View>
        )}
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
  datePickerButton: {
    padding: SPACING.LG,
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
    marginBottom: SPACING.LG,
    shadowColor: '#000000',
    shadowOffset: COMPONENT_SPACING.CARD_SHADOW_OFFSET,
    shadowOpacity: 0.1,
    shadowRadius: COMPONENT_SPACING.CARD_SHADOW_RADIUS,
    elevation: 3,
  },
  datePickerLabel: {
    ...TEXT_STYLES.LABEL,
    marginBottom: SPACING.SM,
  },
  selectedDate: {
    ...TEXT_STYLES.H5,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
  },
  buttonSection: {
    marginBottom: SPACING.LG,
  },
  resultSection: {
    padding: SPACING.LG,
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
    alignItems: 'center' as const,
    shadowColor: '#000000',
    shadowOffset: COMPONENT_SPACING.CARD_SHADOW_OFFSET,
    shadowOpacity: 0.1,
    shadowRadius: COMPONENT_SPACING.CARD_SHADOW_RADIUS,
    elevation: 3,
  },
  resultLabel: {
    ...TEXT_STYLES.LABEL,
    marginBottom: SPACING.LG,
  },
  ageRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    width: '100%' as const,
    marginBottom: SPACING.LG,
  },
  ageItem: {
    alignItems: 'center' as const,
  },
  ageValue: {
    ...TEXT_STYLES.RESULT,
    marginBottom: SPACING.XS,
  },
  ageLabel: {
    ...TEXT_STYLES.BODY_SMALL,
  },
  totalDays: {
    ...TEXT_STYLES.BODY,
    fontWeight: FONT_WEIGHTS.MEDIUM,
  },
};

export default AgeScreen;
