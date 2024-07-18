function isMenuExists() {
  return document.querySelector('#main-menu > ul:not(.menu-children)') !== null
}

function getMainMenu() {
  return document.querySelector('#main-menu > ul:not(.menu-children)')
}

function isScrollable(scrollContainer) {
  return scrollContainer.scrollWidth > scrollContainer.clientWidth
}

export function addNoScrollClass() {
  if(!isMenuExists()) return

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
  if(!isMenuExists()) return

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
  if(!isMenuExists()) return

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