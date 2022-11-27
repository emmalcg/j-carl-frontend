import Image from 'next/image'
import { buildUrl } from 'cloudinary-build-url'

export default function MyImage ({image, index, size, showLoading= false }) {
  console.log(image)
  const imgSlug = image?.formats[size]?.provider_metadata?.public_id || image.url

  const thumbnail = image.caption

  //console.log(thumbnail)
    
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

  const imageComponent = <Image 
                  src={url}
                  alt={image.caption}
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit='contain'
                  priority={index == 0 ? true : false}
                />
  return (
    <>
      {showLoading ? (
        <div
          style={{
            position: "relative",
            height: 0,
            paddingTop: `${(image.height / image.width) * 100}%`,
            backgroundImage: `url(${urlBlurred})`,
            backgroundPosition: "center center",
            backgroundSize: "100%",
          }}
        >
          <div className="absolute inset-0">{imageComponent}</div>
        </div>
      ) : (

        <>
        {imageComponent}

        </>
      )}
    </>
  );
}