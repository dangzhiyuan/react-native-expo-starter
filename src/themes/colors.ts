export const colors = {
  default: {
    primary: '#2196F3',
    secondary: '#FF9800',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: {
      primary: '#000000',
      secondary: '#757575',
      disabled: '#9E9E9E',
      inverse: '#FFFFFF',
    },
    border: '#E0E0E0',
    error: '#B00020',
    success: '#4CAF50',
    warning: '#FFC107',
    info: '#2196F3',
  },
  blue: {
    primary: '#1976D2',
    secondary: '#2196F3',
    background: '#E3F2FD',
    surface: '#BBDEFB',
    text: {
      primary: '#0D47A1',
      secondary: '#1976D2',
      disabled: '#64B5F6',
      inverse: '#FFFFFF',
    },
    border: '#90CAF9',
    error: '#C62828',
    success: '#2E7D32',
    warning: '#F57F17',
    info: '#0288D1',
  },
  orange: {
    primary: '#F57C00',
    secondary: '#FF9800',
    background: '#FFF3E0',
    surface: '#FFE0B2',
    text: {
      primary: '#E65100',
      secondary: '#F57C00',
      disabled: '#FFB74D',
      inverse: '#FFFFFF',
    },
    border: '#FFB74D',
    error: '#D84315',
    success: '#2E7D32',
    warning: '#FF6F00',
    info: '#EF6C00',
  },
};

export type ThemeColors = typeof colors.default; 