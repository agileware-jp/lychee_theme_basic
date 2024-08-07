import {
  isMobile,
  isMainMenuExists,
  isHeaderShow,
  getWrapper, getHeader, getMainMenu
} from './utility'

/**
 * PJメニューを上スクロールで表示するための処理
 */
const SCROLL_THRESHOLD = 80 // PJメニューをスクロールするまでのスクロール量（一度に80px以上スクロールされた場合PJメニューを表示したい）
const CLASS_NAME = 'scrolled-up'
const SHOW_DELAY = 200
const HIDE_DELAY = 2000

let lastScrollTop = 0
let scrollTimer
let hideTimer
let isMouseOverMainMenu = false

function onMouseEnter() {
  isMouseOverMainMenu = true
  clearTimeout(hideTimer)
}

function onMouseLeave() {
  const wrapper = getWrapper()

  isMouseOverMainMenu = false
  hideTimer = setTimeout(() => {
    if(!isMouseOverMainMenu) {
      wrapper.classList.remove(CLASS_NAME)
    }
  }, HIDE_DELAY)
}

function onScroll() {
  const wrapper = getWrapper()
  const header = getHeader()

  clearTimeout(scrollTimer)
  clearTimeout(hideTimer)

  let scrollTop = window.scrollY || document.documentElement.scrollTop
  const headerHeight = header.offsetHeight

  if (scrollTop > lastScrollTop || scrollTop <= headerHeight) {
    // 少しでも下にスクロールした場合はPJメニューを非表示に
    wrapper.classList.remove(CLASS_NAME)
    lastScrollTop = scrollTop
  } else {
    // スクロール後すぐに出すのではなく、一定時間経過後に表示したい
    scrollTimer = setTimeout(() => {
      if (lastScrollTop - scrollTop > SCROLL_THRESHOLD) {
        wrapper.classList.add(CLASS_NAME)
      }

      // 一定時間操作がなければ非表示にしたい
      hideTimer = setTimeout(() => {
        if (!isMouseOverMainMenu) {
          wrapper.classList.remove(CLASS_NAME)
        }
      }, HIDE_DELAY)

      lastScrollTop = scrollTop
    }, SHOW_DELAY)
  }
}

function addEventListeners() {
  const mainMenu = getMainMenu()
  mainMenu.addEventListener('mouseenter', onMouseEnter)
  mainMenu.addEventListener('mouseleave', onMouseLeave)
  window.addEventListener('scroll', onScroll)
}

function removeEventListeners() {
  const mainMenu = getMainMenu()
  mainMenu.removeEventListener('mouseenter', onMouseEnter)
  mainMenu.removeEventListener('mouseleave', onMouseLeave)
  window.removeEventListener('scroll', onScroll)
}

function checkAndInitialize() {
  // mainMenuがそもそも存在しないページ（ホームやログアウト中など）は処理を実行したくない
  if(!isMainMenuExists()) return

  // headerを非表示にしているページ（LRMやLPRなど）も処理を実行したくない
  if(!isHeaderShow()) return

  // スマートフォン用表示かどうかチェック
  if (isMobile()) {
    removeEventListeners()
  } else {
    addEventListeners()
  }
}

export function initializeScrollHandler() {
  checkAndInitialize()
  window.addEventListener('resize', checkAndInitialize)
}