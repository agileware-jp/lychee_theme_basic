function isMenuExists() {
  return document.querySelector('#main-menu > ul:not(.menu-children)') !== null
}

function getMainMenu() {
  return document.querySelector('#main-menu > ul:not(.menu-children)')
}

function isHorizonScrollable(scrollContainer) {
  return scrollContainer.scrollWidth > scrollContainer.clientWidth
}

export function addNoHorizonScrollClass() {
  if(!isMenuExists()) return

  const container = getMainMenu()
  if(isHorizonScrollable(container)) {
    container.classList.remove('noScroll')
  } else {
    container.classList.add('noScroll')
  }
}


/* ページを遷移しても横スクロール位置を覚えておきたい */
function initHorizonScrollPosition() {
  localStorage.setItem('mainMenuHorizonScrollPosition', 0)
}

export function saveMainMenuHorizonScrollPosition() {
  if(!isMenuExists()) return

  const mainMenu = getMainMenu()

  // スクロールが発生しない場合は初期化して終わり
  if(!isHorizonScrollable(mainMenu)) {
    initHorizonScrollPosition()
    return
  }

  // スクロールが発生する場合は位置を記録
  localStorage.setItem('mainMenuHorizonScrollPosition', mainMenu.scrollLeft)
}

export function restoreMainMenuHorizonScrollPosition() {
  if(!isMenuExists()) return

  const mainMenu = getMainMenu()

  // スクロールが発生しない場合は初期化して終わり
  if(!isHorizonScrollable(mainMenu)) {
    initHorizonScrollPosition()
    return
  }

  // スクロールが発生する場合は復原
  const scrollPosition = localStorage.getItem('mainMenuHorizonScrollPosition')
  if(scrollPosition) {
    mainMenu.scrollLeft = scrollPosition
  }
}