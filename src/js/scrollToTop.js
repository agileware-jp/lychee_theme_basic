/**
 * スクロールでトップへ戻る
 */
let scrollToTopBtn = null

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

export function createScrollToTopBtn() {
  if(!scrollToTopBtn) {
    scrollToTopBtn = document.createElement('button')
    scrollToTopBtn.classList.add('aw_scrollToTop')
    scrollToTopBtn.textContent = 'トップへ戻る'
    scrollToTopBtn.style.display = 'none'

    scrollToTopBtn.addEventListener('click', scrollToTop)

    document.body.appendChild(scrollToTopBtn)
  }
}

// 一定量スクロールされた場合のみボタンを表示したい
export function toggleBackToTopBtn() {
  if(!scrollToTopBtn) return
  const SCROLL_THRESHOLD = 150

  const scrollPosition = document.documentElement.scrollTop
  if(scrollPosition > SCROLL_THRESHOLD) {
    scrollToTopBtn.style.display = 'block'
  } else {
    scrollToTopBtn.style.display = 'none'
  }
}
