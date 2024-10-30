import Navbar from '../Navbar/Navbar'
import './NotFound.scss'

function NotFound() {
  return(
    <>
    <Navbar />
    <section className='notFound'>
      <h1>404</h1>
      <h3>Page not found</h3>
    </section>
    </>
  )
}

export default NotFound