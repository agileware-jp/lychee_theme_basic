// .tabs-buttons(main menuが見切れる時のページ送りUI)を非表示にする(HTMLのstyle属性でして押されておりテーマcssで上書きできないため)
function hiddenTabsButtons() {
  const tabsButton = document.querySelector('#main-menu .tabs-buttons')
  if(tabsButton) tabsButton.classList.remove('tabs-buttons')
}

function setMainMenuTop() {
  const mainMenu = document.querySelector('#main-menu')
  const header = document.querySelector('#header')

  if(mainMenu) {
    mainMenu.style.top = `${header.offsetHeight}px`
  }
}

// top menuの位置入れ替えのためにclassを付与
function repositionTopMenu() {
  const home = document.querySelector('#top-menu ul li .home')
  const help = document.querySelector('#top-menu ul li .help')
  const lycheeHelp = document.querySelector('#top-menu ul li .lychee-help')
  const administration = document.querySelector('#top-menu ul li .administration')

  if(home) home.closest('li').classList.add('aw-topMenuHome')
  if(help) help.closest('li').classList.add('aw-topMenuHelp')
  if(lycheeHelp) lycheeHelp.closest('li').classList.add('aw-topMenuHelp')
  if(administration) administration.closest('li').classList.add('aw-topMenuAdministration')
}

/** 活動や検索結果で、各ブロックがdescriptionを持っているかどうか判定 */
function hasDescription(el) {
  // 文字列があるかどうかでチェック
  return el.textContent.length > 0
}

function stickyMainMenu() {
  const mainMenu = document.querySelector('#main-menu')
  const header = document.querySelector('#header')

  if(mainMenu) {
    const headerHeightRectBottom = header.getBoundingClientRect().bottom

    if(headerHeightRectBottom <= 0) {
      mainMenu.classList.add('aw_fixed_header')
      mainMenu.style.top = '0px'
    }

    if(headerHeightRectBottom > 0) {
      mainMenu.classList.remove('aw_fixed_header')
      mainMenu.style.top = `${header.offsetHeight}px`
    }
  }
}

window.addEventListener('scroll', stickyMainMenu)

window.addEventListener('DOMContentLoaded', () => {
  hiddenTabsButtons()
  repositionTopMenu()

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
    console.log(newObjectBtn)
    newObjectBtn.closest('li').classList.add('aw_newObjectList')
  }
})