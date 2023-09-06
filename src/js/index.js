// .tabs-buttons(main menuが見切れる時のページ送りUI)を非表示にする(HTMLのstyle属性でして押されておりテーマcssで上書きできないため)
function hiddenTabsButtons() {
  return document.querySelector('#main-menu .tabs-buttons').classList.remove('tabs-buttons')
}

function setMainMenuTop() {
  const mainMenu = document.querySelector('#main-menu')
  const header = document.querySelector('#header')

  if(mainMenu) {
    mainMenu.style.top = `${header.offsetHeight}px`
  }
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
  const commitBtns = document.querySelectorAll('input[name="commit"]')
  const continueBtns = document.querySelectorAll('input[name="continue"]')
  if(commitBtns) {
    for (const commitBtn of commitBtns) {
      if(commitBtn.nextElementSibling.textContent === 'キャンセル') {
        commitBtn.nextElementSibling.classList.add('aw_cancelBtn')
      }
    }
  }

  if(continueBtns) {
    for (const continueBtn of continueBtns) {
      if(continueBtn.nextElementSibling.textContent === 'キャンセル') {
        continueBtn.nextElementSibling.classList.add('aw_cancelBtn')
      }
    }
  }


  /**
   * レポート（Issue > Summary > 虫眼鏡アイコン）ページの戻るボタン
   */
  const reportPage = document.querySelector('.controller-reports')
  if(reportPage) {
    const btns = document.querySelectorAll('a')
    for (const btn of btns) {
      if(btn.textContent === '戻る') {
        btn.classList.add('aw_secondaryBtn')
      }
    }
  }
})