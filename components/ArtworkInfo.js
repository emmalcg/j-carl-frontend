import ReactMarkdown from 'react-markdown'

export default function ArtworkInfo({ artwork, series }) {

  const date = artwork.yearEnded ? `${artwork.yearStarted}-${artwork.yearEnded}` : artwork.yearStarted

  const { title, yearEnded, yearStarted } = series

  return (
    <div className="text-sm">
      <p>{date}</p>
      {artwork.materials && <p>{artwork.materials}</p>}
      {artwork.dimensions && (
        <ReactMarkdown>{artwork.dimensions}</ReactMarkdown>
      )}
      {artwork.description && (
        <ReactMarkdown>{artwork.description}</ReactMarkdown>
      )}
      {/*{
        artwork.client && 
        <p className="border-b border-black p-1 flex justify-between">
          <span>Collection:</span>
          <span>{artwork.client}</span>
        </p>
      }*/}
    </div>
  );
}