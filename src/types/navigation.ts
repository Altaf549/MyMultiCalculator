import { StackNavigationOptions } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  SimpleCalculator: undefined;
  ScientificCalculator: undefined;
  BMI: undefined;
  EMI: undefined;
  Age: undefined;
  GST: undefined;
  Discount: undefined;
  CurrencyConverter: undefined;
  UnitConverter: undefined;
  MathUtils: undefined;
};

export type NavigationProp<T extends keyof RootStackParamList> = {
  navigate: (screen: T, params?: RootStackParamList[T]) => void;
  goBack: () => void;
  reset: (state: any) => void;
  isFocused: () => boolean;
  addListener: (event: string, callback: () => void) => void;
  removeListener: (event: string, callback: () => void) => void;
  canGoBack: () => boolean;
  getId: () => string | undefined;
  getParent: () => any;
  getState: () => any;
  setParams: (params: Partial<RootStackParamList[T]>) => void;
  dispatch: (action: any) => void;
  isReady: () => boolean;
  replace: (screen: T, params?: RootStackParamList[T]) => void;
  push: (screen: T, params?: RootStackParamList[T]) => void;
  pop: (n?: number) => void;
  popToTop: () => void;
};

export type RouteProp<T extends keyof RootStackParamList> = {
  key: string;
  name: T;
  params?: RootStackParamList[T];
  path?: string;
};
