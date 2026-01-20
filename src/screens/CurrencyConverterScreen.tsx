import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { scale } from '../utils/scaling';
import { useTheme } from '../context/ThemeContext';
import { TEXT_STYLES, FONT_WEIGHTS } from '../styles/typography';
import { COMPONENT_SPACING, SPACING } from '../styles/spacing';
import { CURRENCY_CONVERTER, COMMON, API } from '../utils/constants';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { currencies } from '../mockData/CourencyData';

interface ExchangeRate {
  [key: string]: number;
}

const CurrencyConverterScreen: React.FC = () => {
  const { colors } = useTheme();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState(API.DEFAULT_CURRENCY);
  const [toCurrency, setToCurrency] = useState('INR');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate>({});
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API.CURRENCY_API_BASE_URL}${API.DEFAULT_CURRENCY}`);
      setExchangeRates(response.data.rates);
    } catch (err) {
      setError(CURRENCY_CONVERTER.ERROR_FETCHING);
    } finally {
      setLoading(false);
    }
  };

  const convertCurrency = () => {
    const amt = parseFloat(amount);
    if (amt > 0 && exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      // Convert from source currency to USD, then to target currency
      const usdAmount = fromCurrency === API.DEFAULT_CURRENCY 
        ? amt 
        : amt / exchangeRates[fromCurrency];
      const converted = toCurrency === API.DEFAULT_CURRENCY 
        ? usdAmount 
        : usdAmount * exchangeRates[toCurrency];
      
      setConvertedAmount(Math.round(converted * 100) / 100);
    }
  };

  const reset = () => {
    setAmount('');
    setConvertedAmount(null);
    setError('');
  };

  const getExchangeRate = () => {
    if (fromCurrency === API.DEFAULT_CURRENCY) {
      return exchangeRates[toCurrency] || 0;
    } else if (toCurrency === API.DEFAULT_CURRENCY) {
      return 1 / (exchangeRates[fromCurrency] || 1);
    } else {
      return (exchangeRates[toCurrency] || 0) / (exchangeRates[fromCurrency] || 1);
    }
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputSection}>
          <AppInput
            label={CURRENCY_CONVERTER.AMOUNT_LABEL}
            value={amount}
            onChangeText={setAmount}
            placeholder={CURRENCY_CONVERTER.AMOUNT_PLACEHOLDER}
            keyboardType="numeric"
            leftIcon="currency-exchange"
          />

          <View style={styles.currencyRow}>
            <View style={[styles.pickerContainer, { marginTop: SPACING.XS }]}>
              <Text style={[styles.pickerLabel, { color: colors.TEXT_PRIMARY }]}>{CURRENCY_CONVERTER.FROM_LABEL}</Text>
              <Dropdown
                data={currencies.map(currency => ({ 
                  label: currency, 
                  value: currency.split(' ')[0] // Extract currency code
                }))}
                labelField="label"
                valueField="value"
                value={fromCurrency}
                onChange={item => setFromCurrency(item.value)}
                style={[styles.dropdown, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER }]}
                placeholderStyle={[styles.placeholderStyle, { color: colors.TEXT_SECONDARY }]}
                selectedTextStyle={[styles.selectedTextStyle, { color: colors.TEXT_PRIMARY }]}
                inputSearchStyle={[styles.inputSearchStyle, { color: colors.TEXT_PRIMARY }]}
                iconStyle={styles.iconStyle}
                disable={loading}
                search
                maxHeight={300}
                placeholder="Select currency"
              />
            </View>

            <View style={[styles.pickerContainer, { marginTop: SPACING.SM }]}>
              <Text style={[styles.pickerLabel, { color: colors.TEXT_PRIMARY }]}>{CURRENCY_CONVERTER.TO_LABEL}</Text>
              <Dropdown
                data={currencies.map(currency => ({ 
                  label: currency, 
                  value: currency.split(' ')[0] // Extract currency code
                }))}
                labelField="label"
                valueField="value"
                value={toCurrency}
                onChange={item => setToCurrency(item.value)}
                style={[styles.dropdown, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER }]}
                placeholderStyle={[styles.placeholderStyle, { color: colors.TEXT_SECONDARY }]}
                selectedTextStyle={[styles.selectedTextStyle, { color: colors.TEXT_PRIMARY }]}
                inputSearchStyle={[styles.inputSearchStyle, { color: colors.TEXT_PRIMARY }]}
                iconStyle={styles.iconStyle}
                disable={loading}
                search
                maxHeight={300}
                placeholder="Select currency"
              />
            </View>
          </View>
        </View>

        <View style={styles.buttonSection}>
          <AppButton
            title={CURRENCY_CONVERTER.CONVERT}
            onPress={convertCurrency}
            disabled={!amount || loading}
            loading={loading}
          />
          <AppButton
            title={COMMON.RESET}
            onPress={reset}
            variant="outline"
          />
        </View>

        {loading && (
          <View style={styles.loadingSection}>
            <ActivityIndicator size="large" color={colors.PRIMARY} />
            <Text style={[styles.loadingText, { color: colors.TEXT_SECONDARY }]}>{CURRENCY_CONVERTER.LOADING_RATES}</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorSection}>
            <Text style={[styles.errorText, { color: colors.ERROR }]}>{error}</Text>
            <AppButton
              title="Retry"
              onPress={fetchExchangeRates}
              variant="outline"
              size="small"
            />
          </View>
        )}

        {convertedAmount !== null && !loading && !error && (
          <View style={[styles.resultSection, { backgroundColor: colors.CARD_BACKGROUND, borderColor: colors.BORDER }]}>
            <Text style={[styles.resultLabel, { color: colors.TEXT_SECONDARY }]}>{COMMON.RESULT}</Text>
            <Text style={[styles.resultValue, { color: colors.PRIMARY }]}>
              {convertedAmount.toFixed(2)} {toCurrency}
            </Text>
            <Text style={[styles.exchangeRate, { color: colors.TEXT_SECONDARY }]}>
              {CURRENCY_CONVERTER.EXCHANGE_RATE}: 1 {fromCurrency} = {getExchangeRate().toFixed(4)} {toCurrency}
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
  inputSection: {
    marginBottom: SPACING.SM,
  },
  currencyRow: {
    flex: 1,
    justifyContent: 'space-between' as const,
  },
  pickerContainer: {
    flex: 1,
  },
  pickerLabel: {
    ...TEXT_STYLES.LABEL,
    marginBottom: SPACING.XS,
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    borderRadius: COMPONENT_SPACING.INPUT_BORDER_RADIUS,
    height: COMPONENT_SPACING.INPUT_MIN_HEIGHT,
    paddingHorizontal: SPACING.SM,
  },
  placeholderStyle: {
    ...TEXT_STYLES.BODY,
  },
  selectedTextStyle: {
    ...TEXT_STYLES.BODY,
  },
  inputSearchStyle: {
    ...TEXT_STYLES.BODY,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  buttonSection: {
    marginBottom: SPACING.MD,
  },
  loadingSection: {
    alignItems: 'center' as const,
    padding: SPACING.LG,
  },
  loadingText: {
    ...TEXT_STYLES.BODY,
    marginTop: SPACING.SM,
  },
  errorSection: {
    alignItems: 'center' as const,
    padding: SPACING.LG,
  },
  errorText: {
    ...TEXT_STYLES.ERROR,
    marginBottom: SPACING.MD,
    textAlign: 'center' as const,
  },
  resultSection: {
    padding: SPACING.SM,
    paddingBottom: SPACING.SM,
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
    alignItems: 'center' as const,
    borderWidth: 1,
  },
  resultLabel: {
    ...TEXT_STYLES.LABEL,
    marginBottom: SPACING.XS,
  },
  resultValue: {
    ...TEXT_STYLES.RESULT,
    fontWeight: FONT_WEIGHTS.BOLD,
    marginBottom: SPACING.XXS,
  },
  exchangeRate: {
    ...TEXT_STYLES.BODY_SMALL,
    textAlign: 'center' as const,
  },
};

export default CurrencyConverterScreen;
