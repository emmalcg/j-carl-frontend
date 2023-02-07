import '../styles/globals.css'
import AppHeader from '../components/AppHeader'
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'

const { API_URL } = process.env;
const client = new ApolloClient({
  uri: `${API_URL}`,
  cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps, categories }) {
  const router = useRouter()

  const [isRFQ, setIsRFQ] = useState()
  const [loggedIn, setLoggedIn] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('loggedIn')
    saved && setLoggedIn(true)
  },[])

  useEffect(() => {
  router.pathname.includes('/rfq') ? setIsRFQ(true) : setIsRFQ(false)
    
  },[router.pathname])

  const pw = 'bands'
  
  const handleFormSubmit = (e) => {
    e.preventDefault()
    let password = e.target.elements.password?.value;
    if (password == pw) {
      setLoggedIn(true)
      localStorage.setItem('loggedIn', true)
    } else {
      setMessage('Wrong Password')
    }
  }

  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col">
        <div className="m-auto px-2 sm:px-4 md:px-16 max-w-screen-lg w-full flex flex-col">
          {!isRFQ && <Component {...pageProps} />}
          {isRFQ && loggedIn && <Component {...pageProps} />}
          {isRFQ && !loggedIn && (
            <>
              <AppHeader categories={categories} />
              <main>
                <div className="border border-black max-w-[300px] m-auto">
                  <form onSubmit={handleFormSubmit}>
                    <div className="flex flex-col text-center">
                      <label className="py-2" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="border-y border-black p-2 text-center"
                        type="password"
                        id="password"
                      />
                    </div>
                    <button className="text-center w-full py-2 hover:bg-gray-200">
                      Submit
                    </button>
                  </form>
                  {message && (
                    <p className="border-t border-black py-2 text-center text-red-800 font-bold">
                      {message}
                    </p>
                  )}
                </div>
              </main>
            </>
          )}
        </div>
      </div>
    </ApolloProvider>
  );
}



