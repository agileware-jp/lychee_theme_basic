/**
 * スクロールでトップへ戻る
 */
let backToTopBtn = null

function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

export function createBackToTopBtn() {
  if(!backToTopBtn) {
    backToTopBtn = document.createElement('button')
    backToTopBtn.classList.add('aw_backToTop')
    backToTopBtn.textContent = 'トップへ戻る'
    backToTopBtn.style.display = 'none'

    backToTopBtn.addEventListener('click', backToTop)

    document.body.appendChild(backToTopBtn)
  }
}

// 一定量スクロールされた場合のみボタンを表示したい
export function toggleBackToTopBtn() {
  if(!backToTopBtn) return
  const SCROLL_THRESHOLD = 150

  const scrollPosition = document.documentElement.scrollTop
  if(scrollPosition > SCROLL_THRESHOLD) {
    backToTopBtn.style.display = 'block'
  } else {
    backToTopBtn.style.display = 'none'
  }
}
