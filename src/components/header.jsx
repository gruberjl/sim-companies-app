import { render } from 'preact'

const Header = ({currentPage}) => {
  return (
    <header>
      <a href="/">Home</a>
      <a href="/required-to-build.html">Required to build</a>
    </header>
  )
}

export default Header