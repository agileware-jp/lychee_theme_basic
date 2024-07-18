function isMenuExists() {
  return document.querySelector('#main-menu > ul:not(.menu-children)') !== null
}

function getMainMenu() {
  return document.querySelector('#main-menu > ul:not(.menu-children)')
}

export function addNoScrollClass() {
  if(!isMenuExists()) return

  const container = getMainMenu()
  if(container.scrollWidth > container.clientWidth) {
    container.classList.remove('noScroll')
  } else {
    container.classList.add('noScroll')
  }
}