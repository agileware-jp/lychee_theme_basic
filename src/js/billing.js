/**
 * Billingがメッセージを出している場合は上部に固定する
 * Billing側がjsでHTMLを追加しており、普通に取得するとnullになるため、setIntervalを使って確実に取得する
 */
export function waitForBilling(targetSelector, callback, intervalTime = 100) {
  const interval = setInterval(() => {
    const billingContainer = document.getElementById(targetSelector)
    if(billingContainer !== null) {
      clearInterval(interval)
      callback(billingContainer)
    }
  }, intervalTime)
}

/* billingメッセージが表示されているかどうかの判定 */
export function checkTrial(billingContainer) {
  if(billingContainer.textContent !== '') {
    document.body.classList.add('isBilling')
  }
}

/* billingメッセージが表示されているならば移動する */
export function copyBillingContainer(billingContainer) {
  const cloneBilling = billingContainer.cloneNode(true)
  const wrapper = document.getElementById('wrapper')
  wrapper.insertBefore(cloneBilling, wrapper.firstElementChild)
}