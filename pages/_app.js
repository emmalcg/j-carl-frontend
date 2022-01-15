import '../styles/globals.css'
import AppHeader from '../components/AppHeader'
import { useState } from 'react'

export default function MyApp({ Component, pageProps }) {

  const [loggedIn, setLoggedIn] = useState(false)
  const pw = 'bands'
  
  const handleFormSubmit = (e) => {
    e.preventDefault()
    let password = e.target.elements.password?.value;
    if (password == pw) {
      setLoggedIn(true)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="m-auto px-4 md:px-16 max-w-screen-lg w-full flex flex-col">
        <AppHeader />
        {
          loggedIn 
          ? <Component {...pageProps} />
          :  (
          <div className="border border-black max-w-[300px] m-auto">
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col text-center">
                <label className="py-2" htmlFor="password">Password</label>
                <input className="border-y border-black p-2 text-center" type="password" id="password" type="text" />
              </div>
              <button className="text-center w-full py-2 hover:bg-gray-200">Submit</button>
            </form>
          </div>
        )
        
        }
      </div>
    </div>
  )
}




