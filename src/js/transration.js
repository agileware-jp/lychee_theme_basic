import { ja } from './locales/ja'
import { en } from './locales/en'

const translations = {
  ja,
  en
}

function getCurrentLocale() {
  return document.documentElement.lang
}

/**
 * 言語設定が日本語の場合は日本語を、日本語以外の場合はどの言語であっても英語を返す
 */
export function t(key) {
  const locale = getCurrentLocale() // jaとかenとかzhとかが入る
  if(locale === 'ja') {
    return translations['ja'][key]
  } else {
    return translations['en'][key]
  }
}