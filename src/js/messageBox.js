import { t } from './transration'

export function insertTextMessageBox() {
  // メッセージボックに既読時・未読時の文章を差し込む
  const messageBox = document.querySelector('#top-menu #account .lychee-message-box-icon')
  if(messageBox === null) return

  setTimeout(() => {
    if(messageBox.classList.contains('unread')) {
      messageBox.textContent = t('unreadMessages')
    } else {
      messageBox.textContent = t('noMessages')
    }
  }, 0)
}