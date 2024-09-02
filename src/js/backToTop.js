/**
 * スクロールでトップへ戻る
 */
let backToTopBtn = null

function backToTop(speed) {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 0) {
      window.requestAnimationFrame(() => backToTop(speed));
      window.scrollTo(0, scrollTop - scrollTop / speed);
  }
}

export function createBackToTopBtn() {
  if(!backToTopBtn) {
    backToTopBtn = document.createElement('button')
    backToTopBtn.classList.add('aw_backToTop')
    backToTopBtn.textContent = 'トップへ戻る'
    backToTopBtn.style.display = 'none'

    backToTopBtn.addEventListener('click', () => backToTop(2))

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