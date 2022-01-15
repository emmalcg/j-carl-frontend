import '../styles/globals.css'
import AppHeader from '../components/AppHeader'

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col">
      <div className="m-auto px-4 md:px-16 max-w-screen-lg w-full">
        <AppHeader />
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
