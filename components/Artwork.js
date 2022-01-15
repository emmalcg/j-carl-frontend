import MyImage from "./MyImage"
import ReactMarkdown from 'react-markdown'

export default function Artwork({artwork}) {
  const artist = artwork.people.data[0].attributes.lastName
  const date = artwork.yearEnded ? `${artwork.yearStarted}-${artwork.yearEnded}` : artwork.yearStarted

  artwork.media.data.map(image => {console.log(image.attributes.url)})

  console.log('artwork', artwork)
  return (
    <li className="list-none flex flex-col pb-6">
          <h2 className="py-2">
            <span className="pr-1.5 italic font-bold">{artwork.title}</span>
            <span className="pr-1.5">{artist}</span>
            <span className="pr-1">{date}</span>
          </h2>
      <div className="flex flex-col md:flex-row">
          <p className="pb-2 pr-4 md:pb-0">{artwork.description}</p>
        <div className="border border-black min-w-[300px] m-auto text-sm h-min text-right max-w-[500px]">
          {
            artwork.materials && 
            <p className="border-b border-black p-1 flex justify-between">
              <span>Materials:</span>
              <span>{artwork.materials}</span>
            </p>
          }
          {
            artwork.dimensions && 
            <div className="border-b border-black p-1 flex justify-between">
              <span className="pr-4">Dimensions:</span>
              <ReactMarkdown>{artwork.dimensions}</ReactMarkdown>
            </div>
          }
          {
            artwork.client && 
            <p className="border-b border-black p-1 flex justify-between">
              <span>Client:</span>
              <span>{artwork.client}</span>
            </p>
          }
          {
            artwork.location && 
            <p className="border-b border-black p-1 flex justify-between">
              <span className="pr-4">Location:</span>
              <span>{artwork.location}</span>
            </p>
          }
          <p className="p-1 flex justify-between">
            <span>Date:</span>
            <span>{date}</span>
          </p>
        </div>
      </div>
      <div className="relative order-first">
        {
          artwork.media.data.map(image => <MyImage key={image.attributes.url} image={image.attributes}/>)
        }
      </div>

    </li>
  )
}
