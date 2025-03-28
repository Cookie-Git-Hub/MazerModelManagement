import { useState, useEffect } from "react";
import en from "../locales/en.json";
import ru from "../locales/ru.json";
import ua from "../locales/ua.json";

const translations = { en, ru, ua };

export function useTranslation() {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [dict, setDict] = useState(translations[lang]);

  useEffect(() => {
    setDict(translations[lang]);
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = (key, params = {}) => {
    const translation =
      key.split(".").reduce((obj, part) => obj?.[part], dict) || key;
    return translation.replace(/{{\s*(\w+)\s*}}/g, (_, k) => params[k] || "");
  };

  return { t, lang, setLang };
}
