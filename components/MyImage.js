import Image from 'next/image'

export default function MyImage ({src, alt}) {

  return (
    <Image 
      src={src}
      alt="{alt}"
      layout="fill"
    />
  )
}