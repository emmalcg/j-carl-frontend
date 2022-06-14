import Image from 'next/image'
import { buildUrl } from 'cloudinary-build-url'

export default function MyImage ({image, index, size}) {

  const imgSlug = image.formats[size].provider_metadata.public_id
    
  const url = buildUrl(`${imgSlug}`, {
    cloud: {
      cloudName: 'dgonyuzzz'
    }
  })

  const urlBlurred = buildUrl(`${imgSlug}`, {
    cloud: {
      cloudName: 'dgonyuzzz',
    },
    transformations: {
      effect: "blur:1000",
      quality: 1
    }
  });
  return (
    <div 
      style={{
        position: 'relative',
        height: 0,
        paddingTop: `${( image.height / image.width ) * 100}%`,
        backgroundImage: `url(${urlBlurred})`,
        backgroundPosition: 'center center',
        backgroundSize: '100%',
      }}
      >
        <div className="absolute inset-0">
          <Image 
            src={url}
            alt={image.caption}
            width={image.width}
            height={image.height}
            layout="responsive"
            priority={index == 0 ? true : false}
          />
        </div>
    </div>
  )
}