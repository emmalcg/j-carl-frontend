import Link from 'next/link'

export default function AppHeader() {
  const rfqNav = [
    {title: 'Statement', link: '/rfq-statement'},
    {title: 'Work', link: '/rfq-work'},
    {title: 'Team', link: '/rfq-team'}
  ]

  return (
    <header>
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
        <ul class="flex">
          {
            rfqNav.map(item => {
              return (
              <li>
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
