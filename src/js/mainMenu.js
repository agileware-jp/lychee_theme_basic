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

export function dragScroll() {
  if(!isMenuExists()) return

  // スクロールが発生する場合
  const mainMenu = getMainMenu()
  if(isScrollable(mainMenu)) {
    const container = document.querySelector('#main-menu')
    let isDragging = false
    let startX
    let scrollLeft
    let preventClick = false

    container.addEventListener('mousedown', (e) => {
      if(e.button !== 0) return // 左クリックのみドラッグスクロールしたい
      isDragging = true
      startX = e.pageX - container.offsetLeft
      scrollLeft = container.scrollLeft

      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('mouseup', mouseUpHandler)

      preventClick = false

      e.preventDefault()
    })

    function mouseMoveHandler(e) {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = x - startX
      container.scrollLeft = scrollLeft - walk

      // クリック時の僅かな動きでリンクが無効化されないよう、ある程度スクロールが発生したときに限定する
      if(Math.abs(walk) > 5) {
        container.classList.add('active')
        preventClick = true
      }
    }

    function mouseUpHandler() {
      isDragging = false
      container.classList.remove('active')

      document.removeEventListener('mousemove', mouseMoveHandler)
      document.removeEventListener('mouseup', mouseUpHandler)
    }

    container.addEventListener('click', (e) => {
      if(preventClick) {
        e.preventDefault()
        preventClick = false
      }
    })
  }
}