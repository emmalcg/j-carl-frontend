import Image from 'next/image'

export default function MyImage ({src, alt}) {

  const { MEDIA_URL } = process.env

  const imageUrl = MEDIA_URL + src 
  console.log(imageUrl)
  return (
    <Image 
      src={imageUrl}
      alt="{alt}"
      layout="fill"
    />
  )
}