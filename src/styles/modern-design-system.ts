// Modern Design System for CV Maker
// Inspired by Resume.io and Enhancv.com

export const modernColors = {
  // Primary brand colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Main primary
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Accent color for highlights (Blue)
  accent: {
    50: '#e0f7ff',
    100: '#b3ecff',
    200: '#80e1ff',
    300: '#4dd5ff',
    400: '#29aae6', // Main accent
    500: '#29aae6',
    600: '#2196d9',
    700: '#1a7fc2',
    800: '#1469ab',
    900: '#0d5394',
  },
  
  // Success/completion indicator
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e', // Main success
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Neutrals - modern gray scale
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Semantic colors
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

export const modernSpacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
};

export const modernShadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  glow: '0 0 15px rgba(14, 165, 233, 0.3)',
};

export const modernBorderRadius = {
  sm: '0.375rem',   // 6px
  DEFAULT: '0.5rem', // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  full: '9999px',
};

export const modernTypography = {
  fontFamily: {
    sans: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: '"Cal Sans", "Inter", sans-serif',
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
};

export const modernTransitions = {
  fast: 'all 0.15s ease-in-out',
  DEFAULT: 'all 0.2s ease-in-out',
  slow: 'all 0.3s ease-in-out',
  spring: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
};

// Component-specific styles
export const modernComponents = {
  button: {
    primary: `
      bg-gradient-to-r from-primary-500 to-accent-500 
      hover:from-primary-600 hover:to-accent-600 
      text-white font-medium px-6 py-2.5 rounded-lg 
      shadow-md hover:shadow-lg 
      transition-all duration-200 
      hover:scale-[1.02] active:scale-[0.98]
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    `,
    secondary: `
      bg-white text-neutral-700 font-medium px-6 py-2.5 rounded-lg 
      border border-neutral-300 
      hover:bg-neutral-50 hover:border-neutral-400 
      shadow-sm hover:shadow-md 
      transition-all duration-200 
      hover:scale-[1.02] active:scale-[0.98]
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    `,
    success: `
      bg-gradient-to-r from-success-500 to-success-600 
      hover:from-success-600 hover:to-success-700 
      text-white font-medium px-6 py-2.5 rounded-lg 
      shadow-md hover:shadow-lg 
      transition-all duration-200 
      hover:scale-[1.02] active:scale-[0.98]
      focus:outline-none focus:ring-2 focus:ring-success-500 focus:ring-offset-2
    `,
    ghost: `
      text-neutral-600 font-medium px-4 py-2 rounded-lg 
      hover:bg-neutral-100 
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    `,
  },
  input: {
    DEFAULT: `
      w-full px-4 py-2.5 
      bg-white border border-neutral-300 rounded-lg 
      text-neutral-900 placeholder-neutral-400 
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
      transition-all duration-200
      hover:border-neutral-400
    `,
    textarea: `
      w-full px-4 py-3 
      bg-white border border-neutral-300 rounded-lg 
      text-neutral-900 placeholder-neutral-400 
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
      transition-all duration-200
      hover:border-neutral-400
      resize-none
    `,
  },
  card: {
    DEFAULT: `
      bg-white rounded-xl border border-neutral-200 
      shadow-sm hover:shadow-md 
      transition-all duration-200
    `,
    elevated: `
      bg-white rounded-xl 
      shadow-lg hover:shadow-xl 
      transition-all duration-200
    `,
  },
  section: {
    header: `
      flex items-center gap-3 
      text-lg font-semibold text-neutral-900 
      pb-3 mb-4 
      border-b-2 border-neutral-200
    `,
  },
};