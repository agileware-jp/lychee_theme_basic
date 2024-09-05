export function insertTextMessageBox() {
  // メッセージボックに既読時・未読時の文章を差し込む
  const messageBox = document.querySelector('#top-menu #account .lychee-message-box-icon')
  if(messageBox === null) return

  setTimeout(() => {
    if(messageBox.classList.contains('unread')) {
      messageBox.textContent = 'メッセージがあります'
    } else {
      messageBox.textContent = 'メッセージ'
    }
  }, 0)
}