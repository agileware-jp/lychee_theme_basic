const sidebarOpenStyle = `
  #sidebar {
    width: 15rem;
    padding-right: 0.75rem;
    padding-left: 1rem;
  }

  #sidebar.isSidebarClose {
    width: 0;
    padding-right: 0;
  }
`

const sidebarCloseStyle = `
  #sidebar {
    width: 0px;
    padding-right: 0;
    padding-left: 1rem;
  }

  #sidebar *:not(.aw_toggleSidebar) {
    opacity: 0;
  }

  #sidebar.isSidebarOpen {
    width: 15rem;
    padding-right: 0.75rem;
  }

  #sidebar.isSidebarOpen *:not(.aw_toggleSidebar) {
    opacity: 1;
  }
`

/* sidebarを持つページかどうかを判定する */
// Note: redmineでは、sidebarが無いページは#mainに.nosidebarというclassが付与される
//       #sidebarという要素自体が消えるのではなく、中身が空になり、#mainにclassが付与されるため
//       #sidebarという要素が存在するかどうかのチェックでは足りない。
export function sidebarExists() {
  return document.getElementById('sidebar') !== null && !document.getElementById('main').classList.contains('nosidebar')
}

function getSidebar() {
  return document.getElementById('sidebar')
}

// ちらつき防止の為、sidebarの初期スタイルを先に定義しておく
export function addDefaultSidebarStyle() {
  const styleTag = document.createElement('style')
  document.head.appendChild(styleTag)

  const isSidebarClose = localStorage.getItem('isSidebarClose') === 'true'

  styleTag.textContent = isSidebarClose ? sidebarCloseStyle : sidebarOpenStyle
}

export function openSidebar() {
  if(!sidebarExists()) return
  document.getElementById('sidebar')?.classList.add('isSidebarOpen')
  document.getElementById('sidebar')?.classList.remove('isSidebarClose')

  // sidebarの状態をlocal storageに記録
  localStorage.setItem('isSidebarClose', false)
}

export function closeSidebar() {
  if(!sidebarExists()) return
  document.getElementById('sidebar')?.classList.add('isSidebarClose')
  document.getElementById('sidebar')?.classList.remove('isSidebarOpen')

  // sidebarの状態をlocal storageに記録
  localStorage.setItem('isSidebarClose', true)
}

function addBtnToToggleSidebar() {
  if(!sidebarExists()) return

  const sidebar = getSidebar()
  const btn = document.createElement('button')
  btn.textContent = 'サイドバーの開閉'
  btn.classList.add('aw_toggleSidebar')

  sidebar.appendChild(btn)
}

function toggleSidebar() {
  if(!sidebarExists()) return
  const sidebar = getSidebar()

  // 切り替え処理
  if(sidebar.classList.contains('isSidebarClose')) {
    openSidebar()
  } else {
    closeSidebar()
  }
}

export function initToggleSidebar() {
  if(sidebarExists()) {
    addBtnToToggleSidebar()

    // 開閉処理
    const toggleTrigger = document.querySelector('.aw_toggleSidebar')
    toggleTrigger.addEventListener('click', toggleSidebar)

    // sidebarの復元処理
    if(localStorage.getItem('isSidebarClose') === 'true') {
      closeSidebar()
    } else {
      openSidebar()
    }

    // sidebar開閉ボタンの固定
    fixedToggleSidebarButton(toggleTrigger)
  }
}

/**
 * Sidebarの開閉ボタンをスクロール時に固定する
 */
function fixedToggleSidebarButton(toggleButton) {
  const sidebar = document.getElementById('sidebar')

  const mediaQuery = window.matchMedia('(max-width: 899px)')

  function checkAndExecute() {
    const fixedPosition = sidebar.getBoundingClientRect().top + window.scrollY
    if (!mediaQuery.matches) {
      // PC表示のときはスクロールに応じた処理を追加
      window.addEventListener('scroll', () => handleScroll(fixedPosition));
    } else {
      // スマホ表示のときは処理を削除して初期状態にリセット
      window.removeEventListener('scroll', () => handleScroll(fixedPosition));
    }
  }

  function handleScroll(fixedPosition) {
    if(window.scrollY < fixedPosition) {
      toggleButton.style.position = 'absolute'
    } else {
      toggleButton.style.position = 'fixed'
    }
  }

  checkAndExecute()
  mediaQuery.addEventListener('change', checkAndExecute)
}