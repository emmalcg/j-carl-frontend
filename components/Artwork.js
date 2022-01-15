import MyImage from "./MyImage"
import ArtworkInfo from "./ArtworkInfo"
import useEmblaCarousel from "embla-carousel-react"

export default function Artwork({artwork}) {
  const artist = artwork.people.data[0].attributes.lastName
  const date = artwork.yearEnded ? `${artwork.yearStarted}-${artwork.yearEnded}` : artwork.yearStarted

  const [emblaRef] = useEmblaCarousel()

  return (
    <li className="list-none flex flex-col pb-6">
      <h2 className="py-2">
        <span className="pr-1.5 italic font-bold">{artwork.title}</span>
        <span className="pr-1.5">{artist}</span>
        <span className="pr-1">{date}</span>
      </h2>
      <div className="flex flex-col md:flex-row">
          <p className="pb-2 pr-4 md:pb-0">{artwork.description}</p>
          <ArtworkInfo artwork={artwork} />
      </div>
      <div className="order-first overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {
              artwork.media.data.map(image =>
                <div key={image.attributes.url} className="relative flex-[0_0_100%]">
                  <MyImage image={image.attributes}/>
                </div>
              
              )
            }

          </div>
      </div>

    </li>
  )
}
