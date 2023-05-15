import Image from 'next/image'
import Link from 'next/link'
import { buildUrl } from "cloudinary-build-url";

export default function ArtworkThumbnail({ artwork, centered = true, slug, priority = false }) {

  const thumbnailSlug = slug || `/work/${artwork.slug}`;

  const img = artwork.thumbnail?.data?.attributes 

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

  const urlBlurred = buildUrl(`${img.formats.small.url}`, {
    cloud: {
      cloudName: "dgonyuzzz",
    },
    transformations: {
      effect: "blur:1000",
      quality: 1,
    },
  });
  //let heightClass =
  //  img.formats.small.height > img.formats.small.width && !centered ? "h-80" : "h-52";
  return (
    <li className="list-none w-full">
      <Link href={thumbnailSlug}>
        <a>
          {/*{artwork.media.data[0].attributes && (*/}
          <div className="relative w-full h-52">
            {img ? (
              <Image
                src={img.formats.medium.url || img.url}
                alt={img.caption}
                objectPosition={imagePosition}
                //objectPosition={center ? "right" : "left"}
                layout="fill"
                objectFit={fit}
                priority={priority}
                placeholder="blur"
                blurDataURL={urlBlurred}
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
