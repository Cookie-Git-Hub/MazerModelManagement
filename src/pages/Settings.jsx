import React from "react";
import { useTranslation } from "../hooks/useTranslation";
import { useSettings } from "../context/SettingsContext";
import { Globe, Moon, Mail } from "lucide-react";
import "./Settings.css";

const settingsSections = [
  { id: "language", icon: <Globe size={20} /> },
  { id: "appearance", icon: <Moon size={20} /> },
  { id: "email", icon: <Mail size={20} /> },
];

function Settings() {
  const { theme, setTheme } = useSettings();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const { t } = useTranslation();
  const settings = useSettings();
  const [activeSection, setActiveSection] = React.useState("language");

  return (
    <div className="settings-container">
      {/* Header */}
      <div className="settings-header">
        <h1>{t("settings.accountSettings")}</h1>
        <p>{t("settings.managePreferences")}</p>
      </div>

      <div className="settings-grid">
        {/* Navigation */}
        <div className="settings-nav">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={section.id === activeSection ? "active" : "inactive"}
            >
              <div className="flex items-center space-x-3">
                {section.icon}
                <span>{t(`settings.${section.id}`)}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="space-y-6">
          {activeSection === "language" && (
            <div className="settings-section">
              <h2>{t("settings.language")}</h2>
              <label>{t("settings.languages.title")}</label>
              <select className="settings-select">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="settings-section">
              <h2>{t("settings.appearance")}</h2>
              <div className="settings-switch">
                <label>{t("settings.darkMode")}</label>
                <div className="switch-container">
                  <input
                    type="checkbox"
                    id="theme-toggle"
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                  />
                  <span className="switch-slider"></span>
                </div>
              </div>
            </div>
          )}

          {activeSection === "email" && (
            <div className="settings-section">
              <h2>{t("settings.email")}</h2>
              <div className="settings-email">
                <div className="settings-email-input">
                  <label htmlFor="email-input">
                    {t("settings.inputOldEmail")}
                  </label>
                  <input
                    type="email"
                    id="email-input"
                    className="email-input w-[55%]"
                    placeholder={t("settings.enter")}
                  />
                </div>
                <div className="settings-email-input">
                  <label htmlFor="email-input">
                    {t("settings.inputNewEmail")}
                  </label>
                  <input
                    type="email"
                    id="email-input"
                    className="email-input w-[55%]"
                    placeholder={t("settings.enter")}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 gap-2">
            <button className="btn btn-secondary">{t("common.cancel")}</button>
            <button className="btn btn-primary">{t("common.save")}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
