import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const defaultSettings = {
  theme: 'light',
  fontSize: 'medium',
  language: 'en',
  notifications: {
    push: true,
    sms: false,
    browser: true
  },
  emailPreferences: {
    jobOpportunities: true,
    newsletter: true,
    accountUpdates: true
  },
  privacySettings: {
    profileVisibility: 'Public',
    contactInformation: 'Verified Agencies',
    portfolioAccess: 'Industry Professionals'
  }
};

const SettingsContext = createContext({
  ...defaultSettings,
  setTheme: () => {},
  setFontSize: () => {},
  setLanguage: () => {},
  setNotificationSetting: () => {},
  setEmailPreference: () => {},
  setPrivacySetting: () => {}
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('userSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  useEffect(() => {
    document.documentElement.dataset.fontSize = settings.fontSize;
  }, [settings.fontSize]);

  useEffect(() => {
    t.changeLanguage(settings.language);
  }, [settings.language, t]);

  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  const setTheme = (theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const setFontSize = (fontSize) => {
    setSettings(prev => ({ ...prev, fontSize }));
  };

  const setLanguage = (language) => {
    setSettings(prev => ({ ...prev, language }));
  };

  const setNotificationSetting = (type, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  const setEmailPreference = (type, value) => {
    setSettings(prev => ({
      ...prev,
      emailPreferences: {
        ...prev.emailPreferences,
        [type]: value
      }
    }));
  };

  const setPrivacySetting = (type, value) => {
    setSettings(prev => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        [type]: value
      }
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        setTheme,
        setFontSize,
        setLanguage,
        setNotificationSetting,
        setEmailPreference,
        setPrivacySetting
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
