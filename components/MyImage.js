import Image from 'next/image'

export default function MyImage ({image, index}) {
  return (
    <Image 
      src={image.url}
      alt={image.caption}
      width={image.width}
      height={image.height}
      layout="responsive"
      priority={index == 0 ? true : false}
    />
  )
}