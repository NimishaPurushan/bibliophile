import Navigation from './Navigation'
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