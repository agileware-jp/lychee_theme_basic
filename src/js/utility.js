/**
 * チケット詳細ページかどうかを判断する
 */
function isIssueDetailPage() {
  return document.body.classList.contains('controller-issues') && document.body.classList.contains('action-show')
}


/**
 * チケット情報のクイックコピー
 */
export function quickCopy() {
  if(!isIssueDetailPage()) return
}