// .tabs-buttons(main menuが見切れる時のページ送りUI)を非表示にする(HTMLのstyle属性でして押されておりテーマcssで上書きできないため)
function hiddenTabsButtons() {
  const tabsButton = document.querySelector('#main-menu .tabs-buttons')
  if(tabsButton) tabsButton.classList.remove('tabs-buttons')
}

function setMainMenuTop() {
  const mainMenu = document.querySelector('#main-menu')
  const topMenu = document.querySelector('#top-menu')

  if(mainMenu) {
    mainMenu.style.top = `${topMenu.offsetHeight}px`
  }
}

// top menuの位置入れ替えのためにclassを付与
function repositionTopMenu() {
  const home = document.querySelector('#top-menu ul li .home')
  const lycheeHelp = document.querySelector('#top-menu ul li .lychee-help')

  if(home) home.closest('li').classList.add('aw_topMenuHome')
  if(lycheeHelp) lycheeHelp.closest('li').classList.add('aw_topMenuHelp')
}

// 活動や検索結果で、各ブロックがdescriptionを持っているかどうか判定
function hasDescription(el) {
  // 文字列があるかどうかでチェック
  return el.textContent.length > 0
}

/**
 * Header・MainMenuのSticky Sidebar化
 */
function stickyMainMenu() {
  const mainMenu = document.querySelector('#main-menu')
  const topMenu = document.querySelector('#top-menu')
  if(mainMenu) {
    const topMenuHeightRectBottom = topMenu.getBoundingClientRect().bottom

    if(topMenuHeightRectBottom <= 0) {
      mainMenu.classList.add('aw_fixed_header')
      mainMenu.style.top = '0px'
    }

    if(topMenuHeightRectBottom > 0) {
      mainMenu.classList.remove('aw_fixed_header')
      mainMenu.style.top = `${topMenu.offsetHeight}px`
    }
  }
}

function addBtnToToggleMainMenu() {
  const mainMenu = document.querySelector('#main-menu')
  const btn = document.createElement('button')
  btn.textContent = 'メニューの開閉'
  btn.classList.add('aw_toggleMainMenu')

  mainMenu.appendChild(btn)
}

function openMainMenu() {
  document.querySelector('#main-menu').classList.remove('isMainMenuClose')
  document.querySelector('#main').classList.remove('isMainMenuClose')
  document.querySelector('.aw_toggleMainMenu').classList.remove('isMainMenuClose')
  document.querySelector('#wrapper').classList.remove('isMainMenuClose')
  document.querySelector('#header').classList.remove('isMainMenuClose')
  localStorage.setItem('isMainMenuClose', false)
}

function closeMainMenu() {
  document.querySelector('#main-menu').classList.add('isMainMenuClose')
  document.querySelector('#main').classList.add('isMainMenuClose')
  document.querySelector('.aw_toggleMainMenu').classList.add('isMainMenuClose')
  document.querySelector('#wrapper').classList.add('isMainMenuClose')
  document.querySelector('#header').classList.add('isMainMenuClose')
  localStorage.setItem('isMainMenuClose', true)
}

function toggleMainMenu() {
  const mainMenu = document.querySelector('#main-menu')

  if(mainMenu.classList.contains('isMainMenuClose')) {
    openMainMenu()
  } else {
    closeMainMenu()
  }
}

function initToggleMainMenu() {
  const mainMenu = document.querySelector('#main-menu')
  if(!mainMenu) return

  // toggle btnの追加
  addBtnToToggleMainMenu()

  // 開閉処理
  const toggleTrigger = document.querySelector('.aw_toggleMainMenu')
  toggleTrigger.addEventListener('click', toggleMainMenu)
}

// Sidebarの折りたたみ
function addBtnToToggleSidebar() {
  const sidebar = document.querySelector('#sidebar')
  const btn = document.createElement('button')
  btn.textContent = 'サイドバーの開閉'
  btn.classList.add('aw_toggleSidebar')

  sidebar.appendChild(btn)
}

function openSidebar() {
  document.querySelector('#sidebar').classList.remove('isSidebarClose')
  document.querySelector('#main').classList.remove('isSidebarClose')
  document.querySelector('.aw_toggleSidebar').classList.remove('isSidebarClose')
}

function closeSidebar() {
  document.querySelector('#sidebar').classList.add('isSidebarClose')
  document.querySelector('#main').classList.add('isSidebarClose')
  document.querySelector('.aw_toggleSidebar').classList.add('isSidebarClose')
}

// sidebarの折りたたみ
function toggleSidebar() {
  const sidebar = document.querySelector('#sidebar')

  // 切り替え処理
  if(sidebar.classList.contains('isSidebarClose')) {
    openSidebar()
  } else {
    closeSidebar()
  }
}

function initToggleSidebar() {
  // サイドバーがある"かつ"nosidebarではない
  const sidebar = document.querySelector('#sidebar')
  if(!sidebar || sidebar.closest('#main').classList.contains('nosidebar')) return

  // toggle btnの追加
  addBtnToToggleSidebar()

  // 開閉処理
  const toggleTrigger = document.querySelector('.aw_toggleSidebar')
  toggleTrigger.addEventListener('click', toggleSidebar)
}

// 「ログイン中:」の文字を削除
function removeLoggedasText() {
  const loggedas = document.querySelector('#loggedas')
  if(!loggedas) return

  loggedas.childNodes[0].textContent = ''
}

// FBリンク追加
function addFeedbackLink() {
  const topMenuNav = document.querySelector('#top-menu > ul')
  const li = document.createElement('li')
  const a = document.createElement('a')
  a.classList.add('aw_fbLink')
  a.setAttribute('href', 'https://support.lychee-redmine.jp/feedback/')
  a.setAttribute('target', '_blank')
  a.textContent = 'フィードバックを送る'
  li.appendChild(a)
  topMenuNav.appendChild(li)
}

// IssueFormが開いたときにMainMenuとSidebarを閉じる
window.addEventListener('DOMContentLoaded', () => {
  const lycheeBody = document.querySelector('body')

  const observer = new MutationObserver((mutations) => {
    if(lycheeBody.classList.contains('lychee-issue-form__body_half')) {
      closeMainMenu()
      closeSidebar()
    } else {
      openMainMenu()
      openSidebar()
    }
  })


  observer.observe(lycheeBody, {
    attributes: true,
    attributeFilter: ['class']
  })
})

/**
 * Sticky MainMenu
 */
window.addEventListener('scroll', stickyMainMenu)

/**
 * その他一般的な処理
 */
window.addEventListener('DOMContentLoaded', () => {
  removeLoggedasText()
  hiddenTabsButtons()
  repositionTopMenu()
  addFeedbackLink()

  /**
   * Main Menu / Sidebarの開閉機能
   */
  initToggleMainMenu()
  initToggleSidebar()

  // mainMenuがあるかどうか
  if(document.querySelector('#main-menu') !== null) {
    // mainMenuがない場合headerはfull width表示にするため、区別用classを付与しておく
    document.querySelector('#header').classList.add('aw_hasMainMenu')

    // ローカルストレージから開閉状態を復元
    if(localStorage.getItem('isMainMenuClose') === 'true') {
      closeMainMenu()
    } else {
      openMainMenu()
    }
  }

  // mainMenuのtopプロパティを指定
  setMainMenuTop()

  /**
   * 活動・検索結果ページ
   */
  if(document.querySelector('#activity') !== null || document.querySelector('#search-results') !== null) {
    document.querySelectorAll('.description').forEach(el => {
      if(hasDescription(el)) {
        el.classList.add('aw_has_description')
      }
    })
  }


  /**
   * キャンセルボタンをリンクボタン化する
   * 取得する要素数を減らすため、commit/continueに隣接するaタグがキャンセルボタン化どうかを判別する
   */
  if(document.querySelectorAll('input[name="commit"]') !== null || document.querySelectorAll('input[name="continue"]') !== null) {
    const commitBtns = document.querySelectorAll('input[name="commit"]')
    const continueBtns = document.querySelectorAll('input[name="continue"]')
    if(commitBtns) {
      for (const commitBtn of commitBtns) {
        if(commitBtn.nextElementSibling?.textContent === 'キャンセル') {
          commitBtn.nextElementSibling?.classList.add('aw_cancelBtn')
        }
      }
    }

    if(continueBtns) {
      for (const continueBtn of continueBtns) {
        if(continueBtn.nextElementSibling?.textContent === 'キャンセル') {
          continueBtn.nextElementSibling?.classList.add('aw_cancelBtn')
        }
      }
    }
  }


  /**
   * レポート（Issue > Summary > 虫眼鏡アイコン）ページの戻るボタン
   */
  if(document.querySelector('.controller-reports') !== null) {
    const btns = document.querySelectorAll('a')
    for (const btn of btns) {
      if(btn.textContent === '戻る') {
        btn.classList.add('aw_secondaryBtn')
      }
    }
  }


  /**
   * main-menuの新規作成系展開ボタンのクリック領域を調整
   */
  const newObjectBtn = document.querySelector('.new-object')
  if(newObjectBtn) {
    newObjectBtn.closest('li').classList.add('aw_newObjectList')
  }
})