import Link from 'next/link'
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import NavSub from './NavSubheading';

function MainLink(props) {
  const router = useRouter()
  let { href, children, ...rest } = props

  return (
    <Link href={href}>
      <a {...rest} className={`block border-b border-black hover:bg-gray-200 py-4 px-6 text-center z-100 ${router.pathname == href && "bg-gray-200"}`}>{children}</a>
    </Link>
  )
}

function SubLink(props) {
  const router = useRouter()
  let { href, children, ...rest } = props

  return (
    <Link href={href}>
      <a {...rest} className={`block py-2 px-4 underline ${router.pathname == href && "font-medium"}`}>{children}</a>
    </Link>
  )
}

export default function RfqHeader({categories, currentPath = '/', currentType = ''}) {
  const workNav = categories?.filter(cat => cat.attributes.type === 'Work')
  const aboutNav = categories?.filter(cat => cat.attributes.type === 'About')

  
  const router = useRouter()

  const rfqNav = [
    {title: 'Statement', link: '/rfq-statement'},
    {title: 'Team', link: '/rfq-team'},
    {title: 'Work', link: '/rfq-work'}
  ]

  return (
    <header className="text-sm sm:text-base mt-2 sm:mt-4 mb-4 sm:mb-8">
      <div className="flex justify-between border border-black relative">
        <div className="no-underline flex w-full">
          <h1 className="flex justify-items-center">
            <Link href="/">
              <a className={`text-1xl font-bold border-r border-black py-2 px-4 sm:px-6 hover:bg-gray-200`}>
                James Carl
              </a>
            </Link>
          </h1>
          
          <div className="text-1xl font-bold flex justify-items-center">
            <Link href='/rfq'>
              <a className={`border-black py-2 px-3 sm:px-6 border-r ${router.pathname == "/rfq" && "bg-gray-200"}`}>RFQ</a>
            </Link>
          </div>
         
        </div>
        <nav className="grow sm:grow-0">
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
            <Menu.Button className="py-2 px-4 flex mx-auto sm:hidden">
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
                    <MainLink href={item.link}>
                      {item.title}
                    </MainLink>
                  </Menu.Item>
                  )
                })
              }
              </Menu.Items>

            </Transition>

          </Menu>
        </nav>
      </div>
    </header>
  )
}
