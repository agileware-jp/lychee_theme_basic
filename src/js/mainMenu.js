function isMenuListExists() {
  return document.querySelector('#main-menu > ul:not(.menu-children)') !== null
}

function getMainMenu() {
  return document.getElementById('main-menu')
}

function getMainMenuList() {
  return document.querySelector('#main-menu > ul:not(.menu-children)')
}

function isScrollable(scrollContainer) {
  return scrollContainer.scrollWidth > scrollContainer.clientWidth
}

export function addScrollableClass() {
  if(!isMenuListExists()) return

  const container = getMainMenuList()
  if(isScrollable(container)) {
    container.closest('#main-menu').classList.add('scrollable')
  } else {
    container.closest('#main-menu').classList.remove('scrollable')
  }
}


/* ページを遷移しても横スクロール位置を覚えておきたい */
function initScrollPosition() {
  localStorage.setItem('mainMenuScrollPosition', 0)
}

export function saveMainMenuScrollPosition() {
  if(!isMenuListExists()) return

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
  if(!isMenuListExists()) return

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

export function dragScroll() {
  if(!isMenuListExists()) return

  // スクロールが発生する場合
  const mainMenu = getMainMenu()
  if(isScrollable(mainMenu)) {
    let isDragging = false
    let startX
    let scrollLeft
    let preventClick = false

    mainMenu.addEventListener('mousedown', (e) => {
      if(e.button !== 0) return // 左クリックのみドラッグスクロールしたい
      isDragging = true
      startX = e.pageX - mainMenu.offsetLeft
      scrollLeft = mainMenu.scrollLeft

      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('mouseup', mouseUpHandler)

      preventClick = false

      e.preventDefault()
    })

    function mouseMoveHandler(e) {
      if(!isDragging) return
      e.preventDefault()
      const x = e.pageX - mainMenu.offsetLeft
      const walk = x - startX
      mainMenu.scrollLeft = scrollLeft - walk

      // クリック時の僅かな動きでリンクが無効化されないよう、ある程度スクロールが発生したときに限定する
      if(Math.abs(walk) > 5) {
        mainMenu.classList.add('active')
        preventClick = true
      }
    }

    function mouseUpHandler() {
      isDragging = false
      mainMenu.classList.remove('active')

      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
    }

    mainMenu.addEventListener('click', (e) => {
      if(preventClick) {
        e.preventDefault()
        preventClick = false
      }
    })
  }
}