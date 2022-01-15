import Image from 'next/image'

export default function MyImage ({src, alt}) {

  return (
    <Image 
<<<<<<< Updated upstream
      src={src}
      alt="{alt}"
      layout="fill"
=======
      src={image.image.url}
      alt={image.image.caption}
      width={image.image.width}
      height={image.image.height}
      layout="responsive"
      loading="eager"
>>>>>>> Stashed changes
    />
  )
}