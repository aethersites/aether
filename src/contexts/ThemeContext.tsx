import React, { createContext, useContext, useEffect, useState } from 'react';

export type ColorTheme = 'black' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink';
export type ThemeMode = 'light' | 'dark';
export type BackgroundType = 'none' | 'nature-1' | 'nature-2' | 'nature-3' | 'nature-4' | 'nature-5' | 'nature-6' | 'nature-7' | 'nature-8' | 'nature-9' | 'nature-10' | 'nature-11' | 'nature-12' | 'modern-1' | 'modern-2' | 'modern-3' | 'modern-4' | 'modern-5' | 'modern-6' | 'modern-7' | 'galaxy-1' | 'galaxy-2' | 'galaxy-3' | 'galaxy-4' | 'galaxy-5' | 'galaxy-6' | 'galaxy-7' | 'galaxy-8' | 'galaxy-9' | 'galaxy-10' | 'galaxy-11';
export type FontFamily = 'mono' | 'roboto' | 'playfair' | 'inter' | 'poppins';

interface ThemeSettings {
  colorTheme: ColorTheme;
  mode: ThemeMode;
  background: BackgroundType;
  font: FontFamily;
}

interface ThemeContextType {
  settings: ThemeSettings;
  updateColorTheme: (color: ColorTheme) => void;
  updateMode: (mode: ThemeMode) => void;
  updateBackground: (bg: BackgroundType) => void;
  updateFont: (font: FontFamily) => void;
}

const defaultSettings: ThemeSettings = {
  colorTheme: 'black',
  mode: 'light',
  background: 'none',
  font: 'mono',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colorThemes = {
  black: { primary: '220 9% 15%', hover: '220 9% 25%' },
  red: { primary: '9 87% 67%', hover: '9 87% 60%' },
  orange: { primary: '25 95% 53%', hover: '25 95% 48%' },
  yellow: { primary: '45 93% 58%', hover: '45 93% 53%' },
  green: { primary: '160 84% 39%', hover: '160 84% 34%' },
  blue: { primary: '217 91% 60%', hover: '217 91% 55%' },
  purple: { primary: '262 83% 58%', hover: '262 83% 53%' },
  pink: { primary: '322 71% 52%', hover: '322 71% 47%' },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoro-theme-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Failed to parse saved theme settings:', error);
      }
    }
  }, []);

  // Apply theme changes to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const theme = colorThemes[settings.colorTheme];
    
    root.style.setProperty('--pomodoro', theme.primary);
    root.style.setProperty('--pomodoro-hover', theme.hover);
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-hover', theme.hover);
    root.style.setProperty('--ring', theme.primary);

    // Apply dark/light mode
    if (settings.mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Save to localStorage
    localStorage.setItem('pomodoro-theme-settings', JSON.stringify(settings));
  }, [settings]);

  const updateColorTheme = (color: ColorTheme) => {
    setSettings(prev => ({ ...prev, colorTheme: color }));
  };

  const updateMode = (mode: ThemeMode) => {
    setSettings(prev => ({ ...prev, mode }));
  };

  const updateBackground = (bg: BackgroundType) => {
    setSettings(prev => ({ ...prev, background: bg }));
  };

  const updateFont = (font: FontFamily) => {
    setSettings(prev => ({ ...prev, font }));
  };

  return (
    <ThemeContext.Provider value={{ 
      settings, 
      updateColorTheme, 
      updateMode, 
      updateBackground,
      updateFont
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};