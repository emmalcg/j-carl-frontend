import Link from 'next/link'

export default function ListLink({artwork}) {

  const slug = artwork.Slug
  return (
    <li className="list-none flex flex-col md:flex-row mt-7">
      <Link href={`/work/${slug}`} key={`${slug}`}>
        <a className="underline">
          <span>{artwork.title}</span>, {artwork.yearStarted}
          
          {artwork.yearEnded && `-${artwork.yearEnded}`}
          </a>
      </Link>
    </li> 
  )
}
