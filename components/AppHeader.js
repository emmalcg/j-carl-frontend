import Link from 'next/link'

export default function AppHeader() {
  const rfqNav = [
    {title: 'Statement', link: '/rfq-statement'},
    {title: 'Work', link: '/rfq-work'},
    {title: 'Team', link: '/rfq-team'}
  ]

  return (
    <header className="flex justify-between mx-8 max-w-screen-xl mt-4 mb-8 border border-black">
      <h1 className="text-1xl font-bold no-underline flex">
        <div className="flex justify-items-center">
          <Link href="/">
            <a className="border-r border-black py-2 px-6 ">James Carl Studio</a>
          </Link>
        </div>
        <div className="flex justify-items-center">
          <Link href='/rfq'>
            <a className="border-r border-black py-2 px-6">RFQ</a>
          </Link>
        </div>
      </h1>
      <nav>
        <ul className="hidden sm:flex">
          {
            rfqNav.map(item => {
              return (
              <li className="border-l border-black  py-2 px-6" key={item.title}>
                <Link href={item.link}>
                  <a>{item.title}</a>
                </Link>
              </li>
              )
            })
          }
        </ul>
      </nav>
      <button className="py-2 px-6 sm:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  )
}
