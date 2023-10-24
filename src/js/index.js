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

// main menuの折りたたみ
function toggleMainMenu() {
  // main menuがあるページかどうか
  const mainMenu = document.querySelector('#main-menu')
  if(!mainMenu) return

  // 開閉ボタン追加
  const btn = document.createElement('button')
  btn.textContent = 'メニューの開閉'
  btn.classList.add('aw_toggleMainMenu')

  const mainContent = document.querySelector('#main')
  mainMenu.appendChild(btn)

  const header = document.querySelector('#header')

  // 切り替え管理
  const toggleTrigger = document.querySelector('.aw_toggleMainMenu')
  toggleTrigger.addEventListener('click', () => {
    if(mainMenu.classList.contains('isMainMenuClose')) {
      mainMenu.classList.remove('isMainMenuClose')
      mainContent.classList.remove('isMainMenuClose')
      toggleTrigger.classList.remove('isMainMenuClose')
      header.classList.remove('isMainMenuClose')
    } else {
      mainMenu.classList.add('isMainMenuClose')
      mainContent.classList.add('isMainMenuClose')
      toggleTrigger.classList.add('isMainMenuClose')
      header.classList.add('isMainMenuClose')
    }
  })
}

// sidebarの折りたたみ
function toggleSidebar() {
  // サイドバーがある"かつ"nosidebarではない
  const sidebar = document.querySelector('#sidebar')
  if(!sidebar || sidebar.closest('#main').classList.contains('nosidebar')) return

  // 開閉ボタン追加
  const btn = document.createElement('button')
  btn.textContent = 'サイドバーの開閉'
  btn.classList.add('aw_toggleSidebar')
  const mainContent = document.querySelector('#main')
  sidebar.appendChild(btn)

  // 切り替え処理
  const toggleTrigger = document.querySelector('.aw_toggleSidebar')
  toggleTrigger.addEventListener('click', () => {
    if(sidebar.classList.contains('isSidebarClose')) {
      sidebar.classList.remove('isSidebarClose')
      mainContent.classList.remove('isSidebarClose')
      toggleTrigger.classList.remove('isSidebarClose')
    } else {
      sidebar.classList.add('isSidebarClose')
      mainContent.classList.add('isSidebarClose')
      toggleTrigger.classList.add('isSidebarClose')
    }
  })
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

  // mainMenuがない場合headerはfull width表示
  if(document.querySelector('#main-menu') !== null) {
    document.querySelector('#header').classList.add('aw_hasMainMenu')
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
   * Main Menu / Sidebarの開閉機能
   */
  toggleMainMenu()
  toggleSidebar()


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