const colors = {
  // Existing
  primary_text: '#ffffff',
  card_or_section: '#1a1a1a',
  background: '#000000',
  border_or_hint: '#2c2c2c',
  secondary_text: '#b0b0b0',
  textPrimary: '#212121',
  cta_botton: '#ffffff',

  // New additions
  disabled: '#555555',              // Muted grey for disabled state (readable but clearly inactive)
  placeholder: '#777777',           // Slightly lighter than disabled for hint text
  error: '#ff4d4f',                 // Bright but elegant red for errors
  errorBackground: '#2a0000',       // Dark red background for error sections/messages
  primary: '#ffffff',               // Matches CTA button; primary action color
  primaryLight: '#dddddd',          // Slightly dimmed white, can be used for hover or subtle highlight
  border: '#2c2c2c',                // Reuse from border_or_hint for consistent edge dividers
  primaryDark: '#999999',

  // Transparent colors for alerts
  card_transparent: 'rgba(26, 26, 26, 0.7)',     // card_or_section with 70% opacity
  card_light_transparent: 'rgba(26, 26, 26, 0.5)', // card_or_section with 50% opacity
  border_transparent: 'rgba(44, 44, 44, 0.3)',    // border_or_hint with 30% opacity
};

const typography = {
  fontFamily: {
    regular: 'Handlee-Regular',
  },
  fontSize: {
    xxxs: 8,
    xxs: 10,
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};

export { colors, typography };
