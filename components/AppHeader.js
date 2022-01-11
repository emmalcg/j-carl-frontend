import Link from 'next/link'

export default function AppHeader() {
  const rfqNav = [
    {title: 'Statement', link: '/rfq-statement'},
    {title: 'Work', link: '/rfq-work'},
    {title: 'Team', link: '/rfq-team'}
  ]

  return (
    <header className="flex justify-between mx-8 max-w-screen-xl mt-4 mb-8">
      <h1 className="text-1xl font-bold underline">
        <Link href="/">
          <a>James Carl Studio</a>
        </Link>
        | 
        <Link href='/rfq'>
          <a>RFQ</a>
        </Link>
      </h1>
      <nav>
        <ul className="hidden sm:ml-6 sm:flex sm:space-x-8">
          {
            rfqNav.map(item => {
              return (
              <li key={item.title}>
                <Link href={item.link}>
                  <a>{item.title}</a>
                </Link>
              </li>
              )
            })
          }
        </ul>
      </nav>
    </header>
  )
}
