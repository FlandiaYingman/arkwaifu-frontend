import { createI18n } from 'vue-i18n'
import en from '@/locales/messages/en'
import zh from '@/locales/messages/zh'

export enum Locale {
  EN = 'en',
  ZH = 'zh',
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
  legacy: false,
  locale: lang,
  fallbackLocale: 'en',
  messages: {
    en,
    zh,
  },
})

export default i18n
