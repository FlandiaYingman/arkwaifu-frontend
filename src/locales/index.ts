import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: 'en',
  messages: {},
})

export default i18n
