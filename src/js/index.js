import { addDefaultTopMenStyle, initToggleTopMenu } from './topMenu'
import { addNoScrollClass, saveMainMenuScrollPosition, restoreMainMenuScrollPosition } from './mainMenu'
import { addDefaultSidebarStyle, initToggleSidebar } from './sidebar'
import { waitForBilling, checkTrial, copyBillingContainer } from './billing'

/* ちらつき防止のため、topMenuの初期スタイルを追加する */
addDefaultTopMenStyle()

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

/* 活動や検索結果で、各ブロックがdescriptionを持っているかどうか判定 */
function hasDescription(el) {
  // 文字列があるかどうかでチェック
  return el.textContent.length > 0
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

  // ちらつき防止のため、ちらつきが発生するスタイルはあらかじめjsで指定
  li.style.cssText = `
    order: 4;
  `

  a.style.cssText = `
    padding-left: 1.5rem;
  `

  li.appendChild(a)
  topMenuNav.insertBefore(li, topMenuNav.firstElementChild)
}

/**
 * MainMenuの横スクロールに関する処理
 */
window.addEventListener('resize', addNoScrollClass)
window.addEventListener('beforeunload', saveMainMenuScrollPosition);
window.addEventListener('load', restoreMainMenuScrollPosition);

/**
 * その他一般的な処理
 */
window.addEventListener('DOMContentLoaded', () => {
  hiddenTabsButtons()
  addFeedbackLink()

  waitForBilling('lychee-billng-global-message', (el) => {
    checkTrial(el)
    copyBillingContainer(el)
  })

  /**
   * TopMenuの開閉機能
   */
  initToggleTopMenu()


  /**
   * MainMenuの調整
   */
  addNoScrollClass()


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


  /**
   * 検証用：上にちょっとするクロールするとmain-menuを固定表示にしたい
   */
  let lastScrollTop = 0
  let scrollTimer
  let hideTimer
  const wrapper = document.getElementById('wrapper')
  const SCROLL_THRESHOLD = 80 // PJメニューを表示するまでのスクロール量を指定（この場合一度に15px以上スクロールされたらPJメニューを表示する）
  const CLASS_NAME = 'scrolled-up'
  const SHOW_DELAY = 200
  const HIDE_DELAY = 2000

  const mainMenu = document.getElementById('main-menu')
  let isMouseOverMainMenu = false
  mainMenu.addEventListener('mouseenter', () => {
    isMouseOverMainMenu = true
    clearTimeout(hideTimer)
    console.log(isMouseOverMainMenu)
  })

  mainMenu.addEventListener('mouseleave', () => {
    isMouseOverMainMenu = false
    console.log(isMouseOverMainMenu)
    hideTimer = setTimeout(() => {
      if (!isMouseOverMainMenu) {
          wrapper.classList.remove(CLASS_NAME);
      }
    }, HIDE_DELAY);
  })

  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer)
    clearTimeout(hideTimer)

    let scrollTop = window.scrollY || document.documentElement.scrollTop
    const headerHeight = document.getElementById('header').offsetHeight

    // TODO: PJメニューの表示非表示にフェードかけたいので、それ用のclassを付与したい
    // header部分が隠れたら、アニメーション用のclassを付与
    // if(scrollTop > headerHeight) {
    //   mainMenu.classList.add('fade-in')
    // }

    if(scrollTop > lastScrollTop || scrollTop <= headerHeight) {
      // 少しでも下にスクロールした場合はPJメニューを非表示に
      wrapper.classList.remove(CLASS_NAME)
      lastScrollTop = scrollTop
    } else {
      // スクロール後すぐに出すのではなく、一定時間経過後に表示したい
      scrollTimer = setTimeout(() => {
        if(lastScrollTop - scrollTop > SCROLL_THRESHOLD) {
          wrapper.classList.add(CLASS_NAME)
        }

        // 一定時間操作がなければ非表示にしたい
        hideTimer = setTimeout(() => {
          if(!isMouseOverMainMenu) {
            wrapper.classList.remove(CLASS_NAME)
          }
        }, HIDE_DELAY)

        lastScrollTop = scrollTop
      }, SHOW_DELAY)
    }
  })
})