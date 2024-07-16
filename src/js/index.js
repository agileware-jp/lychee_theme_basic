import { addDefaultSidebarStyle, initToggleSidebar } from './sidebar'

/* ちらつき防止のため、sidebarの初期スタイルを追加する */
addDefaultSidebarStyle()

/* 活動や検索結果で、各ブロックがdescriptionを持っているかどうか判定 */
function hasDescription(el) {
  // 文字列があるかどうかでチェック
  return el.textContent.length > 0
}

// 「ログイン中:」の文字を削除
function removeLoggedasText() {
  const loggedas = document.querySelector('#loggedas')
  if(!loggedas) return

  loggedas.childNodes[0].textContent = ''
}

// FBリンク追加
function addFeedbackLink() {
  const topMenuNav = document.querySelector('#top-menu #account ul')
  const li = document.createElement('li')
  const a = document.createElement('a')
  li.classList.add('aw_fbLink_li')
  a.classList.add('aw_fbLink')
  a.setAttribute('href', 'https://support.lychee-redmine.jp/feedback/')
  a.setAttribute('target', '_blank')
  a.textContent = 'フィードバックを送る'
  li.appendChild(a)
  topMenuNav.appendChild(li)
}


/* topMenuの折りたたみ等 */
function getTopMenu() {
  return document.getElementById('top-menu')
}

function topMenuExists() {
  return document.getElementById('top-menu') !== null
}

function isLoggedIn() {
  return document.getElementById('loggedas') !== null
}

function addLogoutStyle() {
  const isLoggedOut = true
  // ログアウト中は#loggedasが存在しないので、#accountにmargin-top: auto;を適用したい
  if(!isLoggedIn()) {
    const account = document.getElementById('account')
    account.style.marginTop = 'auto'
  }
}

function addBtnToToggleTopMenu() {
  if(!topMenuExists()) return

  const topMenu = getTopMenu()

  // 枠を作成
  const div = document.createElement('div')
  div.classList.add('aw_toggleTopMenuWrap')

  // ボタンを作成
  const btn = document.createElement('button')
  btn.textContent = 'メニューの開閉'
  btn.classList.add('aw_toggleTopMenu')

  div.appendChild(btn)
  topMenu.appendChild(div)
}

/**
 * その他一般的な処理
 */
window.addEventListener('DOMContentLoaded', () => {
  addBtnToToggleTopMenu()
  addLogoutStyle()
  removeLoggedasText()
  addFeedbackLink()

  /**
   * Sidebarの開閉機能
   */
  initToggleSidebar()

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