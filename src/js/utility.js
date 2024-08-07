/**
 * モバイル用のcssが適用されているか
 */
export function isMobile() {
  const mediaQueryList = window.matchMedia('(max-width: 899px)')
  return mediaQueryList.matches
}


/**
 * 要素が存在するかどうか
 */
export function isMainMenuExists() {
  return document.getElementById('main-menu') !== null
}


/**
 * 要素が表示されているかどうか
 */
export function isHeaderShow() {
  const header = getHeader()
  if(header === null) return false
  return window.getComputedStyle(header).display !== 'none'
}


/**
 * 要素の取得
 */
export function getWrapper() {
  return document.getElementById('wrapper')
}

export function getHeader() {
  return document.getElementById('header')
}

export function getMainMenu() {
  return document.getElementById('main-menu')
}