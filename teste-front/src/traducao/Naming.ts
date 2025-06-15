import fields from "./fields";
import messages from "./messages";

export type LanguageKey = "pt" | "en" | "es";

type TranslationKeys = { [key: string]: string };

class Naming {
  private language: LanguageKey;

  constructor() {
    this.language = (localStorage.getItem("language") as LanguageKey) || "pt";
  }

  setLanguage(language: LanguageKey) {
    this.language = language;
    localStorage.setItem("language", language);
  }

  getField(key: string): string {
    const translations: TranslationKeys = fields[this.language];
    return translations[key] || key;
  }

  getMessage(key: string): string {
    const translations: TranslationKeys = messages[this.language];
    return translations[key] || key;
  }
}

export const naming = new Naming();
