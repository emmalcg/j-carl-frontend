import Image from 'next/image'

export default function MyImage ({src, alt}) {

  const imageUrl = 'http://localhost:1337' + src 
  console.log(imageUrl)
  return (
    <Image 
      src={imageUrl}
      alt="{alt}"
    />
  )
}