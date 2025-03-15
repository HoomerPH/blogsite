export const lightTheme = {
  primary: '#2563eb',
  secondary: '#4f46e5',
  background: 'linear-gradient(120deg, #ffffff 0%, #f0f4ff 100%)',
  surface: '#f3f4f6',
  text: '#1f2937',
  textSecondary: '#4b5563',
  border: '#e5e7eb',
  error: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  gradientOverlay: 'linear-gradient(160deg, rgba(37, 99, 235, 0.1) 0%, rgba(79, 70, 229, 0.05) 100%)'
}

export const darkTheme = {
  primary: '#3b82f6',
  secondary: '#6366f1',
  background: 'linear-gradient(120deg, #111827 0%, #0a0f1a 100%)',
  surface: '#1f2937',
  text: '#f9fafb',
  textSecondary: '#d1d5db',
  border: '#374151',
  error: '#f87171',
  success: '#4ade80',
  warning: '#fbbf24',
  gradientOverlay: 'linear-gradient(160deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)'
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