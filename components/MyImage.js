import Image from 'next/image'

export default function MyImage (image) {
  console.log('image', image.image)
  return (
    <Image 
      src={image.image.url}
      alt={image.image.caption}
      width={image.image.width}
      height={image.image.height}
      layout="responsive"
    />
  )
}