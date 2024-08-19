import { isMainMenuExists, getMainMenu, isHeaderShow, isMobile } from './utility'

function isScrollable(scrollContainer) {
  return scrollContainer.scrollWidth > scrollContainer.clientWidth
}

export function addNoScrollClass() {
  if(!isMainMenuExists()) return

  const container = getMainMenu()
  if(isScrollable(container)) {
    container.classList.remove('noScroll')
  } else {
    container.classList.add('noScroll')
  }
}


/* ページを遷移しても横スクロール位置を覚えておきたい */
function initScrollPosition() {
  localStorage.setItem('mainMenuScrollPosition', 0)
}

export function saveMainMenuScrollPosition() {
  if(!isMainMenuExists()) return

  const mainMenu = getMainMenu()

  // スクロールが発生しない場合は初期化して終わり
  if(!isScrollable(mainMenu)) {
    initScrollPosition()
    return
  }

  // スクロールが発生する場合は位置を記録
  localStorage.setItem('mainMenuScrollPosition', mainMenu.scrollLeft)
}

export function restoreMainMenuScrollPosition() {
  if(!isMainMenuExists()) return

  const mainMenu = getMainMenu()

  // スクロールが発生しない場合は初期化して終わり
  if(!isScrollable(mainMenu)) {
    initScrollPosition()
    return
  }

  // スクロールが発生する場合は復原
  const scrollPosition = localStorage.getItem('mainMenuScrollPosition')
  if(scrollPosition) {
    mainMenu.scrollLeft = scrollPosition
  }
}

/**
 * ビューポートの上の方または上端からマウスカーソルがビューポートの外に出た場合にPJメニューが表示されるようにする
 */
const CLASS_FIX_PJ_MENU = 'is_pjMenuFixed'

function fixPJMenu(header, headerDefaultHeight) {
  header.classList.add(CLASS_FIX_PJ_MENU)
  header.style.height = `${headerDefaultHeight}px`
}

function unfixPJMenu(header) {
  header.classList.remove(CLASS_FIX_PJ_MENU)
  header.style.height = 'auto'
}

function isFixedPJMenu(header) {
  return header.classList.contains(CLASS_FIX_PJ_MENU)
}

function documentMouseMove(menuWrap, header) {
  if(isMobile()) return

  if(isFixedPJMenu(header) && !menuWrap.matches(':hover')) {
    unfixPJMenu(header)
  }
}

function documentMouseLeave(e, menuWrap, header, headerDefaultHeight) {
  if(isMobile()) return
  if(menuWrap.getBoundingClientRect().bottom > 0) return

  if(e.clientY === null || e.clientY < 0) {
    fixPJMenu(header, headerDefaultHeight)
  }
}

function menuWrapMouseLeave(header) {
  if(isMobile()) return

  if(isFixedPJMenu(header)) {
    unfixPJMenu(header)
  }
}

function checkAndInitialize() {
  if(!isMainMenuExists()) return
  if(!isHeaderShow()) return

  const menuWrap = getMainMenu().closest('#main-menu')
  const header = document.getElementById('header')
  const headerDefaultHeight = header.getBoundingClientRect().height

  document.addEventListener('mousemove', () => documentMouseMove(menuWrap, header))
  document.addEventListener('mouseleave', (e) => documentMouseLeave(e, menuWrap, header, headerDefaultHeight))
  menuWrap.addEventListener('mouseleave', () => menuWrapMouseLeave(header))
}

export function initializeShowMenuTopEdgeHandler() {
  checkAndInitialize()
  window.addEventListener('resize', checkAndInitialize)
}