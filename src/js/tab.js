function isScrollable(scrollContainer) {
  return scrollContainer.scrollWidth > scrollContainer.clientWidth
}

function hiddenTabsButtons() {
  const tabsButton = document.querySelector('#content .tabs-buttons')
  if(tabsButton) {
    tabsButton.classList.remove('tabs-buttons')
    tabsButton.style.display = 'none'
  }
}

function dragScroll(tabs) {
  // スクロールが発生しない程度のサイズの場合は不要
  if(!isScrollable(tabs)) return

  let isDragging = false
  let startX
  let scrollLeft
  let preventClick = false

  tabs.addEventListener('mousedown', (e) => {
    if(e.button !== 0) return // 左クリックのみドラッグスクロールしたい
    isDragging = true
    startX = e.pageX - tabs.offsetLeft
    scrollLeft = tabs.scrollLeft

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)

    preventClick = false

    e.preventDefault()
  })

  function mouseMoveHandler(e) {
    if(!isDragging) return
    e.preventDefault()
    const x = e.pageX - tabs.offsetLeft
    const walk = x - startX
    tabs.scrollLeft = scrollLeft - walk

    // クリック時の僅かな動きでリンクが無効化されないよう、ある程度スクロールが発生したときに限定する
    if(Math.abs(walk) > 5) {
      tabs.classList.add('active')
      preventClick = true
    }
  }

  function mouseUpHandler() {
    isDragging = false
    tabs.classList.remove('active')

    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  }

  tabs.addEventListener('click', (e) => {
    if(preventClick) {
      e.preventDefault()
      preventClick = false
    }
  })
}

// 実行するときのイメージはこんな感じ
export function enableTabDragScroll() {
  // #content .tabsのページ送りボタンを非表示に(ドラッグスクロール可能にするため、ボタンでのページ送りは不要)
  hiddenTabsButtons()

  // #content .tabsがあるページのみ実行
  // メインメニューを取得して実行
  const tabs = document.querySelector('#content .tabs ul')
  if(tabs) {
    dragScroll(tabs)
  }
}