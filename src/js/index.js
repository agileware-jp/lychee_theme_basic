import { addDefaultSidebarStyle, initToggleSidebar } from './sidebar'

/* ちらつき防止のため、sidebarの初期スタイルを追加する */
addDefaultSidebarStyle()

/* .tabs-buttons(main menuが見切れる時のページ送りUI)を非表示にする */
// Note: HTMLのstyle属性でして押されておりテーマcssで上書きできないため、テーマjsで上書きする
function hiddenTabsButtons() {
  const tabsButton = document.querySelector('#main-menu .tabs-buttons')
  if(tabsButton) {
    tabsButton.classList.remove('tabs-buttons')
    tabsButton.style.display = 'none'
  }
}

function setMainMenuTop() {
  const mainMenu = document.querySelector('#main-menu')
  const topMenu = document.querySelector('#top-menu')

  if(mainMenu) {
    mainMenu.style.top = `${topMenu.offsetHeight}px`
  }
}

/* top menuの位置入れ替えのためにclassを付与 */
function repositionTopMenu() {
  const home = document.querySelector('#top-menu ul li .home')
  if(home) home.closest('li').classList.add('aw_topMenuHome')
}

/* 活動や検索結果で、各ブロックがdescriptionを持っているかどうか判定 */
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

  /**
   * Sidebarの開閉機能
   */
  initToggleSidebar()

  // mainMenuがあるかどうか
  if(document.querySelector('#main-menu') !== null) {
    // mainMenuがない場合headerはfull width表示にするため、区別用classを付与しておく
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
   * .menu-childrenの展開位置を指定
   */
  const newObjectBtn = document.querySelector('.new-object')
  if(newObjectBtn) {
    // Note: .new-objectの親要素(li)にマウスイベントを設定する
    //       .new-object自体に設定すると、.new-objectから.menu-childrenにマウスが移動した瞬間にtopがautoになってしまうため、一瞬カクついてしまう。
    const newObjectWrapper = newObjectBtn.closest('li')
    newObjectWrapper.classList.add('aw_newObjectList')

    newObjectWrapper.addEventListener('mouseenter', e => {
      e.target.querySelector('.menu-children').style.top = `${e.target.getBoundingClientRect().bottom}px`
    })

    newObjectWrapper.addEventListener('mouseleave', e => {
      // メニューを展開している間はマウスが離れてもtopを変更しない(メニューがおかしな位置に移動する現象が発生するため)
      if(!e.target.querySelector('.menu-children').classList.contains('visible')) {
        e.target.querySelector('.menu-children').style.top = `auto`
      }
    })
  }


  /**
   * LGCのカスタムクエリ作成ページかどうかを判定
   */
  const lgcQueriesBodyClasses = document.body.classList
  if([...lgcQueriesBodyClasses].includes('controller-lgc/queries')) {
    document.body.classList.add('aw_lgcQueries')
  }
})