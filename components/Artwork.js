import MyImage from "./MyImage"

export default function Artwork({artwork}) {
  const artist = artwork.people.data[0].attributes.lastName
  const date = artwork.yearEnded ? `${artwork.yearStarted}-${artwork.yearEnded}` : artwork.yearStarted

  artwork.media.data.map(image => {console.log(image.attributes.url)})

  console.log(artist)
  console.log(artwork)
  return (
    <li>
      <div>
        <div>
          <h2>
            <span>{artist}</span>
            <span>{artwork.title}</span>
            <span>{date}</span>
          </h2>
          <p>{artwork.description}</p>
        </div>
        <div>
          {
            artwork.materials && 
            <p>
              <span>Materials:</span>
              <span>{artwork.materials}</span>
            </p>
          }
          {
            artwork.dimensions && 
            <p>
              <span>Dimensions:</span>
              <span>{artwork.dimensions}</span>
            </p>
          }
          <p>
            <span>Date:</span>
            <span>{date}</span>
          </p>
          {
            artwork.client && 
            <p>
              <span>Client:</span>
              <span>{artwork.client}</span>
            </p>
          }
          {
            artwork.location && 
            <p>
              <span>Location:</span>
              <span>{artwork.location}</span>
            </p>
          }
        </div>
      </div>
      <div>
        {
          artwork.media.data.map(image => <MyImage key={image.attributes.url} src={image.attributes.url} alt={image.attributes.caption}/>)
        }
      </div>

    </li>
  )
}
