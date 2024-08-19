export function isMainMenuExists() {
  return document.querySelector('#main-menu > ul:not(.menu-children)') !== null
}

export function getMainMenu() {
  return document.querySelector('#main-menu > ul:not(.menu-children)')
}

/**
 * Headerが表示されているかを判定する
 * LPRやLRMなど、#headerを非表示にしているプラグインを区別する用途
 */
export function isHeaderShow() {
  const header = document.getElementById('header')
  if(header === null) return false
  return window.getComputedStyle(header).display !== 'none'
}

export function isMobile() {
  const mediaQueryList = window.matchMedia('(max-width: 899px)')
  return mediaQueryList.matches
}