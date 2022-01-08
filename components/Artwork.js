import Image from 'next/image'

export default function Artwork ({ artwork }) {
  console.log('Artwork')
  console.log(artwork)
  return (
    <div>
      <div>
        <div>
          <h3>
            <span>{artwork.people.data[0].attributes.lastName}</span>
            <span>{artwork.title}</span>
            <span>{artwork.yearStarted}</span>
            {artwork.attributes.yearEnded && 
            <span> - {artwork.attributes.yearEnded} </span>
            }
          </h3>
          <p>{artwork.attributes.description}</p>
        </div>
        <div>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
      {/*<Image>
      </Image>*/}
    </div>
  )
}