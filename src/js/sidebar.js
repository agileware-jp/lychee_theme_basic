const sidebarOpenStyle = `
  #sidebar {
    width: 15rem;
    padding-right: 0.75rem;
    padding-left: 1rem;
  }

  #sidebar.isSidebarClose {
    width: 0;
    padding-right: 0;
  }
`

const sidebarCloseStyle = `
  #sidebar {
    width: 0px;
    padding-right: 0;
    padding-left: 1rem;
  }

  #sidebar *:not(.aw_toggleSidebar) {
    opacity: 0;
  }

  #sidebar.isSidebarOpen {
    width: 15rem;
    padding-right: 0.75rem;
  }

  #sidebar.isSidebarOpen *:not(.aw_toggleSidebar) {
    opacity: 1;
  }
`

// ちらつき防止の為、sidebarの初期スタイルを先に定義しておく
export function addDefaultSidebarStyle() {
  const styleTag = document.createElement('style')
  document.head.appendChild(styleTag)

  const isSidebarClose = localStorage.getItem('isSidebarClose') === 'true'

  styleTag.textContent = isSidebarClose ? sidebarCloseStyle : sidebarOpenStyle
}