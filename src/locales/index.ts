import { createI18n } from 'vue-i18n'

export enum Locale {
  EN = 'en', ZH = 'zh',
}

const lang = (() => {
  for (const lang of Object.values(Locale)) {
    if (navigator.language.startsWith(lang)) {
      return lang
    }
  }
  return Locale.EN
})()

const i18n = createI18n({
  legacy: false, locale: lang, fallbackLocale: 'en', messages: {},
})

export default i18n
