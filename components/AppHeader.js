import Link from 'next/link'
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'


function MyLink(props) {
  const router = useRouter()
  let { href, children, ...rest } = props

  return (
    <Link href={href}>
      <a {...rest} className={`block border-b border-black hover:bg-gray-200 py-4 px-6 text-center z-100 ${router.pathname == href && "bg-gray-200"}`}>{children}</a>
    </Link>
  )
}

export default function AppHeader() {
  const rfqNav = [
    {title: 'Statement', link: '/rfq-statement'},
    {title: 'Team', link: '/rfq-team'},
    {title: 'Work', link: '/rfq-work'}
  ]

  const [isRFQ, setIsRFQ] = useState()
  
  const router = useRouter()
  
  
  useEffect(() => {
    router.pathname.includes('/rfq') ? setIsRFQ(true) : setIsRFQ(false)
     
    },[router.pathname])

  return (
    <header className="flex justify-between mt-4 mb-8 border border-black relative">
      <h1 className="text-1xl font-bold no-underline flex">
        <div className="flex justify-items-center">
          <Link href="/">
            <a className="border-r border-black py-2 px-6">James Carl Studio</a>
          </Link>
        </div>
        <div className="flex justify-items-center">
          <Link href='/rfq'>
            <a className={`border-r border-black py-2 px-6 ${router.pathname == "/rfq" && "bg-gray-200"}`}>RFQ</a>
          </Link>
        </div>
      </h1>
      { isRFQ && (

        <nav>
          <ul className="hidden sm:flex">
            {
              rfqNav.map(item => {
                return (
                <li className={`border-l border-black py-2 hover:bg-gray-200 ${router.pathname == item.link && "bg-gray-200"}`} key={item.title}>
                  <Link href={item.link}>
                    <a className={`hover:bg-gray-200 px-6 py-2 ${router.pathname == item.link && "bg-gray-200"}`}>{item.title}</a>
                  </Link>
                </li>
                )
              })
            }
          </ul>
          <Menu>
            <Menu.Button className="py-2 px-6 sm:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              >
              <Menu.Items className="block sm:hidden absolute right-[-1px] top-[40px] z-10 bg-white border border-black">
                {
                rfqNav.map(item => {
                  return (
                  <Menu.Item key={item.title}>
                    <MyLink href={item.link}>
                      {item.title}
                    </MyLink>
                  </Menu.Item>
                  )
                })
              }
              </Menu.Items>

            </Transition>

          </Menu>
        </nav>
      )}
    </header>
  )
}
