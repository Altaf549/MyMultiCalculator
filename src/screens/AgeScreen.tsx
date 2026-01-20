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
    totalHours: 0,
    totalMinutes: 0,
    totalSeconds: 0,
  });

  const calculateAge = () => {
    const today = new Date();
    const birth = new Date(birthDate);
    
    // Check if birth date is in the future
    if (birth > today) {
      setAge({ years: -1, months: 0, days: 0, totalDays: 0, totalHours: 0, totalMinutes: 0, totalSeconds: 0 });
      return;
    }
    
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
    const totalHours = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60));
    const totalMinutes = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60));
    const totalSeconds = Math.floor((today.getTime() - birth.getTime()) / 1000);

    setAge({ years, months, days, totalDays, totalHours, totalMinutes, totalSeconds });
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
        <TouchableOpacity style={[styles.datePickerButton, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER }]} onPress={showDatePicker}>
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

        {age.years === -1 ? (
          <View style={[styles.resultSection, { backgroundColor: colors.CARD_BACKGROUND }]}>
            <Text style={[styles.errorText, { color: colors.ERROR }]}>
              Birth date cannot be in the future
            </Text>
          </View>
        ) : (
          <View style={[styles.resultSection, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER, borderWidth: 1 }]}>
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
            <Text style={[styles.totalDays, { color: colors.TEXT_PRIMARY }]}>
              {AGE_CALCULATOR.TOTAL_HOURS}: {age.totalHours.toLocaleString()}
            </Text>
            <Text style={[styles.totalDays, { color: colors.TEXT_PRIMARY }]}>
              {AGE_CALCULATOR.TOTAL_MINUTES}: {age.totalMinutes.toLocaleString()}
            </Text>
            <Text style={[styles.totalDays, { color: colors.TEXT_PRIMARY }]}>
              {AGE_CALCULATOR.TOTAL_SECONDS}: {age.totalSeconds.toLocaleString()}
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
    marginBottom: SPACING.XS,
    borderWidth: 1,
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
    marginBottom: SPACING.SM,
  },
  resultSection: {
    padding: SPACING.SM,
    paddingBottom: SPACING.XS,
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
    alignItems: 'center' as const,
    borderWidth: 1,
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
  errorText: {
    ...TEXT_STYLES.BODY,
    textAlign: 'center' as const,
  },
};

export default AgeScreen;
