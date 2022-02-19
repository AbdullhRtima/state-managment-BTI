import i18next from 'i18next';
import { getDataLocalStorage, setDataLocalStorage } from '../localStorageHelper';

export const getCurrentDirection = () => {
    return i18next.language === 'ar' ? "rtl" : "ltr";
};

export const setLang = (language) => {
    setDataLocalStorage('language', language);
};

export const getLang = () => {
    let currentLang = getDataLocalStorage('language');

    // If current language is empty, then get default language and set it
    if (!currentLang) {
        currentLang = 'en';
        setLang(currentLang);
    }

    return currentLang;
};

export const getDirection = (lang = null) => {
    let currentLang = lang || getLang();
  
    return currentLang === 'ar' ? "rtl" : "ltr";
  };