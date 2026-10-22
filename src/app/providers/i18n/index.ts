import { createI18n } from 'vue-i18n'

const messages = Object.fromEntries(
  Object.entries(import.meta.glob('./locales/*.json', { eager: true })).map(
    ([key, value]: any) => [key.slice(10, -5), value.default],
  ),
)
function getStartingLocale(): string {
  if (localStorage.getItem('last-locale')) {
    return localStorage.getItem('last-locale') || ''
  }
  return 'uz'
}

export default createI18n({
  legacy: false,
  locale: getStartingLocale(),
  allowComposition: true,
  fallbackLocale: 'uz',
  messages,
  globalInjection: true,
})
