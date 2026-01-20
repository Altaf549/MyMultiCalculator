import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { scale } from '../utils/scaling';
import { COLORS } from '../styles/colors';
import { TEXT_STYLES, FONT_WEIGHTS } from '../styles/typography';
import { COMPONENT_SPACING, SPACING } from '../styles/spacing';
import { CURRENCY_CONVERTER, COMMON, API } from '../utils/constants';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ExchangeRate {
  [key: string]: number;
}

const CurrencyConverterScreen: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState(API.DEFAULT_CURRENCY);
  const [toCurrency, setToCurrency] = useState('INR');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate>({});
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currencies = [
    'USD',  'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AUD', 'AWG', 'AZN',  'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNH', 'CNY', 'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KID', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SLL', 'SOS', 'SRD', 'SSP', 'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XCG', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWG', 'ZWL'
  ];

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
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
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
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>{CURRENCY_CONVERTER.FROM_LABEL}</Text>
              <Picker
                selectedValue={fromCurrency}
                onValueChange={setFromCurrency}
                style={styles.picker}
                enabled={!loading}
              >
                {currencies.map(currency => (
                  <Picker.Item key={currency} label={currency} value={currency} />
                ))}
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>{CURRENCY_CONVERTER.TO_LABEL}</Text>
              <Picker
                selectedValue={toCurrency}
                onValueChange={setToCurrency}
                style={styles.picker}
                enabled={!loading}
              >
                {currencies.map(currency => (
                  <Picker.Item key={currency} label={currency} value={currency} />
                ))}
              </Picker>
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
            <ActivityIndicator size="large" color={COLORS.PRIMARY} />
            <Text style={styles.loadingText}>{CURRENCY_CONVERTER.LOADING_RATES}</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorSection}>
            <Text style={styles.errorText}>{error}</Text>
            <AppButton
              title="Retry"
              onPress={fetchExchangeRates}
              variant="outline"
              size="small"
            />
          </View>
        )}

        {convertedAmount !== null && !loading && !error && (
          <View style={styles.resultSection}>
            <Text style={styles.resultLabel}>{COMMON.RESULT}</Text>
            <Text style={styles.resultValue}>
              {convertedAmount.toFixed(2)} {toCurrency}
            </Text>
            <Text style={styles.exchangeRate}>
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
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    padding: COMPONENT_SPACING.SCREEN_PADDING,
  },
  inputSection: {
    marginBottom: SPACING.LG,
  },
  currencyRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginBottom: SPACING.MD,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: SPACING.XS,
  },
  pickerLabel: {
    ...TEXT_STYLES.LABEL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SM,
  },
  picker: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: COMPONENT_SPACING.INPUT_BORDER_RADIUS,
    height: COMPONENT_SPACING.INPUT_MIN_HEIGHT,
  },
  buttonSection: {
    marginBottom: SPACING.LG,
  },
  loadingSection: {
    alignItems: 'center' as const,
    padding: SPACING.LG,
  },
  loadingText: {
    ...TEXT_STYLES.BODY,
    color: COLORS.TEXT_SECONDARY,
    marginTop: SPACING.SM,
  },
  errorSection: {
    alignItems: 'center' as const,
    padding: SPACING.LG,
  },
  errorText: {
    ...TEXT_STYLES.ERROR,
    color: COLORS.ERROR,
    marginBottom: SPACING.MD,
    textAlign: 'center' as const,
  },
  resultSection: {
    backgroundColor: COLORS.CARD_BACKGROUND,
    padding: SPACING.LG,
    borderRadius: COMPONENT_SPACING.CARD_BORDER_RADIUS,
    alignItems: 'center' as const,
    shadowColor: COLORS.SHADOW,
    shadowOffset: COMPONENT_SPACING.CARD_SHADOW_OFFSET,
    shadowOpacity: 0.1,
    shadowRadius: COMPONENT_SPACING.CARD_SHADOW_RADIUS,
    elevation: 3,
  },
  resultLabel: {
    ...TEXT_STYLES.LABEL,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.MD,
  },
  resultValue: {
    ...TEXT_STYLES.RESULT,
    color: COLORS.PRIMARY,
    fontWeight: FONT_WEIGHTS.BOLD,
    marginBottom: SPACING.SM,
  },
  exchangeRate: {
    ...TEXT_STYLES.BODY_SMALL,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center' as const,
  },
};

export default CurrencyConverterScreen;
