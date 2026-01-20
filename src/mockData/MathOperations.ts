export const MATH_OPERATIONS = {
    SQUARE_ROOT: 'Square Root',
    POWER: 'Power',
    FACTORIAL: 'Factorial',
    PRIME_CHECK: 'Prime Check',
    LCM: 'LCM',
    GCD: 'GCD',
    BINARY_OPS: 'Binary Operations',
    BASE_CONVERTER: 'Base Converter'
} as const;

export const BINARY_OPERATIONS = [
    { label: 'AND', value: 'AND' },
    { label: 'OR', value: 'OR' },
    { label: 'XOR', value: 'XOR' },
    { label: 'NOT', value: 'NOT' },
];

export const BASE_CONVERSION_OPTIONS = [
    { label: 'Binary (2)', value: 2 },
    { label: 'Octal (8)', value: 8 },
    { label: 'Decimal (10)', value: 10 },
    { label: 'Hexadecimal (16)', value: 16 },
];
