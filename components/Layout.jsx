import Navigation from './Navigation'
import MenuAppBar from './header'
import Footer from './Footer'
import styles from '../styles/Home.module.css'

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout