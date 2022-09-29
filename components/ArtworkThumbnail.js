import MyImage from './MyImage'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";

export default function ArtworkThumbnail({artwork}) {
  //const artist = artwork?.people?.data[0]?.attributes?.lastName
  //const date = artwork?.yearEnded ? `${artwork.yearStarted}-${artwork.yearEnded}` : artwork.yearStarted

  //<Link href={`/${item.attributes.slug}`} key={`${item.attributes.title}-large`}>
  //  <a className={`block py-2 px-4 hover:underline ${currentPath.includes(item.attributes.slug) && `italic underline`}`}>{item.attributes.title}</a>
  //</Link>

  const slug = artwork.slug
  console.log({slug})
  console.log({artwork})
  //console.log('artwork', artwork)
  //console.log('attributes', artwork.media.data)

  const thumbnail = artwork.media.data.filter(art => art.attributes.caption == 'thumbnail')
  const [thumbnailImage, setThumbnailImage] = useState(thumbnail[0] || artwork.media.data[0].attributes)



  //console.log('thumbnail', thumbnail)
  //console.log('thumbnailImage', thumbnailImage)
  //console.log(artwork.media.data[0].attributes)
  //console.log(slug)
  return (
    <li className="list-none">
      <Link href={`/work/${slug}`} key={`${slug}`}>
        <a>
          {
            artwork.media.data[0].attributes && (
              <MyImage image={artwork.media.data[0].attributes} index={1} size="small" />
            )
          }
        </a>
      </Link>
    </li>
  )
}
