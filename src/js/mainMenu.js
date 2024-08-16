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

export function showMenuOnTopEdge() {
  if(!isMenuExists()) return

  const EDGE_THRESHOLD = 5 // トップから10pxの高さを判定エリアとする

  // Note: main-menuにfixedを適用すると、その分の高さが引かれてガタガタする。
  //       固定表示したいのはmain-menuだが、ガタツキにそれに対応できるようにclassは#headerに適用したい
  const menuWrap = getMainMenu().closest('#main-menu')
  const header = menuWrap.closest('#header')
  const headerDefaultHeight = header.offsetHeight

  document.addEventListener('mousemove', (e) => {
    const PJMenuBottom = menuWrap.getBoundingClientRect().bottom

    if(PJMenuBottom < 0 && e.clientY <= EDGE_THRESHOLD) {
      header.classList.add('is_pjMenuFixed')
      header.style.height = `${headerDefaultHeight}px`
    } else if(header.classList.contains('is_pjMenuFixed')) {
      if(!menuWrap.matches(':hover')) {
        header.classList.remove('is_pjMenuFixed')
        header.style.height = 'auto'
      }
    }
  })

  // ビューポートからカーソルが出た場合にもPJメニューを表示したい
  document.addEventListener('mouseleave', (e) => {
    const PJMenuBottom = menuWrap.getBoundingClientRect().bottom
    if(PJMenuBottom > 0) return
    if(e.clientY === null || e.clientY < 0) {
      header.classList.add('is_pjMenuFixed')
      header.style.height = `${headerDefaultHeight}px`
    }
  })

  // main-menuからカーソルが外れたら非表示にする
  menuWrap.addEventListener('mouseleave', () => {
    if(header.classList.contains('is_pjMenuFixed')) {
      header.classList.remove('is_pjMenuFixed')
      header.style.height = 'auto'
    }
  })
}