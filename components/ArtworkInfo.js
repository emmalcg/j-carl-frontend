import ReactMarkdown from 'react-markdown'

export default function ArtworkInfo({artwork}) {

  const date = artwork.yearEnded ? `${artwork.yearStarted}-${artwork.yearEnded}` : artwork.yearStarted

  return(
    <div className="border border-black min-w-full md:min-w-[300px] m-auto text-sm h-min text-right max-w-[400px]">
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
  )
}