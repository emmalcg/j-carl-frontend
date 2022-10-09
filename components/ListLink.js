import Link from 'next/link'

export default function ListLink({artwork}) {

  const slug = artwork.slug
  console.log(artwork)
  return (
    <li className="list-none flex flex-col md:flex-row my-7">
      <Link href={`/work/${slug}`} key={`${slug}`}>
        <a className="underline">
          <span className="italic">{artwork.title}</span>, {artwork.yearStarted}
          
          {artwork.yearEnded && `-${artwork.yearEnded}`}
          </a>
      </Link>
    </li>
  )
}
