import { t } from './transration'

const TOP_MENU_OPEN_STYLE = `
  #wrapper {
    margin-left: 180px
  }

  #top-menu {
    width: 180px;
  }
`

const TOP_MENU_CLOSE_STYLE = `
  #wrapper {
    margin-left: 52px;
  }

  #top-menu {
    width: 52px;
  }
`

const TOGGLE_TOP_MENU_WRAP_STYLE = `
  border-bottom: 1px solid #ccd5d9;
  margin-top: -53px;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
`

const TOGGLE_TOP_MENU_BTN_STYLE = `
  display: block;
  background-repeat: no-repeat;
  background-size: 20px 20px;
  background-position: 4px center;
  border: 0;
`

export function addDefaultTopMenStyle() {
  const styleTag = document.createElement('style')
  const isTopMenuOpen = localStorage.getItem('isTopMenuOpen') === 'true'
  styleTag.setAttribute('data-style', 'topMenu')
  styleTag.textContent = isTopMenuOpen ? TOP_MENU_OPEN_STYLE : TOP_MENU_CLOSE_STYLE

  document.head.appendChild(styleTag)
}

function updateTopMenuStyle() {
  const styleTag = document.querySelector('style[data-style="topMenu"]')
  const isTopMenuOpen = localStorage.getItem('isTopMenuOpen') === 'true'
  styleTag.textContent = isTopMenuOpen ? TOP_MENU_OPEN_STYLE : TOP_MENU_CLOSE_STYLE
}

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
  div.style.cssText = TOGGLE_TOP_MENU_WRAP_STYLE
  div.classList.add('aw_toggleTopMenuWrap')

  // ボタンを作成
  const btn = document.createElement('button')
  btn.textContent = 'メニューを固定する'
  btn.style.cssText = TOGGLE_TOP_MENU_BTN_STYLE
  btn.classList.add('aw_toggleTopMenu')

  toggleTopMenu(btn)

  div.appendChild(btn)
  topMenu.appendChild(div)
}

function toggleTopMenu(btn) {
  let isTopMenuOpen = false
  if(localStorage.getItem('isTopMenuOpen') === 'true') {
    isTopMenuOpen = true
  } else {
    isTopMenuOpen = false
  }

  btn.addEventListener('click', () => {
    isTopMenuOpen = !isTopMenuOpen

    if(isTopMenuOpen) {
      document.body.classList.add('isTopMenuOpen')
      localStorage.setItem('isTopMenuOpen', true)
    } else {
      document.body.classList.remove('isTopMenuOpen')
      localStorage.setItem('isTopMenuOpen', false)
    }
    updateTopMenuStyle()
  })
}

function addTopMenuHoverEffect() {
  const topMenu = getTopMenu()
  if(!topMenu) return

  const DELAY = 100
  let hoverTimer

  topMenu.addEventListener('mouseenter', () => {
    hoverTimer = setTimeout(() => {
      // メニュー展開固定時にはマウスオーバーアニメーションは不要なので、閉じているときのみ実行
      if(!document.body.classList.contains('isTopMenuOpen')) {
        topMenu.classList.add('aw_topMenuHover')
      }
    }, DELAY)
  })

  topMenu.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimer)
    topMenu.classList.remove('aw_topMenuHover')
  })
}

export function initToggleTopMenu() {
  addBtnToToggleTopMenu()
  addTopMenuHoverEffect()
  addLogoutStyle()

  // topMenuの復原処理
  if(localStorage.getItem('isTopMenuOpen') === 'true') {
    document.body.classList.add('isTopMenuOpen')
  } else {
    document.body.classList.remove('isTopMenuOpen')
  }
}


/**
 * ヘルプメニューの位置を変更する
 */
export function moveLycheeHelp() {
  const lycheeHelp = document.querySelector('.lychee-help')
  if(lycheeHelp === null) return

  const lycheeHelpWrap = lycheeHelp.closest('li')
  const accountMenu = document.querySelector('#account > ul')

  lycheeHelpWrap.classList.add('aw_lycheeHelp_li')
  lycheeHelpWrap.style.order = '5'

  accountMenu.appendChild(lycheeHelpWrap)
}


/**
 * フィードバック用リンクの追加
 */
export function addFeedbackLink() {
  const topMenuNav = document.querySelector('#top-menu #account ul')

  // フィードバックリンクの要素を生成
  const li = document.createElement('li')
  const a = document.createElement('a')
  li.classList.add('aw_fbLink_li')
  a.classList.add('aw_fbLink')

  // ベースとなるURL
  const baseURL = 'https://community.lychee-redmine.jp/projects/lychee-redmine/issues/new'

  // 遷移元のプラグイン名 TODO: pluginにプラグイン名が動的に入るようにする
  const plugin = 'lgc'

  // クエリパラメータとしてセット
  const url = new URL(baseURL)
  url.searchParams.set('plugin', plugin)

  // aタグに情報をセット
  a.setAttribute('href', url.toString())
  a.setAttribute('target', '_blank')
  a.textContent = t('sendFeedback')

  // ちらつき防止のため、ちらつきが発生するスタイルはあらかじめjsで指定
  li.style.cssText = `order: 4;`
  a.style.cssText = `padding-left: 1.75rem;`

  // 別サイトへリンクすることを明示する
  a.addEventListener('click')

  // フィードバックリンクの追加
  li.appendChild(a)
  topMenuNav.insertBefore(li, topMenuNav.firstElementChild)
}