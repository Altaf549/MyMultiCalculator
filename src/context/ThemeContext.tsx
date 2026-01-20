import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useColorScheme, Appearance } from 'react-native';
import { COLORS, DARK_COLORS, ThemeColors} from '../styles/colors';

type ThemeType = 'light' | 'dark';
type ResolvedThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;  // 'light' | 'dark'
  resolvedTheme: ResolvedThemeType;  // 'light' | 'dark' (resolved value)
  colors: ThemeColors;
  isDark: boolean;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const systemColorScheme = useColorScheme() as ResolvedThemeType;
  const [theme, setTheme] = useState<ThemeType>(systemColorScheme || 'light');
  const resolvedTheme = theme;
  
  // Auto-update theme when system theme changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme((colorScheme as ResolvedThemeType) || 'light');
    });

    return () => subscription.remove();
  }, []);
  
  const isDark = resolvedTheme === 'dark';
  const colors = isDark ? DARK_COLORS : COLORS;


  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value = useMemo(() => ({
    theme,
    resolvedTheme,
    colors,
    isDark,
    setTheme,
    toggleTheme,
  }), [theme, resolvedTheme, isDark, colors]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
