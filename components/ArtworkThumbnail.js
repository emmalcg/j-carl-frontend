import Image from 'next/image'
import Link from 'next/link'

export default function ArtworkThumbnail({ artwork, centered = false }) {
  console.log('artwork', artwork)

  const slug = artwork.slug

  const img = artwork.thumbnail?.data?.attributes 
  console.log('img', img)
  console.log({ img })

  let imagePosition = centered ? 'center' : 'left'
  let fit = 'cover';
  
  if(img) {
    if(img.formats.medium.height < img.formats.medium.width && centered) {
      imagePosition = 'top'
    }
    if (img.formats.medium.height > img.formats.medium.width) {
      fit = "contain";
    }
    
  }
  //let heightClass =
  //  img.formats.small.height > img.formats.small.width && !centered ? "h-80" : "h-52";
  return (
    <li className="list-none w-full">
      <Link href={`/work/${slug}`} key={`${slug}`}>
        <a>
          {/*{artwork.media.data[0].attributes && (*/}
            <div className="relative w-full h-52">
              {img ? (
                <Image
                  src={img.formats.medium.url || img.url}
                  alt={img.caption}
                  //to do add loading
                  //placeholder="blur"
                  objectPosition={imagePosition}
                  //objectPosition={center ? "right" : "left"}
                  layout="fill"
                  objectFit={fit}
                />
              ) : (
                <div className="bg-black h-full w-full"></div>
              )}
            </div>
          {/*)}*/}
        </a>
      </Link>
    </li>
  );
}
