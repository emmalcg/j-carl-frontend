import Link from 'next/link'
import { useRouter } from "next/router";
import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import NavSub from './NavSubheading';
import RfqHeader from './RfqHeader';

function MainLink(props) {
  const router = useRouter()
  let { href, children, ...rest } = props

  return (
    <Link href={href}>
      <a {...rest} className={`block border-b border-black py-4 px-6 text-center z-100 ${router.pathname == href && "underline"}`}>{children}</a>
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

export default function AppHeader({categories, currentPath = '/', currentType = ''}) {
  const workNav = categories?.filter(cat => cat.attributes.type === 'Work')
  const yearNav = categories?.filter(cat => cat.attributes.type === 'Year')
  const aboutNav = categories?.filter(cat => cat.attributes.type === 'About')


  console.log({currentType})

  //const years = ['2020s', '2010s', '2000s', '1990s']

  const router = useRouter()

  const [isRFQ, setIsRFQ] = useState(router.pathname.includes('/rfq') ? true : false)
  const [workOpen, setWorkOpen] = useState(currentType === 'Work' || router.pathname.includes('/work') || currentType === 'Year')
  const [aboutOpen, setAboutOpen] = useState(currentType === 'About')

 
  
  useEffect(() => {
    router.pathname.includes('/rfq') ? setIsRFQ(true) : setIsRFQ(false)
  },[router.pathname])


  return (
    <header className="text-sm sm:text-base mt-2 sm:mt-4 mb-4">
      {
        !isRFQ && (
        <span>

          <div className="flex justify-between border border-black relative">
            <div className="no-underline flex w-full">
              <h1 className="flex justify-items-center">
                <Link href="/">
                  <a onClick={() => {setWorkOpen(false); setAboutOpen(false)}} className={`text-1xl font-bold border-r border-black py-2 px-4 sm:px-6 hover:underline`}>James Carl</a>
                </Link>
              </h1>
                  <nav className="grow">
                    <ul className="flex w-full">
                      <li className={`border-r border-black py-2 px-3 sm:px-4 ${workOpen &&  "underline"}`}>
                        <Link href="/work">
                          <a className="font-medium hover:underline">Work</a></Link>
                      </li>
                      {
                        workOpen && (
                          <ul className="hidden sm:flex"> 
                            {
                              yearNav.map(year => 
                                  <li key={`${year.attributes.title}-large`}>
                                    <Link href={`/${year.attributes.slug}`}>
                                      <a className={`block py-2 px-4 hover:underline text-[14px] ${currentPath.includes(year.attributes.slug) && `italic underline`}`}>{year.attributes.title}</a>
                                    </Link>
                                  </li>
                                )
                            }
                          </ul>
                        )
                      }
                      {/*{
                        workOpen && (
                          <ul className="hidden sm:flex"> 
                            {
                              workNav.map(item => 
                                  <li key={`${item.attributes.slug}-large`}>
                                    <Link href={`/${item.attributes.slug}`}>
                                      <a className={`block py-2 px-4 hover:underline ${currentPath.includes(item.attributes.slug) && `italic underline`}`}>{item.attributes.title}</a>
                                    </Link>
                                  </li>
                                )
                            }
                          </ul>
                        )
                      }*/}

                      <li className={`border-r border-black py-2 px-3 sm:px-4 hover:underline ${aboutOpen && "underline"} ${workOpen && "border-l border-r-0 ml-auto"}`}>
                        <Link href="/about">
                          <a className="font-medium hover:underline">About</a></Link>
                      </li>
                      {
                        aboutOpen && (
                          <ul className="hidden sm:flex"> 
                            {
                              aboutNav.map(item => 
                                  <li key={`${item.attributes.slug}-large`}>
                                    <Link href={`/${item.attributes.slug}`}>
                                      <a className={`block py-2 px-4 hover:underline text-[14px] ${currentPath.includes(item.attributes.slug) && `italic underline`}`}>{item.attributes.title}</a>
                                    </Link>
                                  </li>
                                )
                            }
                          </ul>
                        )
                      }
                    </ul>
                  </nav>
            </div>
          </div>
          {/*{
            workOpen && (
              <>
              Sort by: type
              
              </>
            )
          }*/}
          {
            workOpen && (
              <div className="border border-black border-t-0">
                {/*<ul className="flex"> 
                  {
                    workNav.map(item => 
                        <li className="" key={item.attributes.slug}>
                          <Link href={`/${item.attributes.slug}`}>
                            <a className={`block py-2 px-4 hover:underline text-[14px] ${currentPath.includes(item.attributes.slug) && `italic underline`}`}>{item.attributes.title}</a>
                          </Link>
                        </li>
                      )
                  }
                </ul>*/}
                {/*<div className="flex"> 
                  <p>Sort by: </p>*/}
                  <ul className="flex">
                    {/*<li>Years</li>
                    <li>Type</li>
                    <li>Exhibitions</li>*/}
                    {/*{
                      workNav.map(item => 
                          <li className="" key={item.attributes.slug}>
                            <Link href={`/${item.attributes.slug}`}>
                              <a className={`block py-2 px-4 hover:underline text-[14px] ${currentPath.includes(item.attributes.slug) && `italic underline`}`}>{item.attributes.title}</a>
                            </Link>
                          </li>
                        )
                    }*/}
                  </ul>
                {/*</div>*/}
              </div>
            )
          }
          {
            aboutOpen && (
              <div className="border border-black border-t-0 sm:hidden">
                <ul className="flex"> 
                  {
                    aboutNav.map(item => 
                        <li className="border-r border-black" key={item.attributes.slug}>
                          <Link href={`/${item.attributes.slug}`}>
                            <a className={`block py-2 px-4 hover:underline ${currentPath.includes(item.attributes.slug) && `italic underline`}`}>{item.attributes.title}</a>
                          </Link>
                        </li>
                      )
                  }
                </ul>
              </div>
            )
          }
        </span>

        )
      }
      {
        isRFQ && (
          <RfqHeader />
        )
      }
    </header>
  )
}