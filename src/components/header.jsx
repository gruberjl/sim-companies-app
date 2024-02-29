import { render } from 'preact'

const Header = ({currentPage}) => {
  return (
    <div className="header-container">
      <div class="pure-menu pure-menu-horizontal main">
        <ul class="pure-menu-list">
          <li class={currentPage == '/' ? "pure-menu-item pure-menu-selected" : "pure-menu-item"}>
            <a href="/" class="pure-menu-link">Home</a>
          </li>
          <li class={currentPage == '/required-to-build.html' ? "pure-menu-item pure-menu-selected" : "pure-menu-item"}>
            <a href="/required-to-build.html" class="pure-menu-link">Required to build</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header