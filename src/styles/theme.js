export const lightTheme = {
  primary: '#2563eb',
  secondary: '#4f46e5',
  background: 'linear-gradient(135deg, #F5EEDC 60%, #DDA853 100%)',
  surface: '#f3f4f6',
  text: '#1f2937',
  textSecondary: '#4b5563',
  border: '#e5e7eb',
  error: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  gradientOverlay: 'linear-gradient(160deg, rgba(39,84,138,0.08) 0%, rgba(221,168,83,0.04) 100%)'
}

export const commonStyles = {
  borderRadius: '0.5rem',
  transition: 'all 0.3s ease-in-out',
  maxWidth: '1200px',
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    h1: {
      fontSize: '2.75rem', // 44px
      fontWeight: '700',
      lineHeight: '1.2'
    },
    h2: {
      fontSize: '2.25rem', // 36px
      fontWeight: '600',
      lineHeight: '1.3'
    },
    h3: {
      fontSize: '1.75rem', // 28px
      fontWeight: '600',
      lineHeight: '1.4'
    },
    body: {
      fontSize: '1rem', // 16px base font size
      lineHeight: '1.6'
    },
    small: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.5'
    }
  },
  animation: {
    cornerLight: {
      glow: '0 0 40px',
      trail: '25px',
      duration: '6s',
      width: '160px',
      height: '3px',
      blur: '8px',
      opacityBase: '0.4',
      opacityHover: '0.8'
    }
  }
}