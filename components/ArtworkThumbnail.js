import MyImage from './MyImage'
import Link from 'next/link'
import { useRouter } from "next/router";

export default function ArtworkThumbnail({artwork}) {
  //const artist = artwork?.people?.data[0]?.attributes?.lastName
  //const date = artwork?.yearEnded ? `${artwork.yearStarted}-${artwork.yearEnded}` : artwork.yearStarted

  //<Link href={`/${item.attributes.slug}`} key={`${item.attributes.title}-large`}>
  //  <a className={`block py-2 px-4 hover:underline ${currentPath.includes(item.attributes.slug) && `italic underline`}`}>{item.attributes.title}</a>
  //</Link>

  const slug = artwork.slug
  //console.log(artwork.media.data[0].attributes)
  //console.log(slug)
  return (
    <li className="list-none">
      <Link href={`/work/${slug}`} key={`${slug}`}>
        <a>
          <MyImage image={artwork.media.data[0].attributes} index={1} size="small" />
        </a>
      </Link>
    </li>
  )
}
