function isPJMenuExists() {
  return document.querySelector('#main-menu > ul:not(.menu-children)') !== null
}

function getPJMenu() {
  return document.querySelector('#main-menu > ul:not(.menu-children)')
}

function isHorizonScrollable(scrollContainer) {
  return scrollContainer.scrollWidth > scrollContainer.clientWidth
}


/**
 * PJメニュー横スクロール関連の処理
 */
/* 横スクロール用classの付与 */
export function addNoHorizonScrollClass() {
  if(!isPJMenuExists()) return

  const container = getPJMenu()
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

/* 横スクロール位置の記憶 */
export function saveMainMenuHorizonScrollPosition() {
  if(!isPJMenuExists()) return

  const mainMenu = getPJMenu()

  // スクロールが発生しない場合は初期化して終わり
  if(!isHorizonScrollable(mainMenu)) {
    initHorizonScrollPosition()
    return
  }

  // スクロールが発生する場合は位置を記録
  localStorage.setItem('mainMenuHorizonScrollPosition', mainMenu.scrollLeft)
}

/* 横スクロール位置の復原 */
export function restoreMainMenuHorizonScrollPosition() {
  if(!isPJMenuExists()) return

  const mainMenu = getPJMenu()

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