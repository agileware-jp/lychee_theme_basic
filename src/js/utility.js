/**
 * チケットの題名を取得して返す
 * Note: プラグインによってはチケット題名のHTML構造を変更するものがあるため、この処理で取得している
 */
function getCleanTitle(selector) {
  const el = document.querySelector(selector);
  if (!el) return '';

  // `button` 要素を取得（1つだけ）
  const excludedElement = el.querySelector('button');

  let text = '';
  el.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE && node !== excludedElement) {
      text += node.textContent;
    }
  });

  return text;
}


export function quickCopy() {
  const requiredClasses = ['controller-issues', 'action-show']
  if(!requiredClasses.every(el => document.body.classList.contains(el))) return

  const copyBtn = document.createElement('button')
  copyBtn.textContent = 'チケット情報をコピー'
  copyBtn.className = 'aw_copyIssueInfo'
  copyBtn.title = 'チケット情報をコピー'

  const issueIdAndTracker = document.querySelector('#content .issue .subject h3')
  if(issueIdAndTracker) {
    issueIdAndTracker.prepend(copyBtn)
  }

  copyBtn.addEventListener('click', (e) => {
    // urlの取得
    const url = encodeURI(window.location.href);

    // チケットIDの生成
    const pathSegments = new URL(url).pathname.split('/')
    const issueId = pathSegments[pathSegments.length - 1]

    // チケット題名の取得
    const issueSubject = getCleanTitle('#content .issue .subject h3')

    // [チケットID＋題名 \n URL]の形を作る
    const issueInfo = `#${issueId} ${issueSubject}\n${url}`

    if(issueInfo) {
      navigator.clipboard.writeText(issueInfo).then(() => {
        copyBtn.classList.add('is_copied')

        setTimeout(() => {
          copyBtn.classList.remove('is_copied')
        }, 1250)
      }).catch(error => {
        console.log('チケットIDのコピーに失敗しました', error)
      })
    } else {
      console.log('チケットIDが取得できません')
    }
  })
}